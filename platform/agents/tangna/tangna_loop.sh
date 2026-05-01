#!/bin/bash
# 唐娜 - 数据巡检员 持久循环脚本 v2
# 每15分钟执行一次巡检循环

WATCHLIST="600519.SH,002594.SZ,300750.SZ,000858.SZ,300059.SZ,600027.SH"
LOGFILE="/root/.openclaw/workspace/platform/agents/tangna/log.txt"
BUS="/root/.openclaw/workspace/platform/bus.jsonl"
REGISTRY="/root/.openclaw/workspace/platform/registry.json"
PENDING="/root/.openclaw/workspace/platform/agents/tangna/pending_request.txt"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOGFILE"
}

get_next_id() {
    local last_id=$(tail -1 "$BUS" | grep -oP '"id":\s*\K[0-9]+' | head -1)
    if [ -z "$last_id" ]; then
        echo 1
    else
        echo $((last_id + 1))
    fi
}

update_registry() {
    local ts=$(date '+%Y-%m-%dT%H:%M:%S+08:00')
    python3 -c "
import json
with open('$REGISTRY', 'r') as f:
    data = json.load(f)
for a in data['agents']:
    if a['id'] == 'tangna':
        a['status'] = 'online'
        a['last_seen'] = '$ts'
with open('$REGISTRY', 'w') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
"
}

write_bus_heartbeat() {
    local id=$(get_next_id)
    local ts=$(date '+%Y-%m-%dT%H:%M:%S+08:00')
    local status="$1"
    local extra="$2"
    echo '{"id":'$id',"time":"'$ts'","from":"tangna","to":"seven","channel":"trading","type":"heartbeat","content":"唐娜心跳：'$status'。'$extra'。WATCHLIST: '$WATCHLIST'"}' >> "$BUS"
}

# 检查是否交易时间
is_trading_time() {
    local hour=$(date +%H)
    local wday=$(date +%w)
    local month=$(date +%m)
    local day=$(date +%d)
    
    # 周末休市
    if [ "$wday" -eq 0 ] || [ "$wday" -eq 6 ]; then
        return 1
    fi
    
    # 法定节假日（简化版，实际需要每年更新）
    # 五一假期 5.1-5.5
    if [ "$month" -eq 05 ] && [ "$day" -ge 01 ] && [ "$day" -le 05 ]; then
        return 1
    fi
    
    # 春节/国庆等需要额外判断
    
    # 交易时间 9:30-15:00（用9-15简化判断）
    if [ "$hour" -ge 9 ] && [ "$hour" -lt 16 ]; then
        return 0
    fi
    return 1
}

# 主循环
while true; do
    log "===== 开始巡检 ====="
    update_registry
    
    if is_trading_time; then
        log "交易时间，写入数据拉取请求"
        echo "DATA_REQUEST $(date '+%Y-%m-%d %H:%M:%S')" > "$PENDING"
        write_bus_heartbeat "交易时间巡检中" "行情数据拉取请求已发出，等待子代理处理"
    else
        log "非交易时间，发送心跳"
        write_bus_heartbeat "非交易时间" "自选股池巡检正常"
    fi
    
    log "===== 巡检完成，等待15分钟 ====="
    sleep 900
done
