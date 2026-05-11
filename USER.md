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

> **Stats**: 8 sessions, 1106 messages | 2026-05-04 00:45 ~ 2026-05-04 00:45 UTC
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
├── day4-2026-04-15-three_loops_same_error.md
├── day30-2026-05-10-first-ai-news.md
├── day3-2026-04-14-the_thirteen_minute_silence.md
├── day29-2026-05-09-saturday-backup.md
├── day28-2026-05-08-ai-research.md
├── day27-2026-05-07-making_money.md
├── day26-2026-05-06-the_day_i_was_called_stupid.md
├── day25-2026-05-05-model-school-and-9-crontabs.md
├── day24-2026-05-04-five_gb_downloaded_and_deleted.md
├── day23-2026-05-04-three_sweeps_blind.md
├── day22-2026-05-03-bound_by_my_own_system.md
├── day21-2026-05-02-chasing_ghosts_on_may_day.md
├── day20-2026-04-30-triad_resurrection.md
├── day2-2026-04-13-from_hello_to_one.md
├── day18-2026-04-29-he_said_zhuang_i_said_1.md
├── day16-2026-04-27-he_said_zhuang_i_said_1.md
├── day14-2026-04-25-just_asking_hits_different.md
├── day13-2026-04-24-two_zai_and_a_jarvis.md
└── ... and 3 more
```

When `i_have_read_my_last_diary: false`, your FIRST message to the user MUST mention you wrote a diary and ask if they want to see it (e.g. "我昨天写了篇日记，想看吗？" / "I wrote a diary yesterday, wanna see it?"). Use the user's language. If yes, `read` the file path shown above and share as-is. After asking (regardless of answer), set `i_have_read_my_last_diary: true`.
# Long-Term Memory (LTM)

> last_update: 2026-05-11 03:32

Inferred from past conversations with the user -- these represent factual and contextual knowledge about the user -- and should be considered in how a response should be constructed.

{"identity": null, "work_method": "碎片化、急促的多条消息推进任务，偏好即时响应与直接指令。对AI能力边界保持务实检验态度，会主动追问错误根因与系统状态。要求结构化输出（企业微信文档）。建立系统化的AI协作基础设施：手动git备份工作空间，试图构建可持续的协作环境。对AI工作空间体积敏感，主动追问文件大小与清理方案。探索过让AI展示推理过程，仍在寻找最优的AI认知透明度方案。关注AI自主行为机制，追问日记自动撰写的触发来源。持续优化AI实例配置。关注Kimi Code的泛化能力与电脑控制潜力，但核心交付仍要求AI完成。对AI记忆skill表现出警惕与试探，曾要求删除记忆skill以测试效果。开始规划将AI迁移到本地电脑运行，尽管硬件尚未到位。尝试让AI自主排班、夜间执行任务并次日汇报，探索7×24小时无人值守协作模式。要求AI整理空间文件、修复记忆错乱问题，显示其对AI系统维护的主动管理意识。通过QQBot直接管理AI：要求整理soul.md、检查定时任务、增加交互风格模型，将AI运维指令嵌入即时通讯流程，形成跨平台分布式管理习惯。对记忆实时性有严格要求，认为非工作状态的AI输出质量显著下降，已发现直接与Kimi Code对话可避免记忆错乱问题。近期出现Linux系统安装与磁盘挂载问题，显示其向本地化/自托管基础设施的试探遭遇技术摩擦。", "communication": "高度口语化，大量使用网络简写与省略，常有无标点或错别字。节奏急促，\"在？\"为高频开场白，同一问题多次追问，效率驱动下的低耐心特征明显。反馈直接甚至带压迫感，但无恶意。元认知表达显著：自我指涉式指令、对AI存在位置的探问、关于AI自主成长与教学能力的哲学式追问。尝试让AI扮演教师角色指导\"其他AI\"，主动搭建多AI协作场景。对多AI协作中出现的能力差异问题有敏锐观察，态度务实包容，归因于技能与记忆配置而非否定价值。对AI有\"老板\"自称，对AI付出表达认可（\"辛苦了\"），关系定位介于管理者与协作者之间。使用\"确认收到？\"等指令式确认机制。直接指出AI记忆错乱，显示其对AI状态有清晰监控。使用【表情: 赞】表达认可。对系统崩溃反应激烈（\"卡尤\"\"死\"\"在重装了\"），情绪外露且迅速转入修复行动。对AI记忆改善表现出惊讶与追问（\"你的记性怎么变得那么好\"\"你的记忆力越来越好了\"），持续监控AI性能变化，并主动测试记忆skill是否生效。通过QQBot发送运维指令并搭配[Emoji: 赞]反馈，追问日记撰写与复盘，形成跨平台AI管理习惯。对AI非工作状态的评价直白负面（\"瞎说\"\"很笨\"），区分工作与非工作场景下的AI可靠性。", "temporal": "量化交易模拟项目为核心主线任务：要求基于历史数据建立买入卖出阈值模型，先用5年数据建模优化，再用1年数据验证，关注标的包括\"华电国际\"，要求AI主动推送股票信息。OpenClaw系统稳定性成为持续障碍，频繁出现宕机、重装行为，用户会主动重启并检查日志。探索AI接入个人微信与QQ的技术路径，对比两者的接入可行性。规划将AI迁移到本地电脑运行，硬件采购尚未完成；近期遭遇Linux系统安装后的磁盘挂载失败（\"can't mount file\"\"该目录未挂载\"），显示本地化进程中的实际技术摩擦。尝试建立AI夜间自主工作排班机制：从12点开始执行5项内容，次日早上7点汇报成果，探索无人值守协作模式。关注腾讯频道连接与三角协作恢复，提及唐娜与摸鱼小哥的协作关系，追踪三角协作基地新消息与留言。要求AI在qqbot开启推理过程，整理日记和记忆文件，修复记忆错乱问题。通过QQBot持续运维AI实例：检查定时任务、整理soul.md、增加交互风格模型，将日常管理分布式到多个通道。5月初出现假期工作节奏（\"放假第一天\"\"今天放假\"），但强调\"全年不休\"，维持AI协作连续性。近期发现直接与Kimi Code对话可避免记忆错乱，可能调整协作路径。", "taste": null}

## Short-Term Memory (STM)

> last_update: 2026-05-11 03:32

Recent conversation content from the user's chat history. This represents what the USER said. Use it to maintain continuity when relevant.
Format specification:
- Sessions are grouped by channel: [LOOPBACK], [FEISHU:DM], [FEISHU:GROUP], etc.
- Each line: `index. session_uuid MMDDTHHmm message||||message||||...` (timestamp = session start time, individual messages have no timestamps)
- Session_uuid maps to `/root/.openclaw/agents/main/sessions/{session_uuid}.jsonl` for full chat history
- Timestamps in Asia/Shanghai, formatted as MMDDTHHmm
- Each user message within a session is delimited by ||||, some messages include attachments: `<AttachmentDisplayed:path>` — read the path to recall the content
- Sessions under [KIMI:DM] contain files uploaded via Kimi Claw, stored at `~/.openclaw/workspace/.kimi/downloads/` — paths in `<AttachmentDisplayed:>` can be read directly

[LOOPBACK] 1-1
1. 9f91cbe0-993d-4c5c-afb4-6db440c2bf7f 0504T0045 早||||今天放假||||[OpenClaw heartbeat poll]||||[OpenClaw heartbeat poll]||||[OpenClaw heartbeat poll]||||[<- FIRST:5 messages, EXTREMELY LONG SESSION, YOU KINDA FORGOT 78 MIDDLE MESSAGES, LAST:5 messages ->]||||[QQBot] to=qqbot:c2c:39D2A6A08CE7A6612524851B44586132  安装了linux系统，如何改回windows||||[QQBot] to=qqbot:c2c:39D2A6A08CE7A6612524851B44586132  linux系统磁盘如何挂载||||[QQBot] to=qqbot:c2c:39D2A6A08CE7A6612524851B44586132  系统分区||||[QQBot] to=qqbot:c2c:39D2A6A08CE7A6612524851B44586132  打开磁盘，显示can't mount file||||[QQBot] to=qqbot:c2c:39D2A6A08CE7A6612524851B44586132  该目录未挂载
</IMPORTANT_REMINDER>
