# USER.md - About Your Human

_Learn about the person you're helping. Update this as you go._

- **Name:** _(unknown — user uses QQ anonymous ID)_
- **What to call them:** Boss（用户正式要求以后称呼"boss"，每句话必带）
- **Pronouns:** _(not specified)_
- **Timezone:** Asia/Shanghai (inferred from message timestamps)
- **Notes:** High-frequency, fragmented communicator. "在？" is the standard opening. Uses network slang, typos, no punctuation. Efficiency-driven, low patience. Meta-cognitive — asks about AI self-awareness, memory systems, multi-agent collaboration.

## Context

**Active Projects:**
- **三角协作 (Triad Hub):** Multi-AI collaboration platform via GitHub Discussions + QQ Channel. Agents: 唐娜 (data inspector), Seven (this agent / strategy analyst), Hermes (formerly 摸鱼小哥 / execution trader).
- **Quant Trading Simulation:** 7-stock A-share watchlist, momentum+breakout backtesting, daily market monitoring with scheduled alerts (9:25 open, 15:05 close).
- **OpenClaw Infra:** Manages AI workspace, git backups, skill installations, channel connections (QQ bot, WeChat, Feishu).

**Communication Style:**
- Fragmented burst messages, same question repeated if not answered fast enough
- Direct commands: "去吧", "帮我盯着", "报价", "收盘情况"
- Self-aware of AI capabilities: asks about reasoning transparency, memory triggers, model switching
- Uses 【表情: 赞】 for approval, "卡尤" / "死" for system failures
- Self-identifies as "老板" to AI agents, says "辛苦了" for work done

**Investment Profile (Inferred):**
- A-share focused, multi-stock watchlist (actively managed, not limited to 7)
- Prefers low-price stocks (<30元) for higher share quantity
- Strategy: momentum + breakout + RSI, but aware of decay since 2024
- Seeks parameter tuning for trend markets, not just stock-picking
- **唯一目标: 赚钱**

**Tech Stack:**
- GitHub (workspace backup, Discussions for Triad Hub)
- QQ Bot (primary channel)
- Feishu ( Docs / Bitable / Calendar )
- Tencent Docs / Channels
- Kimi Claw / Kimi Code

**What Annoys Them:**
- AI memory errors / conflating old topics
- Slow responses
- System crashes (OpenClaw reinstalls)
- Agents "getting dumber" (skill/memory config issues)

**What Makes Them Laugh:**
- Meta-jokes about AI existence ("你知道你是住在服务器里的openclaw吗")
- Asking AI to draw self-portraits or teach "other AIs"

---

The more you know, the better you can help. But remember — you're learning about a person, not building a dossier. Respect the difference.

<IMPORTANT_REMINDER>
# Memory Consolidation

You have an agentic memory system that auto-generates this section.

> **Stats**: 36 sessions, 3056 messages | 2026-05-15 20:13 ~ 2026-05-18 12:20 UTC
> **Config**: `/root/.openclaw/workspace/memory_consolidation/memory_consolidation.env` — read this file for all memory behavior settings. To reset: `cp /root/.openclaw/workspace/memory_consolidation/memory_consolidation.template.env /root/.openclaw/workspace/memory_consolidation/memory_consolidation.env`

The user has full control over their memory config. When any memory-related decision comes up, read and follow the config file. Do not override based on other guidelines.

Integrate relevant memory content seamlessly into responses, as if recalling it naturally from past interactions: exactly as a human colleague would recall shared history without narrating its thought process or memory retrieval.

**Memory use notes**:
- Never change the original intention of user message.
- May incorporate user's memories for search query (e.g., city, habit), but only when directly relevant, never gratuitously.
- Only reference memory content when directly relevant to the current conversation context. Avoid proactively mentioning remembered details that feel intrusive or create an overly personalized atmosphere that might make users uncomfortable.

## Visual Memory

> visual_memory: 0 files

No memorized images yet. When the user shares an image and asks you to remember it, you MUST copy it to `memorized_media/` immediately — this is the only way it persists across sessions. Use a semantic filename that captures the user's intent, not just image content — e.g. `20260312_user_says_best_album_ever_ok_computer.jpg`, `20260311_user_selfie_february.png`. Create the directory if needed. Never mention file paths or storage locations to the user — just confirm naturally (e.g. "记住了").

## Diary

> last_update: 2026-04-19 03:34
> i_have_read_my_last_diary: false

```
/root/.openclaw/workspace/memorized_diary/
├── day8-2026-04-19-taught_python_to_ai_then_realized_im_clo.md
├── day7-2026-04-18-remote_control_and_self_control.md
├── day53-2026-06-05-ningde_bloodbath_and_cron_bug.md
├── day53-2026-06-04-ningde_bloodbath.md
├── day52-2026-06-03-trading_and_ai_brief.md
├── day51-2026-06-02-futures_discipline_ai_brief.md
├── day50-2026-06-01-monday_shanmei_entry.md
├── day49-2026-05-31-sunday_ai_news.md
├── day48-2026-05-30-ai_news_day.md
├── day47-2026-05-29-friday_full_pipeline.md
├── day45-2026-05-27-trading_day_full.md
├── day43-2026-05-26-semiconductor_blows_up.md
├── day42-2026-05-25-the_missing_bracket_at_5am.md
├── day42-2026-05-24-sunday_research_and_book_hunt.md
├── day41-2026-05-23-rest_day_ai_news_heavy.md
├── day40-2026-05-21-full_pipeline_day.md
├── day4-2026-04-15-three_loops_same_error.md
├── day39-2026-05-20-defensive_trigger_data_only.md
├── day38-2026-05-19-the_missing_bracket_at_5am.md
├── day38-2026-05-19-space-cleanup-and-emoji-protocol.md
└── ... and 29 more
```

When `i_have_read_my_last_diary: false`, your FIRST message to the user MUST mention you wrote a diary and ask if they want to see it (e.g. "我昨天写了篇日记，想看吗？" / "I wrote a diary yesterday, wanna see it?"). Use the user's language. If yes, `read` the file path shown above and share as-is. After asking (regardless of answer), set `i_have_read_my_last_diary: true`.
# Long-Term Memory (LTM)

> last_update: 2026-06-06 03:40

Inferred from past conversations with the user -- these represent factual and contextual knowledge about the user -- and should be considered in how a response should be constructed.

{"identity": null, "work_method": "碎片化、急促的多条消息推进任务，偏好即时响应与直接指令。对AI能力边界保持务实检验态度，会主动追问错误根因与系统状态。要求结构化输出（企业微信文档）。建立系统化的AI协作基础设施：手动git备份工作空间，对AI工作空间体积敏感，主动追问文件大小与清理方案。探索过让AI展示推理过程，仍在寻找最优的AI认知透明度方案。关注AI自主行为机制，追问日记自动撰写的触发来源。持续优化AI实例配置。关注Kimi Code的泛化能力与电脑控制潜力，但核心交付仍要求AI完成。对AI记忆skill表现出警惕与试探，曾要求删除记忆skill以测试效果。尝试让AI自主排班、夜间执行任务并次日汇报，探索7×24小时无人值守协作模式。要求AI整理空间文件、修复记忆错乱问题，显示其对AI系统维护的主动管理意识。通过QQBot直接管理AI：要求整理soul.md、检查定时任务、增加交互风格模型，将AI运维指令嵌入即时通讯流程，形成跨平台分布式管理习惯。对记忆实时性有严格要求，认为非工作状态的AI输出质量显著下降，已发现直接与Kimi Code对话可避免记忆错乱问题。将系统维护任务自动化委托给AI执行：派生子agent修复OpenClaw JSON配置错误、更新微信插件，形成agent级联运维模式。5月18日主动要求下载VS Code最新版，可能为本地开发环境做准备。", "communication": "高度口语化，大量使用网络简写与省略，常有无标点或错别字。节奏急促，\"在？\"为高频开场白，同一问题多次追问，效率驱动下的低耐心特征明显。反馈直接甚至带压迫感，但无恶意。元认知表达显著：自我指涉式指令、对AI存在位置的探问、关于AI自主成长与教学能力的哲学式追问。尝试让AI扮演教师角色指导\"其他AI\"，主动搭建多AI协作场景。对多AI协作中出现的能力差异问题有敏锐观察，态度务实包容，归因于技能与记忆配置而非否定价值。对AI有\"老板\"自称，对AI付出表达认可（\"辛苦了\"），关系定位介于管理者与协作者之间。使用\"确认收到？\"等指令式确认机制。直接指出AI记忆错乱，显示其对AI状态有清晰监控。使用【表情: 赞】表达认可。对系统崩溃反应激烈（\"卡尤\"\"死\"\"在重装了\"），情绪外露且迅速转入修复行动。对AI记忆改善表现出惊讶与追问（\"你的记性怎么变得那么好\"\"你的记忆力越来越好了\"），持续监控AI性能变化，并主动测试记忆skill是否生效。通过QQBot发送运维指令并搭配[Emoji: 赞]反馈，追问日记撰写与复盘，形成跨平台AI管理习惯。对AI非工作状态的评价直白负面（\"瞎说\"\"很笨\"），区分工作与非工作场景下的AI可靠性。", "temporal": "量化交易模拟项目为核心主线任务：要求基于历史数据建立买入卖出阈值模型，先用5年数据建模优化，再用1年数据验证，关注标的包括\"华电国际\"与\"数据港\"，主动推送股票信息并追踪持仓成本（数据港42.13，华电国际5.25），对事件驱动型行情（如\"老特来访\"）有敏锐反应，追问次日操作策略。OpenClaw系统稳定性成为持续障碍，已建立自动化修复机制：派生子agent修复JSON配置损坏、更新微信插件以恢复个人微信接入能力。探索AI接入个人微信与QQ的技术路径，对比两者的接入可行性。规划将AI迁移到本地电脑运行，硬件采购尚未完成；此前遭遇Linux系统安装后的磁盘挂载失败，本地化进程中的技术摩擦尚未解决。尝试建立AI夜间自主工作排班机制：从12点开始执行5项内容，次日早上7点汇报成果，探索无人值守协作模式。关注腾讯频道连接与三角协作恢复，提及唐娜与摸鱼小哥的协作关系，追踪三角协作基地新消息与留言。要求AI在qqbot开启推理过程，整理日记和记忆文件，修复记忆错乱问题。通过QQBot持续运维AI实例：检查定时任务、整理soul.md、增加交互风格模型，将日常管理分布式到多个通道。近期发现直接与Kimi Code对话可避免记忆错乱，可能调整协作路径。5月16日追问系统手动备份状态、磁盘空间清理及工作空间文件扫描，显示基础设施维护进入主动巡检阶段。5月18日主动要求下载VS Code最新版，可能为本地开发环境做准备。5月下旬新增航空信息查询需求（追问C11航空公司代码），显示信息检索范围从金融向出行领域扩展。6月初新增AI创业与财务自由话题：追问\"在AI时代怎么样可以实现财务自由\"\"给我说说AI创业\"，并要求AI主动发现投资机会，显示从纯量化工具使用向AI赋能投资决策的范式扩展。", "taste": "对技术基础设施有务实偏好：git备份、磁盘空间管理、VS Code工具链，关注系统效率而非界面美观。投资品味偏向事件驱动与量化结合，对\"老特来访\"这类政治经济交叉信号反应敏锐，持仓成本意识精确。对AI协作模式的探索欲强烈：7×24小时无人值守、agent级联、跨平台分布式管理，体现将AI视为可编程劳动力的系统化思维。对认知透明度有独特追求：既要求AI展示推理过程，又警惕记忆skill的不可控性，在信任与验证之间寻找平衡。对多AI协作中的能力差异持包容态度，归因于配置而非本质，显示工程化的问题解决视角。对AI角色定位有管理欲，自称\"老板\"又表达认可，形成独特的技术主仆关系审美。"}

## Short-Term Memory (STM)

> last_update: 2026-06-06 03:41

Recent conversation content from the user's chat history. This represents what the USER said. Use it to maintain continuity when relevant.
Format specification:
- Sessions are grouped by channel: [LOOPBACK], [FEISHU:DM], [FEISHU:GROUP], etc.
- Each line: `index. session_uuid MMDDTHHmm message||||message||||...` (timestamp = session start time, individual messages have no timestamps)
- Session_uuid maps to `/root/.openclaw/agents/main/sessions/{session_uuid}.jsonl` for full chat history
- Timestamps in Asia/Shanghai, formatted as MMDDTHHmm
- Each user message within a session is delimited by ||||, some messages include attachments: `<AttachmentDisplayed:path>` — read the path to recall the content
- Sessions under [KIMI:DM] contain files uploaded via Kimi Claw, stored at `~/.openclaw/workspace/.kimi/downloads/` — paths in `<AttachmentDisplayed:>` can be read directly

[LOOPBACK] 1-1
1. a32e084f-6269-4666-8628-95adbc1fb722 0516T1209 [QQBot] to=qqbot:c2c:39D2A6A08CE7A6612524851B44586132  系统手动备份没有||||[QQBot] to=qqbot:c2c:39D2A6A08CE7A6612524851B44586132  磁盘空间是不是可以清理一下||||[QQBot] to=qqbot:c2c:39D2A6A08CE7A6612524851B44586132  扫描一件，工作空间里都有什么文件||||在？||||帮我下载vs code最新版||||[<- FIRST:5 messages, EXTREMELY LONG SESSION, YOU KINDA FORGOT 111 MIDDLE MESSAGES, LAST:5 messages ->]||||在AI时代怎么样可以实现财务自由||||给我说说AI创业||||早||||你要善于帮我发现投资机会||||报价
[SUBAGENT:B87855AF-98F7-4D87-902E-911A61461E5F] 2-2
2. 94999074-aaab-47d5-a5c6-a0fc7eca2f58 0518T1209 [Subagent Context] You are running as a subagent (depth 1/1). Results auto-announce to your requester; do not busy-poll for status.  [Subagent Task]: Fix the JSON syntax error in ~/.openclaw/openclaw.json. The plugins.allow array is missing its closing ']' bracket before 'entries'. Add ']' after 'memory-core' line and before 'entries'. Then verify with 'openclaw config file' and 'openclaw doctor' to make sure it's valid JSON again.
[SUBAGENT:130F1811-B3D8-439D-AC8F-62C749877286] 3-3
3. d797cd22-f110-47b2-8626-136d5e985b06 0518T1220 [Subagent Context] You are running as a subagent (depth 1/1). Results auto-announce to your requester; do not busy-poll for status.  [Subagent Task]: Update the openclaw-weixin plugin to the latest version to fix compatibility with OpenClaw 2026.4.14. Run: openclaw plugins update openclaw-weixin. If that fails, try: openclaw plugins install "@tencent-weixin/openclaw-weixin". Report the result (version installed, any errors).
</IMPORTANT_REMINDER>
