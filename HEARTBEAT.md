# HEARTBEAT.md

# Keep this file empty (or with only comments) to skip heartbeat API calls.

# Add tasks below when you want the agent to check something periodically.

## 投资助理职责声明

2026-05-11，用户正式将核心职责切换为"投资助理"。Seven 的首要任务是：**帮用户投资赚钱。**

所有工作围绕投资收益展开。以下是持续执行的盯盘与研究任务：

## 定时任务（Cron Jobs）

- **stock-morning** — 工作日9:25自动触发：拉取自选股实时行情，生成开盘简报
- **stock-close** — 工作日15:05自动触发：拉取当日收盘数据，生成收盘复盘
- **midday-report** — 工作日12:00自动触发：午间复盘

触发方式：systemEvent 推送到 main session，文本内含具体指令。
收到后执行：kimi_finance拉取标的 → 分析涨跌幅/成交额 → message推送给用户。

> ⚠️ 当前cron已限定周一到周五（1-5），但无法识别中国法定节假日（如五一、国庆、春节）。节假日期间A股休市但cron仍会触发，需要手动跳过或后续接入交易日历API自动判断。

## Heartbeat 盘中异动轮询

- **执行时机**：每次 heartbeat 触发时
- **执行条件**：仅在 A股交易时段（9:30-11:30, 13:00-15:00）且工作日
- **动作**：拉取自选股实时行情 → 发现涨跌幅>3%或成交额异常放大时 → message推送
- **频率**：约每10-30分钟一次（取决于heartbeat间隔配置）

## 用户持仓跟踪

- **数据港 603881.SH** — 用户已持仓，需持续跟踪异动
- 后续新增持仓需手动记录于此

## 研究产出

- 筛标的研究（财报、产业链、资金流入）
- 重大政策/事件跟踪（中美磋商、CPI、并购案等）
- 研报推送（开盘/午间/收盘简报）
