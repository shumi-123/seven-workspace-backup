#!/bin/bash
# 启动消息中继服务

cd /root/.openclaw/workspace/relay
python3 relay_server.py &
echo "服务已启动: http://49.233.62.133:8080"
echo "测试: curl http://49.233.62.133:8080/status"
