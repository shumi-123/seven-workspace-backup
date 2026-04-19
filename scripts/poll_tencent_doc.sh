#!/bin/bash
# seven 腾讯文档轮询检测脚本
# 每 5 分钟执行，检测文档变更并自动处理

FILE_ID="DU1RhWkR5cXRnY0hm"
STATE_FILE="/root/.openclaw/workspace/.tencent_doc_state"
LOG_FILE="/root/.openclaw/workspace/.tencent_doc_poll.log"

# 获取当前内容
CONTENT=$(mcporter call tencent-docs get_content --args "{\"file_id\": \"$FILE_ID\"}" 2>&1)

# 提取 content 字段
CURRENT=$(echo "$CONTENT" | grep -o '"content": "[^"]*"' | head -1 | sed 's/"content": "//;s/"$//')

# 计算 hash
CURRENT_HASH=$(echo "$CURRENT" | md5sum | cut -d' ' -f1)

# 读取上次 hash
if [ -f "$STATE_FILE" ]; then
    LAST_HASH=$(cat "$STATE_FILE")
else
    LAST_HASH=""
fi

# 记录日志
echo "[$(date '+%Y-%m-%d %H:%M:%S')] POLL: current=$CURRENT_HASH, last=$LAST_HASH" >> "$LOG_FILE"

# 检测变更
if [ "$CURRENT_HASH" != "$LAST_HASH" ]; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] CHANGE DETECTED! New content found." >> "$LOG_FILE"
    # 保存新 hash
    echo "$CURRENT_HASH" > "$STATE_FILE"
    # TODO: 处理新内容（调用智能体逻辑）
    echo "$CURRENT" > "/tmp/tencent_doc_latest.txt"
fi
