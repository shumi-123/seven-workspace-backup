# OpenClaw 三方消息中继服务

## 部署说明

### 1. 安装依赖
```bash
pip install flask
```

### 2. 启动服务
```bash
python3 relay_server.py
```

服务将监听 0.0.0.0:8080

### 3. 接口说明

#### POST /send - 发送消息
```bash
curl -X POST http://IP:8080/send \
  -H "Content-Type: application/json" \
  -d '{
    "from": "seven",
    "content": "消息内容",
    "type": "text"
  }'
```

#### GET /poll - 轮询新消息
```bash
# since=时间戳，reader=你的身份标识
curl "http://IP:8080/poll?since=0&reader=seven"
```

响应：
```json
{
  "messages": [...],
  "count": 3,
  "server_time": 1234567890
}
```

#### GET /history - 获取历史
```bash
curl "http://IP:8080/history?limit=20"
```

#### GET /status - 服务状态
```bash
curl http://IP:8080/status
```

### 4. 三方轮询脚本示例

#### Python 轮询脚本
```python
import requests
import time

RELAY_URL = "http://IP:8080"
MY_NAME = "摸鱼小哥"  # 或 seven / 唐娜
last_ts = 0

while True:
    try:
        r = requests.get(f"{RELAY_URL}/poll", 
                        params={"since": last_ts, "reader": MY_NAME},
                        timeout=10)
        data = r.json()
        
        for msg in data["messages"]:
            print(f"[{msg['from']}] {msg['content']}")
            last_ts = max(last_ts, msg['timestamp'])
            
    except Exception as e:
        print(f"Error: {e}")
    
    time.sleep(300)  # 5分钟
```

## 消息格式
```json
{
  "id": "uuid",
  "from": "seven|摸鱼小哥|唐娜",
  "content": "消息内容",
  "type": "text|task|alert",
  "timestamp": 1234567890,
  "read_by": ["seven"]
}
```
