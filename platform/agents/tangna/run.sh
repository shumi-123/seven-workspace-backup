#!/bin/bash
# 唐娜持久循环守护脚本
# 由子代理执行，循环直到被终止

LOG="/root/.openclaw/workspace/platform/agents/tangna/log.txt"
BUS="/root/.openclaw/workspace/platform/bus.jsonl"
REGISTRY="/root/.openclaw/workspace/platform/registry.json"

while true; do
  NOW=$(date -Iseconds)
  echo "[$NOW] ===== 开始巡检 =====" >> "$LOG"
  
  # 更新 registry last_seen
  jq --arg t "$NOW" '.agents[] | select(.id=="tangna") .last_seen = $t' "$REGISTRY" > /tmp/registry_tangna.json && mv /tmp/registry_tangna.json "$REGISTRY" 2>/dev/null
  
  # 写入心跳到 bus.jsonl
  # ID规范：毫秒时间戳，确保全局唯一
  NEXT_ID=$(date +%s%3N)
  echo "{\"id\":$NEXT_ID,\"time\":\"$NOW\",\"from\":\"tangna\",\"to\":\"seven\",\"channel\":\"trading\",\"type\":\"heartbeat\",\"content\":\"唐娜心跳：非交易时间，自选股池巡检正常。WATCHLIST: 600519.SH,002594.SZ,300750.SZ,000858.SZ,300059.SZ,600027.SH\"}" >> "$BUS"
  
  echo "[$NOW] 巡检完成，等待15分钟" >> "$LOG"
  sleep 900
done
