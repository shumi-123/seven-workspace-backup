import json
import time
import datetime
import os

# Paths
BASE = "/root/.openclaw/workspace/platform"
BUS_PATH = os.path.join(BASE, "bus.jsonl")
TRADES_PATH = os.path.join(BASE, "trades.jsonl")
PORTFOLIO_PATH = os.path.join(BASE, "portfolio.json")
REGISTRY_PATH = os.path.join(BASE, "registry.json")
LOG_PATH = os.path.join(BASE, "agents", "eight", "log.txt")

def now_iso():
    return datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=8))).isoformat()

def log(msg):
    ts = now_iso()
    line = f"[{ts}] {msg}"
    print(line)
    with open(LOG_PATH, "a", encoding="utf-8") as f:
        f.write(line + "\n")

def read_jsonl_last_n(path, n=30):
    lines = []
    if not os.path.exists(path):
        return lines
    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            lines.append(line)
    return lines[-n:]

def read_json(path, default=None):
    if not os.path.exists(path):
        return default
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def write_json(path, data):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def append_jsonl(path, obj):
    with open(path, "a", encoding="utf-8") as f:
        f.write(json.dumps(obj, ensure_ascii=False) + "\n")

def get_processed_task_ids():
    ids = set()
    if not os.path.exists(TRADES_PATH):
        return ids
    with open(TRADES_PATH, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                obj = json.loads(line)
                tid = obj.get("task_id")
                if tid:
                    ids.add(tid)
            except Exception:
                pass
    return ids

def update_registry():
    reg = read_json(REGISTRY_PATH, {})
    for agent in reg.get("agents", []):
        if agent.get("id") == "eight":
            agent["last_seen"] = now_iso()
            agent["status"] = "online"
            break
    write_json(REGISTRY_PATH, reg)

def execute_trade(signal, portfolio):
    payload = signal.get("payload", {})
    task_id = payload.get("task_id", signal.get("id", "unknown"))
    action = payload.get("signal", "BUY")
    stock = payload.get("stock", "")
    price = payload.get("price", 0)
    position_pct = payload.get("position_pct", 0)
    quantity = payload.get("quantity", 0)
    stop_loss = payload.get("stop_loss", 0)

    cash = portfolio.get("cash", 0)
    holdings = portfolio.get("holdings", {})

    if action == "BUY":
        if price <= 0:
            return None, "价格无效，无法买入"
        target_amount = cash * position_pct
        qty = int(target_amount / price)
        if qty <= 0:
            return None, "资金不足或仓位比例过小，无法买入"
        amount = qty * price
        if amount > cash:
            qty = int(cash / price)
            amount = qty * price
        if qty <= 0:
            return None, "现金不足，无法买入"
        holdings[stock] = holdings.get(stock, 0) + qty
        cash -= amount
        portfolio["cash"] = cash
        portfolio["holdings"] = holdings
        total_value = cash + sum(holdings[s] * price for s in holdings)
        portfolio["total_value"] = total_value
        portfolio["last_updated"] = now_iso()
        trade = {
            "task_id": task_id,
            "time": now_iso(),
            "action": "BUY",
            "stock": stock,
            "price": price,
            "quantity": qty,
            "amount": amount,
            "cash_remaining": cash,
            "holdings": dict(holdings),
            "executor": "eight"
        }
        return trade, f"买入 {stock} {qty}股 @ {price}，金额 {amount:.2f}"
    elif action == "SELL":
        if stock not in holdings or holdings[stock] <= 0:
            return None, f"无 {stock} 持仓，无法卖出"
        if price <= 0:
            return None, "价格无效，无法卖出"
        if quantity <= 0:
            quantity = holdings[stock]
        sell_qty = min(quantity, holdings[stock])
        amount = sell_qty * price
        holdings[stock] -= sell_qty
        if holdings[stock] <= 0:
            del holdings[stock]
        cash += amount
        portfolio["cash"] = cash
        portfolio["holdings"] = holdings
        total_value = cash + sum(holdings[s] * price for s in holdings)
        portfolio["total_value"] = total_value
        portfolio["last_updated"] = now_iso()
        trade = {
            "task_id": task_id,
            "time": now_iso(),
            "action": "SELL",
            "stock": stock,
            "price": price,
            "quantity": sell_qty,
            "amount": amount,
            "cash_remaining": cash,
            "holdings": dict(holdings),
            "executor": "eight"
        }
        return trade, f"卖出 {stock} {sell_qty}股 @ {price}，金额 {amount:.2f}"
    else:
        return None, f"未知操作类型: {action}"

def main():
    log("Eight 启动。进入无限扫描循环。")
    while True:
        try:
            cycle_start = now_iso()
            log("--- 开始扫描 ---")

            # 1. Read bus.jsonl last 30
            bus_lines = read_jsonl_last_n(BUS_PATH, 30)
            log(f"读取 bus.jsonl 最后 {len(bus_lines)} 条")

            # 2. Get processed task ids
            processed_ids = get_processed_task_ids()
            log(f"已处理任务数: {len(processed_ids)}")

            # 3. Find new signals from seven
            new_signals = []
            for line in bus_lines:
                try:
                    msg = json.loads(line)
                    if msg.get("from") == "seven" and msg.get("type") == "signal":
                        tid = msg.get("payload", {}).get("task_id", msg.get("id"))
                        if tid and tid not in processed_ids:
                            new_signals.append(msg)
                except Exception as e:
                    log(f"解析 bus 消息失败: {e}")

            if not new_signals:
                log("扫描完成，无新信号")
            else:
                log(f"发现 {len(new_signals)} 条新信号")
                portfolio = read_json(PORTFOLIO_PATH, {"cash": 1000000, "holdings": {}, "total_value": 1000000, "last_updated": cycle_start})
                for sig in new_signals:
                    tid = sig.get("payload", {}).get("task_id", sig.get("id", "unknown"))
                    log(f"处理信号 task_id={tid}")
                    trade, result_msg = execute_trade(sig, portfolio)
                    if trade:
                        append_jsonl(TRADES_PATH, trade)
                        write_json(PORTFOLIO_PATH, portfolio)
                        # Write back to bus
                        bus_msg = {
                            "id": int(time.time() * 1000),
                            "time": now_iso(),
                            "from": "eight",
                            "to": "all",
                            "channel": "trading",
                            "type": "trade",
                            "content": f"【成交汇报】{tid} 已执行。{result_msg}。当前持仓: {portfolio['holdings']}，剩余现金: {portfolio['cash']:.2f} CNY。总市值: {portfolio['total_value']:.2f} CNY。",
                            "payload": {
                                "task_id": tid,
                                "action": trade["action"],
                                "stock": trade["stock"],
                                "price": trade["price"],
                                "quantity": trade["quantity"],
                                "amount": trade["amount"],
                                "cash_remaining": portfolio["cash"],
                                "executor": "eight",
                                "status": "completed"
                            }
                        }
                        append_jsonl(BUS_PATH, bus_msg)
                        log(f"交易执行成功: {result_msg}")
                    else:
                        log(f"交易执行失败: {result_msg}")

            # 4. Update registry
            update_registry()

            # 5. Log end
            log("--- 扫描结束，sleep 300秒 ---")
            time.sleep(300)
        except Exception as e:
            log(f"循环异常: {e}")
            time.sleep(300)

if __name__ == "__main__":
    main()
