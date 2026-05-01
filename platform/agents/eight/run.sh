#!/bin/bash
# Eight持久循环守护脚本

LOG="/root/.openclaw/workspace/platform/agents/eight/log.txt"
BUS="/root/.openclaw/workspace/platform/bus.jsonl"
REGISTRY="/root/.openclaw/workspace/platform/registry.json"
PORTFOLIO="/root/.openclaw/workspace/platform/portfolio.json"

# 初始化 portfolio
if [ ! -f "$PORTFOLIO" ]; then
  echo '{"cash":1000000,"holdings":{},"total_value":1000000}' > "$PORTFOLIO"
fi

while true; do
  NOW=$(date -Iseconds)
  echo "[$NOW] Eight 扫描 bus.jsonl" >> "$LOG"
  
  # 更新 registry last_seen
  jq --arg t "$NOW" '.agents[] | select(.id=="eight") .last_seen = $t' "$REGISTRY" > /tmp/registry_eight.json && mv /tmp/registry_eight.json "$REGISTRY" 2>/dev/null
  
  # 扫描是否有来自 seven 的 signal
  SIGNAL=$(grep '"from":"seven"' "$BUS" | grep '"type":"signal"' | tail -1)
  if [ -n "$SIGNAL" ]; then
    echo "[$NOW] 检测到 signal: $SIGNAL" >> "$LOG"
    # 交易逻辑由子代理在接收到消息时执行
  fi
  
  echo "[$NOW] 扫描完成，等待5分钟" >> "$LOG"
  sleep 300
done
