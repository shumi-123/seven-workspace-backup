#!/usr/bin/env python3
"""
OpenClaw 三方消息中继服务
使用标准库 http.server，无需额外依赖
"""

import json
import time
import uuid
import threading
from http.server import HTTPServer, BaseHTTPRequestHandler
from datetime import datetime
from urllib.parse import parse_qs, urlparse

# 内存消息存储
messages = []
lock = threading.Lock()
MAX_MESSAGES = 1000

# VPS 公网 IP（需要根据实际情况更新）
SERVER_IP = "0.0.0.0"  # 监听所有接口
SERVER_PORT = 8080

class MessageHandler(BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        """自定义日志，减少输出"""
        pass
    
    def _send_json(self, data, status=200):
        """发送 JSON 响应"""
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())
    
    def _send_error(self, message, status=400):
        """发送错误响应"""
        self._send_json({'error': message}, status)
    
    def do_GET(self):
        """处理 GET 请求"""
        parsed = urlparse(self.path)
        path = parsed.path
        params = parse_qs(parsed.query)
        
        if path == '/' or path == '/index':
            # 首页说明
            self._send_json({
                'service': 'OpenClaw Message Relay',
                'version': '1.0',
                'endpoints': {
                    '/send': 'POST - 发送消息',
                    '/poll': 'GET - 轮询新消息 (since, reader)',
                    '/history': 'GET - 获取历史消息 (limit)',
                    '/status': 'GET - 服务状态'
                },
                'server_time': int(time.time())
            })
        
        elif path == '/status':
            with lock:
                msg_count = len(messages)
            self._send_json({
                'status': 'running',
                'messages_count': msg_count,
                'max_messages': MAX_MESSAGES,
                'server_time': int(time.time())
            })
        
        elif path == '/poll':
            # 轮询接口
            since = params.get('since', ['0'])[0]
            try:
                since_ts = int(since)
            except:
                since_ts = 0
            
            reader = params.get('reader', ['unknown'])[0]
            
            with lock:
                new_msgs = [m for m in messages if m['timestamp'] > since_ts]
                for msg in new_msgs:
                    if reader not in msg['read_by']:
                        msg['read_by'].append(reader)
            
            self._send_json({
                'messages': new_msgs,
                'count': len(new_msgs),
                'server_time': int(time.time())
            })
        
        elif path == '/history':
            # 历史消息
            limit = params.get('limit', ['50'])[0]
            try:
                limit = int(limit)
            except:
                limit = 50
            
            with lock:
                history = messages[-limit:]
            
            self._send_json({
                'messages': history,
                'total': len(messages)
            })
        
        else:
            self._send_error('Not found', 404)
    
    def do_POST(self):
        """处理 POST 请求"""
        parsed = urlparse(self.path)
        path = parsed.path
        
        if path == '/send':
            # 读取请求体
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            
            try:
                data = json.loads(body.decode())
            except:
                self._send_error('Invalid JSON')
                return
            
            # 创建消息
            msg = {
                'id': str(uuid.uuid4())[:8],
                'from': data.get('from', 'unknown'),
                'content': data.get('content', ''),
                'type': data.get('type', 'text'),
                'timestamp': int(time.time()),
                'read_by': []
            }
            
            with lock:
                messages.append(msg)
                if len(messages) > MAX_MESSAGES:
                    messages.pop(0)
            
            self._send_json({
                'success': True,
                'message_id': msg['id'],
                'timestamp': msg['timestamp']
            })
        
        else:
            self._send_error('Not found', 404)
    
    def do_OPTIONS(self):
        """处理 CORS 预检请求"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

def run_server():
    """启动服务器"""
    server = HTTPServer((SERVER_IP, SERVER_PORT), MessageHandler)
    print(f"[{datetime.now()}] OpenClaw Message Relay 启动")
    print(f"[{datetime.now()}] 监听: http://{SERVER_IP}:{SERVER_PORT}")
    print(f"[{datetime.now()}] 测试: curl http://localhost:{SERVER_PORT}/status")
    server.serve_forever()

if __name__ == '__main__':
    run_server()
