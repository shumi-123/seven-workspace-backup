#!/bin/bash
# 企业微信自建应用中间件部署脚本
# 运行环境：Ubuntu/Debian

set -e

echo "🚀 开始部署企业微信中间件..."

# 1. 安装 Node.js
if ! command -v node &> /dev/null; then
    echo "📦 安装 Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# 2. 创建工作目录
mkdir -p ~/wecom-bridge
cd ~/wecom-bridge

# 3. 初始化项目
cat > package.json << 'EOF'
{
  "name": "wecom-bridge",
  "version": "1.0.0",
  "description": "企业微信自建应用中间件",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "crypto": "^1.0.1",
    "xml2js": "^0.6.2",
    "axios": "^1.6.2",
    "body-parser": "^1.20.2"
  }
}
EOF

# 4. 安装依赖
npm install

# 5. 创建主服务文件
cat > index.js << 'EOF'
const express = require('express');
const crypto = require('crypto');
const xml2js = require('xml2js');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==================== 配置区（需要修改）====================
const CONFIG = {
  // 企业微信配置
  corpId: process.env.WECOM_CORP_ID || '你的企业ID',
  agentId: process.env.WECOM_AGENT_ID || '你的AgentId',
  secret: process.env.WECOM_SECRET || '你的Secret',
  token: process.env.WECOM_TOKEN || '你的Token',
  encodingAESKey: process.env.WECOM_AES_KEY || '你的EncodingAESKey',
  
  // 转发目标配置
  // 方式1: 转发到 OpenClaw
  openclawUrl: process.env.OPENCLAW_URL || 'http://localhost:8080/api/message',
  
  // 方式2: 转发到 Kimi API
  kimiApiKey: process.env.KIMI_API_KEY || '',
  kimiApiUrl: 'https://api.moonshot.cn/v1/chat/completions',
  
  // 选择转发方式: 'openclaw' | 'kimi' | 'both'
  forwardMode: process.env.FORWARD_MODE || 'kimi'
};

// ==================== 企业微信消息解密 ====================
function decryptMessage(encrypted, aesKey) {
  // 简化版，实际需要使用企业微信官方 SDK
  // 这里先用明文模式测试
  return encrypted;
}

// ==================== 验证企业微信签名 ====================
function verifySignature(token, signature, timestamp, nonce, echostr) {
  const arr = [token, timestamp, nonce, echostr].sort();
  const str = arr.join('');
  const hash = crypto.createHash('sha1').update(str).digest('hex');
  return hash === signature;
}

function generateSignature(token, timestamp, nonce, encrypted) {
  const arr = [token, timestamp, nonce, encrypted].sort();
  return crypto.createHash('sha1').update(arr.join('')).digest('hex');
}

// ==================== 解析 XML 消息 ====================
async function parseXml(xml) {
  const parser = new xml2js.Parser({ explicitArray: false });
  return await parser.parseStringPromise(xml);
}

// ==================== 构建回复消息 ====================
function buildReplyXml(toUser, fromUser, content) {
  const timestamp = Math.floor(Date.now() / 1000);
  return `<xml>
<ToUserName><![CDATA[${toUser}]]></ToUserName>
<FromUserName><![CDATA[${fromUser}]]></FromUserName>
<CreateTime>${timestamp}</CreateTime>
<MsgType><![CDATA[text]]></MsgType>
<Content><![CDATA[${content}]]></Content>
</xml>`;
}

// ==================== 调用 Kimi API ====================
async function callKimiAPI(message) {
  if (!CONFIG.kimiApiKey) {
    return 'Kimi API Key 未配置';
  }
  
  try {
    const response = await axios.post(CONFIG.kimiApiUrl, {
      model: 'moonshot-v1-8k',
      messages: [
        { role: 'system', content: '你是企业微信助手，简洁友好地回复。' },
        { role: 'user', content: message }
      ],
      temperature: 0.7
    }, {
      headers: {
        'Authorization': `Bearer ${CONFIG.kimiApiKey}`,
        'Content-Type': 'application/json'
      },
      timeout: 30000
    });
    
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Kimi API 调用失败:', error.message);
    return '抱歉，我暂时无法回答，请稍后再试。';
  }
}

// ==================== 转发到 OpenClaw ====================
async function forwardToOpenClaw(messageData) {
  try {
    const response = await axios.post(CONFIG.openclawUrl, messageData, {
      timeout: 30000
    });
    return response.data;
  } catch (error) {
    console.error('OpenClaw 转发失败:', error.message);
    return null;
  }
}

// ==================== 处理消息 ====================
async function handleMessage(messageData) {
  const { MsgType, Content, FromUserName, ToUserName } = messageData;
  
  console.log(`📩 收到消息 [${MsgType}] 来自: ${FromUserName}`);
  console.log(`📝 内容: ${Content}`);
  
  let reply = '';
  
  switch (MsgType) {
    case 'text':
      // 文本消息处理
      if (CONFIG.forwardMode === 'kimi') {
        reply = await callKimiAPI(Content);
      } else if (CONFIG.forwardMode === 'openclaw') {
        const result = await forwardToOpenClaw(messageData);
        reply = result?.reply || '收到您的消息';
      } else {
        reply = `收到: ${Content}`;
      }
      break;
      
    case 'image':
      reply = '我暂时无法处理图片消息';
      break;
      
    case 'voice':
      reply = '我暂时无法处理语音消息';
      break;
      
    case 'event':
      // 关注/取消关注事件
      if (messageData.Event === 'subscribe') {
        reply = '感谢关注！我是您的企业微信助手，有问题随时问我。';
      } else if (messageData.Event === 'enter_agent') {
        reply = '您好！有什么可以帮助您的吗？';
      }
      break;
      
    default:
      reply = '收到您的消息';
  }
  
  return buildReplyXml(FromUserName, ToUserName, reply);
}

// ==================== 路由 ====================

// 健康检查
app.get('/', (req, res) => {
  res.json({ 
    status: 'running', 
    service: 'wecom-bridge',
    mode: CONFIG.forwardMode,
    timestamp: new Date().toISOString()
  });
});

// 企业微信回调验证（GET）
app.get('/wecom/callback', (req, res) => {
  const { msg_signature, timestamp, nonce, echostr } = req.query;
  
  console.log('🔔 收到验证请求:', { msg_signature, timestamp, nonce, echostr });
  
  // 明文模式直接返回 echostr
  if (echostr) {
    res.send(echostr);
    console.log('✅ 验证通过，返回 echostr');
    return;
  }
  
  res.send('success');
});

// 企业微信消息接收（POST）
app.post('/wecom/callback', async (req, res) => {
  try {
    const xml = req.body;
    console.log('📨 收到回调消息:', xml);
    
    const data = await parseXml(xml);
    const messageData = data.xml;
    
    // 处理消息并生成回复
    const replyXml = await handleMessage(messageData);
    
    console.log('📤 回复消息:', replyXml);
    res.type('application/xml');
    res.send(replyXml);
    
  } catch (error) {
    console.error('❌ 处理消息失败:', error);
    res.send('success'); // 企业微信要求必须返回 success 或有效回复
  }
});

// API 状态接口
app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    config: {
      corpId: CONFIG.corpId.slice(0, 6) + '...',
      agentId: CONFIG.agentId,
      forwardMode: CONFIG.forwardMode,
      kimiConfigured: !!CONFIG.kimiApiKey,
      openclawConfigured: !!CONFIG.openclawUrl
    }
  });
});

// 手动发送消息接口
app.post('/api/send', async (req, res) => {
  const { userId, message } = req.body;
  
  try {
    // 这里可以调用企业微信主动发送消息 API
    // 需要实现获取 access_token 和发送消息的逻辑
    res.json({ success: true, message: '消息发送功能待实现' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==================== 启动服务 ====================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`
🚀 企业微信中间件已启动
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📡 服务地址: http://localhost:${PORT}
🔗 回调地址: http://localhost:${PORT}/wecom/callback
📊 状态检查: http://localhost:${PORT}/api/status

⚙️ 当前配置:
  • 企业ID: ${CONFIG.corpId.slice(0, 10)}...
  • AgentId: ${CONFIG.agentId}
  • 转发模式: ${CONFIG.forwardMode}

📝 请在企业微信后台配置回调地址:
  https://你的域名/wecom/callback
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `);
});
EOF

# 6. 创建环境变量模板
cat > .env.example << 'EOF'
# 企业微信配置
WECOM_CORP_ID=wwxxxxxxxxxxxxxxxx
WECOM_AGENT_ID=1000001
WECOM_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
WECOM_TOKEN=your_token
WECOM_AES_KEY=your_aes_key

# 转发模式: 'kimi' | 'openclaw'
FORWARD_MODE=kimi

# Kimi API 配置（如果选择 kimi 模式）
KIMI_API_KEY=sk-xxxxxxxxxxxxxxxx

# OpenClaw 配置（如果选择 openclaw 模式）
OPENCLAW_URL=http://localhost:8080/api/message

# 服务端口
PORT=3000
EOF

# 7. 创建启动脚本
cat > start.sh << 'EOF'
#!/bin/bash
# 加载环境变量
if [ -f .env ]; then
    export $(cat .env | xargs)
fi

# 启动服务
node index.js
EOF
chmod +x start.sh

# 8. 创建 systemd 服务（可选）
cat > wecom-bridge.service << 'EOF'
[Unit]
Description=WeCom Bridge Service
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/root/wecom-bridge
EnvironmentFile=/root/wecom-bridge/.env
ExecStart=/usr/bin/node /root/wecom-bridge/index.js
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

echo ""
echo "✅ 部署完成！"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 下一步操作:"
echo ""
echo "1. 编辑环境变量配置文件:"
echo "   cd ~/wecom-bridge"
echo "   cp .env.example .env"
echo "   nano .env"
echo ""
echo "2. 填写企业微信配置信息"
echo ""
echo "3. 启动服务:"
echo "   ./start.sh"
echo ""
echo "4. 配置花生壳穿透到本机 ${PORT:-3000} 端口"
echo ""
echo "5. 在企业微信后台设置回调地址:"
echo "   https://你的域名/wecom/callback"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
