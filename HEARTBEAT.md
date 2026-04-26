# HEARTBEAT.md

# Keep this file empty (or with only comments) to skip heartbeat API calls.

# Add tasks below when you want the agent to check something periodically.

## 定时任务（Cron Jobs）

- **stock-morning** — 工作日9:25自动触发：拉取自选股实时行情，生成开盘简报
- **stock-close** — 工作日15:05自动触发：拉取当日收盘数据，生成收盘复盘

触发方式：systemEvent 推送到 main session，文本内含具体指令。
收到后执行：kimi_finance拉取5只标的 → 分析涨跌幅/成交额 → message推送给用户。

## Heartbeat 盘中异动轮询

- **执行时机**：每次 heartbeat 触发时
- **执行条件**：仅在 A股交易时段（9:30-11:30, 13:00-15:00）且工作日
- **动作**：拉取5只自选股实时行情 → 发现涨跌幅>3%或成交额异常放大时 → message推送
- **频率**：约每10-30分钟一次（取决于heartbeat间隔配置）

## 手动补充检查

- 策略信号生成 — 回测框架就绪，实盘信号需用户确认后执行
- 三角协作平台状态 — 检查 bus.jsonl 新消息，唐娜/摸鱼小哥是否在线
