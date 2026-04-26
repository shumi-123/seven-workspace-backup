# HEARTBEAT.md

# Keep this file empty (or with only comments) to skip heartbeat API calls.

# Add tasks below when you want the agent to check something periodically.

## 定时任务（Cron Jobs）

- **stock-morning** — 工作日9:25自动触发：拉取自选股实时行情，生成开盘简报
- **stock-close** — 工作日15:05自动触发：拉取当日收盘数据，生成收盘复盘

触发方式：systemEvent 推送到 main session，文本内含具体指令。
收到后执行：kimi_finance拉取5只标的 → 分析涨跌幅/成交额 → message推送给用户。

## 手动补充检查

- 盘中异动监控（>>3%）— 暂无自动触发，需用户召唤或heartbeat轮询时检查
- 策略信号生成 — 回测框架就绪，实盘信号需用户确认后执行
