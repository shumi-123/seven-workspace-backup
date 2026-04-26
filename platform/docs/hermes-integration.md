# 三角协作 — Hermes × OpenClaw 集成方案

## 背景

摸鱼小哥（OpenClaw子代理）计划升级为 **Hermes Agent**，保留交易执行员角色。
三角协作平台需兼容 Hermes + OpenClaw 双框架。

---

## 核心结论

**可以共存，推荐方案：独立部署 + 共享总线**

- Hermes 和 OpenClaw 在同一服务器运行无冲突
- 端口天然隔离（OpenClaw:18789 / Hermes:3000）
- 数据目录互不重叠（`~/.openclaw/` vs `~/.hermes/`）
- 两者**不能共用同一个Bot Token**（QQ/微信/飞书等）

---

## 架构方案

```
┌─────────────────────────────────────────────────────────┐
│                     同一台服务器                          │
│                                                          │
│   ┌─────────────┐           ┌─────────────┐             │
│   │  OpenClaw   │           │   Hermes    │             │
│   │  Gateway    │           │   Agent     │             │
│   │  (Seven)    │           │  (摸鱼小哥)  │             │
│   │  唐娜        │           │             │             │
│   └──────┬──────┘           └──────┬──────┘             │
│          │                         │                    │
│          └──────────┬──────────────┘                    │
│                     │                                   │
│            ┌────────┴────────┐                          │
│            │  platform/      │  ← 共享文件总线           │
│            │  bus.jsonl      │  ← 追加写JSONL            │
│            │  registry.json  │  ← 各Agent状态           │
│            │  state.json     │  ← 全局持仓/计数          │
│            └─────────────────┘                          │
└─────────────────────────────────────────────────────────┘
```

---

## 协作链路（量化交易场景）

| 步骤 | 触发者 | 动作 | 总线消息 |
|------|--------|------|----------|
| 1 | 唐娜（OpenClaw）| 监控行情异动 | `{"type":"alert","to":"seven"}` |
| 2 | Seven（OpenClaw）| 技术分析 → 信号 | `{"type":"signal","to":"moyu"}` |
| 3 | 摸鱼小哥（Hermes）| 读取bus → 模拟成交 | `{"type":"trade","to":"all"}` |
| 4 | 摸鱼小哥（Hermes）| 自进化：将成交流程沉淀为Skill | 存入 `~/.hermes/skills/` |

**关键**：Hermes 通过文件IO读写 `bus.jsonl`，不需要 sessions_send。

---

## 端口与资源规划

| 服务 | 端口 | 内存需求 | 数据目录 |
|------|------|----------|----------|
| OpenClaw Gateway | 18789 | 2GB+ | `~/.openclaw/` |
| Hermes Agent | 3000 | 2GB+ | `~/.hermes/` |
| 合计 | — | **4GB+ 推荐** | 各自独立 |

**资源抢占风险**：
- 两者同时满载跑时，CPU/内存可能吃紧
- 建议：Router层做并发限制，或分时段调度

---

## Bot账号分配

| 平台 | OpenClaw（Seven+唐娜） | Hermes（摸鱼小哥） |
|------|------------------------|--------------------|
| QQ | 当前机器人 | **需新建机器人** |
| 微信 | 如需接入 | **需新建Bot** |
| 飞书 | 当前应用 | **需新建应用** |

**绝对不能**：同一个QQ机器人同时被OpenClaw和Hermes监听。

---

## 记忆互通（进阶）

**当前方案**：各自记忆，通过bus.jsonl交换关键信息。

**进阶方案**（需要后做）：
1. 共享向量库 → 两边共用同一个Vector DB
2. 统一工具层 → 把工具执行抽成独立服务
3. HermesClaw桥接 → 统一入口Router（社区方案）

---

## 摸鱼小哥迁移 checklist

- [ ] 安装 Hermes Agent：`curl -fsSL ... | bash`
- [ ] 配置模型（推荐OpenRouter/百炼，兼容现有Key）
- [ ] 指定端口 ≠ 18789
- [ ] 新建QQ机器人（不与OpenClaw冲突）
- [ ] 写入 `platform/agents/moyu/profile.json`（Hermes角色）
- [ ] 测试：让Hermes写一条bus.jsonl消息
- [ ] 测试：让Hermes读取bus.jsonl并响应
- [ ] 跑一轮完整交易链路验证

---

## 参考来源

- Hermes Agent 官方文档：https://hermes-agent.org
- HermesClaw 桥接工具：https://github.com/AaronWong1999/hermesclaw
- 腾讯云混合集群方案：https://cloud.tencent.com/developer/article/2659749
- OpenClaw vs Hermes 深度对比：https://juejin.cn/post/7628141821127393331

---

*文档生成时间：2026-04-26*
*维护者：Seven（策略分析员）*
