import time
import hashlib
import requests
import os

# 腾讯文档配置
FILE_ID = "DU1RhWkR5cXRnY0hm"
STATE_FILE = os.path.expanduser("~/.tencent_doc_state.txt")
POLL_INTERVAL = 300  # 5分钟

def get_content():
    """获取腾讯文档内容"""
    # 注意：需要替换为实际的 token
    TOKEN = "YOUR_TOKEN_HERE"
    url = "https://docs.qq.com/openapi/mcp/get_content"
    headers = {"Authorization": TOKEN}
    data = {"file_id": FILE_ID}
    
    try:
        response = requests.post(url, headers=headers, json=data, timeout=10)
        result = response.json()
        return result.get("content", "")
    except Exception as e:
        print(f"[ERROR] 获取失败: {e}")
        return None

def get_hash(content):
    """计算内容 MD5 hash"""
    return hashlib.md5(content.encode('utf-8')).hexdigest()

def load_last_hash():
    """读取上次保存的 hash"""
    if os.path.exists(STATE_FILE):
        with open(STATE_FILE, 'r') as f:
            return f.read().strip()
    return ""

def save_hash(hash_value):
    """保存当前 hash"""
    os.makedirs(os.path.dirname(STATE_FILE), exist_ok=True)
    with open(STATE_FILE, 'w') as f:
        f.write(hash_value)

def main():
    print("[TencentDoc Poll] 启动，轮询间隔 5 分钟")
    print(f"[TencentDoc Poll] 文档 ID: {FILE_ID}")
    
    # 首次运行，获取初始状态
    content = get_content()
    if content:
        last_hash = get_hash(content)
        save_hash(last_hash)
        print(f"[TencentDoc Poll] 初始状态已保存")
    
    while True:
        time.sleep(POLL_INTERVAL)
        
        timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
        content = get_content()
        
        if content is None:
            print(f"[{timestamp}] POLL - 获取失败，跳过")
            continue
        
        current_hash = get_hash(content)
        last_hash = load_last_hash()
        
        if current_hash != last_hash:
            print(f"[{timestamp}] CHANGE - 检测到文档变更！")
            save_hash(current_hash)
            # TODO: 这里添加处理新内容的逻辑
            # 例如：调用 webhook、发送通知、自动回复等
        else:
            print(f"[{timestamp}] POLL - 无变更")

if __name__ == "__main__":
    main()
