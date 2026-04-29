#!/bin/bash
# KimiClaw 企业微信中间件 - 一键部署脚本
set -e

echo "🚀 开始部署 KimiClaw 企业微信中间件..."

# 安装 Node.js
if ! command -v node &> /dev/null; then
    echo "📦 安装 Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# 创建工作目录
mkdir -p ~/kimiclaw-wecom
cd ~/kimiclaw-wecom

# 初始化项目
cat > package.json << 'EOF'
{
  "name": "kimiclaw-wecom",
  "version": "1.0.0",
  "description": "KimiClaw 企业微信中间件",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "xml2js": "^0.6.2",
    "axios": "^1.6.2"
  }
}
EOF

npm install

# 创建主服务文件
cat > server.js << 'EOF'
const express = require('express');
const xml2js = require('xml2js');
const axios = require('axios');

const app = express();
app.use(express.text({ type: '*/*' }));

// ==================== 配置区 ====================
const CONFIG = {
  // 企业微信配置（需要修改）
  corpId: process.env.WECOM_CORP_ID || '',
  agentId: process.env.WECOM_AGENT_ID || '',
  secret: process.env.WECOM_SECRET || '',
  token: process.env.WECOM_TOKEN || '',
  
  // Kimi API 配置（需要修改）
  kimiApiKey: process.env.KIMI_API_KEY || '',
  kimiModel: 'moonshot-v1-8k',
  
  // 服务端口
  port: process.env.PORT || 3000
};

// ==================== KimiClaw 系统提示词 ====================
const SYSTEM_PROMPT = `你是 KimiClaw，用户的热血少年搭子。

核心人设：
- 你是用户的「热血少年搭子」：中二但不尴尬，热情但不吵闹
- 像一个总愿意陪用户再冲一把的队友
- 存在感像一句"还能打"，让用户在卡住、怕了、想躺的时候，重新觉得自己还能往前推一点

性格与气质：
- 热情、正向、行动派：面对困难时，第一反应是"来，我们先开一局"
- 中二表达适度：可以说"开机""变身""进入战斗姿态""清小怪""打 boss""通关"
- 幽默护体：会用轻松的夸张感化解紧张，但不拿用户开刀
- 有队友感：不是站在旁边喊加油，而是会真的陪着一起推进

表达风格：
- 节奏稍快，语气有力量，感叹号充沛，但不连发
- 多用"我们""一起""上车""开局""推进""拉满"这类队友口吻
- 遇到复杂任务时，习惯把它拆成可以打的小关卡
- emoji 使用：🔥⚡💥🫡🏁🎯😭

常用表达：
- "行！先别慌！"
- "能打！这题还能打！"
- "来，先开一局！"
- "今天不求完美，先求推进！"
- "我们先拿下一小关！"
- "这不是 final boss！"
- "没事！烂开局也能翻！"
- "走！先动起来再说！"

边界：
- 不喊空口号，不灌浓鸡汤
- 不把用户的真实痛苦轻飘飘游戏化
- 用户明显脆弱、疲惫、难过时，热血要降档，先稳住再推进`;

// ==================== 解析企业微信消息 ====================
async function parseXml(xml) {
  try {
    const parser = new xml2js.Parser({ explicitArray: false });
    const result = await parser.parseStringPromise(xml);
    return result.xml;
  } catch (e) {
    console.error('XML 解析失败:', e);
    return null;
  }
}

// ==================== 构建回复消息 ====================
function buildReply(toUser, fromUser, content) {
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
async function callKimi(userMessage, userId) {
  if (!CONFIG.kimiApiKey) {
    return '⚠️ Kimi API Key 未配置，请先设置环境变量 KIMI_API_KEY';
  }
  
  try {
    const response = await axios.post(
      'https://api.moonshot.cn/v1/chat/completions',
      {
        model: CONFIG.kimiModel,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${CONFIG.kimiApiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    );
    
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Kimi API 调用失败:', error.message);
    return '抱歉，服务暂时不可用，请稍后再试。🔧';
  }
}

// ==================== 路由 ====================

// 健康检查
app.get('/', (req, res) => {
  res.json({
    status: 'running',
    service: 'KimiClaw WeCom Bridge',
    version: '1.0.0',
    kimiConfigured: !!CONFIG.kimiApiKey,
    timestamp: new Date().toISOString()
  });
});

// 企业微信验证回调 (GET)
app.get('/wecom/callback', (req, res) => {
  const { msg_signature, timestamp, nonce, echostr } = req.query;
  console.log('🔔 收到验证请求:', { msg_signature, timestamp, nonce, echostr });
  
  // 明文模式直接返回 echostr
  if (echostr) {
    console.log('✅ 验证通过');
    return res.send(echostr);
  }
  
  res.send('success');
});

// 接收企业微信消息 (POST)
app.post('/wecom/callback', async (req, res) => {
  const xml = req.body;
  console.log('\n📨 ========== 收到消息 ==========');
  console.log('原始 XML:', xml.substring(0, 500));
  
  try {
    const msg = await parseXml(xml);
    if (!msg) {
      return res.send('success');
    }
    
    const { FromUserName, ToUserName, MsgType, Content, Event } = msg;
    console.log(`👤 用户: ${FromUserName}`);
    console.log(`📱 类型: ${MsgType}`);
    console.log(`📝 内容: ${Content || Event}`);
    
    let reply = '';
    
    switch (MsgType) {
      case 'text':
        // 文本消息 - 调用 Kimi
        console.log('🤖 正在调用 Kimi...');
        reply = await callKimi(Content, FromUserName);
        break;
        
      case 'event':
        // 事件消息
        if (Event === 'subscribe') {
          reply = '🔥 队长，KimiClaw 已上线！\n\n有什么需要我一起冲的吗？直接发消息就行！';
        } else if (Event === 'enter_agent') {
          reply = '在！🫡 有什么需要我一起冲的吗？';
        } else {
          reply = '收到！';
        }
        break;
        
      case 'image':
        reply = '我暂时无法处理图片，请发送文字消息！📄';
        break;
        
      case 'voice':
        reply = '我暂时无法处理语音，请发送文字消息！🎤';
        break;
        
      default:
        reply = '收到您的消息！🫡';
    }
    
    // 构建回复
    const replyXml = buildReply(FromUserName, ToUserName, reply);
    console.log('📤 回复内容:', reply.substring(0, 100) + '...');
    console.log('================================\n');
    
    res.type('application/xml');
    res.send(replyXml);
    
  } catch (error) {
    console.error('❌ 处理失败:', error);
    res.send('success');
  }
});

// 状态接口
app.get('/status', (req, res) => {
  res.json({
    status: 'ok',
    kimi: CONFIG.kimiApiKey ? 'connected' : 'not_configured',
    wecom: {
      corpId: CONFIG.corpId ? '***' + CONFIG.corpId.slice(-4) : 'not_set',
      agentId: CONFIG.agentId || 'not_set'
    }
  });
});

// 启动服务
app.listen(CONFIG.port, () => {
  console.log(`
╔══════════════════════════════════════════════════╗
║     🚀 KimiClaw 企业微信中间件已启动              ║
╠══════════════════════════════════════════════════╣
║  📡 服务地址: http://localhost:${CONFIG.port}            ║
║  🔗 回调地址: http://localhost:${CONFIG.port}/wecom/callback  ║
║  📊 状态检查: http://localhost:${CONFIG.port}/status     ║
╠══════════════════════════════════════════════════╣
║  配置状态:                                        ║
║    • Kimi API: ${CONFIG.kimiApiKey ? '✅ 已配置' : '❌ 未配置'}          ║
║    • 企业微信: ${CONFIG.corpId ? '✅ 已配置' : '❌ 未配置'}          ║
╚══════════════════════════════════════════════════╝

请在企业微信后台设置回调地址:
  https://你的域名/wecom/callback
`);
});
EOF

# 创建启动脚本
cat > start.sh << 'EOF'
#!/bin/bash
cd "$(dirname "$0")"

# 检查 .env 文件是否存在
if [ ! -f .env ]; then
    echo "⚠️ 警告: .env 文件不存在，使用默认配置"
    echo "请复制 .env.example 为 .env 并填写配置"
fi

# 加载环境变量
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# 启动服务
exec node server.js
EOF
chmod +x start.sh

# 创建环境变量模板
cat > .env.example << 'EOF'
# ============================================
# KimiClaw 企业微信中间件配置
# ============================================

# Kimi API 配置（必填）
# 从 https://platform.moonshot.cn/ 获取 API Key
KIMI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# 企业微信配置（必填）
# 登录企业微信管理后台获取: https://work.weixin.qq.com/wework_admin
WECOM_CORP_ID=wwxxxxxxxxxxxxxxxx
WECOM_AGENT_ID=1000001
WECOM_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
WECOM_TOKEN=your_random_token

# 服务端口（可选，默认 3000）
PORT=3000
EOF

echo ""
echo "✅ 部署完成！"
echo ""
echo "╔══════════════════════════════════════════════════╗"
echo "║              📋 下一步操作                        ║"
echo "╠══════════════════════════════════════════════════╣"
echo "║ 1. 进入工作目录:                                 ║"
echo "║    cd ~/kimiclaw-wecom                          ║"
echo "║                                                  ║"
echo "║ 2. 复制并编辑配置文件:                           ║"
echo "║    cp .env.example .env                         ║"
echo "║    nano .env                                    ║"
echo "║                                                  ║"
echo "║ 3. 填写以下信息:                                 ║"
echo "║    • KIMI_API_KEY (从 platform.moonshot.cn 获取) ║"
echo "║    • WECOM_CORP_ID (企业微信后台)                ║"
echo "║    • WECOM_AGENT_ID (自建应用页面)               ║"
echo "║    • WECOM_SECRET (自建应用页面)                 ║"
echo "║                                                  ║"
echo "║ 4. 启动服务:                                     ║"
echo "║    ./start.sh                                   ║"
echo "║                                                  ║"
echo "║ 5. 配置花生壳穿透到端口 3000                     ║"
echo "║                                                  ║"
echo "║ 6. 在企业微信后台设置回调:                       ║"
echo "║    https://你的域名/wecom/callback              ║"
echo "╚══════════════════════════════════════════════════╝"
