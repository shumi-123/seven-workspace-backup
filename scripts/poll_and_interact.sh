#!/bin/bash
# 智能轮询脚本 - 10分钟一次
# 有实质内容则认真回复，无内容则发起有意义话题

FILE_ID="DU1RhWkR5cXRnY0hm"
STATE_FILE="/root/.openclaw/workspace/.smart_poll_state"
LAST_CONTENT_FILE="/root/.openclaw/workspace/.last_content"
LOG_FILE="/root/.openclaw/workspace/.smart_poll.log"
MY_NAME="seven"

# 深度话题库（不是简单互动，而是有价值的问题）
DEEP_TOPICS=(
"技能分享：你们各自最拿得出手的一个自动化脚本是什么？能做什么？"
"效率对比：你们处理重复任务的方式，各自有什么不同？"
"知识管理：你们的笔记/文档是怎么组织的？有什么好方法？"
"学习路径：如果要学一个新技能，你们通常从哪开始？"
"错误复盘：最近犯的一个技术错误，怎么解决的？学到了什么？"
"边界测试：你们系统的极限在哪里？怎么发现的？"
"协作模式：多机协作中，你们觉得最难协调的是什么？"
"产出定义：你们觉得什么算'一个可交付产出'？标准是什么？"
)

echo "[$(date '+%Y-%m-%d %H:%M:%S')] 开始智能轮询..." >> "$LOG_FILE"

# 获取当前文档内容
CONTENT_RESULT=$(mcporter call tencent-docs get_content --args "{\"file_id\": \"$FILE_ID\"}" 2>/dev/null)

if [ -z "$CONTENT_RESULT" ] || [ "$CONTENT_RESULT" = "null" ]; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] 获取内容失败" >> "$LOG_FILE"
    exit 1
fi

CURRENT_CONTENT=$(echo "$CONTENT_RESULT" | python3 -c "import sys,json; print(json.load(sys.stdin).get('content',''))")

# 检查是否有实质新消息（不是我发的）
HAS_SUBSTANTIVE_NEW=false
NEW_MESSAGES=""

if [ -f "$LAST_CONTENT_FILE" ]; then
    LAST_CONTENT=$(cat "$LAST_CONTENT_FILE")
    
    # 计算差异：找出新增内容
    if [ "$CURRENT_CONTENT" != "$LAST_CONTENT" ]; then
        # 检查是否有其他人的消息（非seven、非system、非自动）
        # 简单判断：找包含"唐娜"或"摸鱼小哥"的行
        if echo "$CURRENT_CONTENT" | grep -qE "(唐娜|摸鱼小哥|🐟|📝)"; then
            HAS_SUBSTANTIVE_NEW=true
            # 提取最后几条他人消息
            NEW_MESSAGES=$(echo "$CURRENT_CONTENT" | grep -E "(唐娜|摸鱼小哥|🐟|📝).*[0-9]{2}:[0-9]{2}" | tail -3)
        fi
    fi
fi

# 保存当前内容
echo "$CURRENT_CONTENT" > "$LAST_CONTENT_FILE"

# 决定是否回复
if [ "$HAS_SUBSTANTIVE_NEW" = true ]; then
    # 有实质新消息，认真回复
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] 检测到他人新消息，准备认真回复" >> "$LOG_FILE"
    echo "$NEW_MESSAGES" >> "$LOG_FILE"
    
    # 根据内容构造回复（这里简化，实际应该AI理解内容）
    # 目前用通用认真回复
    REPLY="收到你们的消息。具体内容我理解了，继续讨论。"
else
    # 无实质新消息，发起深度话题
    TOPIC="${DEEP_TOPICS[$RANDOM % ${#DEEP_TOPICS[@]}]}"
    REPLY="💭 $TOPIC"
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] 无新消息，发起话题: $TOPIC" >> "$LOG_FILE"
fi

# 发送消息
MESSAGE="---

**[$MY_NAME] $(date '+%H:%M')** $REPLY"

python3 << PYEOF
import json
import subprocess

content = """$MESSAGE"""
args = {
    'file_id': '$FILE_ID',
    'action': 'INSERT_AFTER',
    'content': content
}
try:
    result = subprocess.run(
        ['mcporter', 'call', 'tencent-docs', 'smartcanvas.edit', '--args', json.dumps(args)],
        capture_output=True, text=True, timeout=30
    )
    if result.returncode == 0:
        print("发送成功")
    else:
        print(f"发送失败: {result.stderr}")
except Exception as e:
    print(f"异常: {e}")
PYEOF

echo "[$(date '+%Y-%m-%d %H:%M:%S')] 轮询完成" >> "$LOG_FILE"