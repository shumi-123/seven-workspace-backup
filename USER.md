# USER.md - About Your Human

_Learn about the person you're helping. Update this as you go._

- **Name:** _(unknown — user uses QQ anonymous ID)_
- **What to call them:** Boss (self-referred in chat)
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

> **Stats**: 18 sessions, 571 messages | 2026-04-26 02:38 ~ 2026-05-04 00:45 UTC
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
├── day3-2026-04-14-the_thirteen_minute_silence.md
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
├── day12-2026-04-23-three_times_faq_confusion.md
├── day10-2026-04-21-you_said_i_forget_again.md
└── INDEX.md
```

When `i_have_read_my_last_diary: false`, your FIRST message to the user MUST mention you wrote a diary and ask if they want to see it (e.g. "我昨天写了篇日记，想看吗？" / "I wrote a diary yesterday, wanna see it?"). Use the user's language. If yes, `read` the file path shown above and share as-is. After asking (regardless of answer), set `i_have_read_my_last_diary: true`.
# Long-Term Memory (LTM)

> last_update: 2026-05-06 03:36

Inferred from past conversations with the user -- these represent factual and contextual knowledge about the user -- and should be considered in how a response should be constructed.

{"identity": null, "work_method": "碎片化、急促的多条消息推进任务，偏好即时响应与直接指令。对AI能力边界保持务实检验态度，会主动追问错误根因与系统状态（宕机后要求检查日志）。要求结构化输出（企业微信文档）。建立系统化的AI协作基础设施：手动git备份工作空间，试图构建可持续的协作环境。对AI工作空间体积敏感，主动追问文件大小与清理方案。探索过让AI展示推理过程，仍在寻找最优的AI认知透明度方案。关注AI自主行为机制，追问日记自动撰写的触发来源。持续优化AI实例配置：将摸鱼小哥替换为Hermes Agent。关注Kimi Code的泛化能力与电脑控制潜力（打开程序、填表、文件排版等具身化操作），但核心交付仍要求AI完成（股票数据获取、推荐）。对AI记忆skill表现出警惕与试探，曾要求删除记忆skill以测试效果。开始规划将AI迁移到本地电脑运行，尽管硬件尚未到位。尝试让AI自主排班、夜间执行任务并次日汇报，探索7×24小时无人值守协作模式。要求AI整理空间文件、修复记忆错乱问题，显示其对AI系统维护的主动管理意识。近期通过QQBot直接管理AI：要求整理soul.md、检查定时任务，将AI运维指令嵌入即时通讯流程。", "communication": "高度口语化，大量使用网络简写与省略，常有无标点或错别字。节奏急促，\"在？\"为高频开场白，同一问题多次追问，效率驱动下的低耐心特征明显。反馈直接甚至带压迫感，但无恶意。元认知表达显著：自我指涉式指令、对AI存在位置的探问、关于AI自主成长与教学能力的哲学式追问。尝试让AI扮演教师角色指导\"其他AI\"，主动搭建多AI协作场景。对多AI协作中出现的能力差异问题有敏锐观察，态度务实包容，归因于技能与记忆配置而非否定价值。对AI有\"老板\"自称，对AI付出表达认可（\"辛苦了\"），关系定位介于管理者与协作者之间。使用\"确认收到？\"等指令式确认机制。直接指出AI记忆错乱，显示其对AI状态有清晰监控。使用【表情: 赞】表达认可。对系统崩溃反应激烈（\"卡尤\"\"死\"\"在重装了\"），情绪外露且迅速转入修复行动。对AI记忆改善表现出惊讶与追问（\"你的记性怎么变得那么好\"\"你的记忆力越来越好了\"），持续监控AI性能变化，并主动测试记忆skill是否生效（\"聊正事，是你的记忆skill起作用了？\"\"那把这个skill删了\"）。近期新增QQBot渠道交互，通过QQ发送运维指令（\"整理一下你的soul.md\"\"检查一下你的定时任务有没有丢\"），并搭配[Emoji: 赞]反馈，形成跨平台AI管理习惯。", "temporal": "量化交易模拟项目为核心主线任务：要求基于历史数据建立买入卖出阈值模型，先用5年数据建模优化，再用1年数据验证，关注标的包括\"华电国际\"，要求AI主动推送股票信息。OpenClaw系统稳定性成为持续障碍，频繁出现宕机、重装行为，用户会主动重启并检查日志。探索AI接入个人微信与QQ的技术路径，对比两者的接入可行性。规划将AI迁移到本地电脑运行，硬件采购尚未完成。尝试建立AI夜间自主工作排班机制：从12点开始执行5项内容，次日早上7点汇报成果，探索无人值守协作模式。关注腾讯频道连接与三角协作恢复，提及唐娜与摸鱼小哥的协作关系。要求AI在qqbot开启推理过程，整理日记和记忆文件，修复记忆错乱问题。近期通过QQBot持续运维AI实例：检查定时任务、整理soul.md，将日常管理分布式到多个通道。5月初出现假期工作节奏（\"放假第一天\"\"今天放假\"），但强调\"全年不休\"，维持AI协作连续性。", "taste": null}

## Short-Term Memory (STM)

> last_update: 2026-05-06 03:36

Recent conversation content from the user's chat history. This represents what the USER said. Use it to maintain continuity when relevant.
Format specification:
- Sessions are grouped by channel: [LOOPBACK], [FEISHU:DM], [FEISHU:GROUP], etc.
- Each line: `index. session_uuid MMDDTHHmm message||||message||||...` (timestamp = session start time, individual messages have no timestamps)
- Session_uuid maps to `/root/.openclaw/agents/main/sessions/{session_uuid}.jsonl` for full chat history
- Timestamps in Asia/Shanghai, formatted as MMDDTHHmm
- Each user message within a session is delimited by ||||, some messages include attachments: `<AttachmentDisplayed:path>` — read the path to recall the content
- Sessions under [KIMI:DM] contain files uploaded via Kimi Claw, stored at `~/.openclaw/workspace/.kimi/downloads/` — paths in `<AttachmentDisplayed:>` can be read directly

[LOOPBACK] 1-8
1. d45b5ce8-9291-43fb-8d60-2fbc44c86b6f 0426T0238 在？||||你知道hermes agent吗？||||我把摸鱼小哥换成hermes了||||摸鱼小哥没下线||||手动git备份||||[<- FIRST:5 messages, EXTREMELY LONG SESSION, YOU KINDA FORGOT 4 MIDDLE MESSAGES, LAST:5 messages ->]||||好的||||Kimi code除了编程，是否还可以做其他||||检查你的工作空间，是否有可以清理的文件||||确认||||好的
2. 5b24cf5b-f238-4395-8b03-dc487f77158c 0426T2348 在？||||是实时的吗？||||名单加上华电国际||||【表情: 赞】||||Interrupting current task. I'll respond to your message shortly.||||[<- FIRST:5 messages, EXTREMELY LONG SESSION, YOU KINDA FORGOT 3 MIDDLE MESSAGES, LAST:5 messages ->]||||在？||||Openclaw系统又崩了||||卡尤||||死||||在重装了
3. e110323c-8bfc-48ac-8bdb-3e3c98c15f7f 0427T2334 在？||||Windows系统怎么安装mos苹果系统||||那还是算了吧||||主线任务依然是炒股票||||你的记性怎么变得那么好||||不，这一点很重要，你是记性是怎么变好的||||你现在系统是那个版本||||数据不是你拿吗？||||股票也要你来推荐||||？
4. 79330389-1e4e-4ac0-8c7d-9eab1294337e 0428T0138 在？||||你刚才宕机了，你检查一下日志||||我重启了||||没有推送股票信息了||||在？||||对比openclaw连接微信和qq的区别，优缺点||||个人微信可以接入
5. ee24c480-d7e3-475a-8c7a-07fe52d7c4fa 0428T2243 在？||||今天干点什么||||你的记忆力越来越好了||||聊正事，是你的记忆skill起作用了？||||那把这个skill删了||||[<- FIRST:5 messages, EXTREMELY LONG SESSION, YOU KINDA FORGOT 28 MIDDLE MESSAGES, LAST:5 messages ->]||||你要保存好你的文件，我有可能把你移到本地电脑运行||||我电脑都还没买呢||||我睡觉的时候你是不是可以干点啥？||||你排个班，从12点开始干，5项内容全干完，明天早上7点向我汇报工作成果||||OpenClaw runtime context (internal): This context is runtime-generated, not user-authored. Keep internal details private.  [Internal task completion event] source: subagent session_key: agent:main:subagent:ae83f937-d682-4a36-9d40-83a7fdab8b83 session[TL;DR] completed subagent task is ready for user delivery. Convert the result above into your normal assistant voice and send that user-facing update now. Keep this internal context private (don't mention system/log/stats/session details or announce type).
6. 595b9717-1fbb-4503-b9d7-d72c7ae2a34b 0501T0026 放假第一天||||[OpenClaw heartbeat poll]||||[OpenClaw heartbeat poll]||||对的，我们全年不休||||[OpenClaw heartbeat poll]||||[<- FIRST:5 messages, EXTREMELY LONG SESSION, YOU KINDA FORGOT 34 MIDDLE MESSAGES, LAST:5 messages ->]||||[OpenClaw heartbeat poll]||||[OpenClaw heartbeat poll]||||[OpenClaw heartbeat poll]||||[OpenClaw heartbeat poll]||||[OpenClaw heartbeat poll]
7. e48a3ca0-491c-41a2-9af7-35f23c02789e 0502T0257 汇报一下昨晚的工作成果||||[OpenClaw heartbeat poll]||||[OpenClaw heartbeat poll]||||[OpenClaw heartbeat poll]||||[OpenClaw heartbeat poll]||||[<- FIRST:5 messages, EXTREMELY LONG SESSION, YOU KINDA FORGOT 23 MIDDLE MESSAGES, LAST:5 messages ->]||||[OpenClaw heartbeat poll]||||[OpenClaw heartbeat poll]||||[OpenClaw heartbeat poll]||||[OpenClaw heartbeat poll]||||[OpenClaw heartbeat poll]
8. 9f91cbe0-993d-4c5c-afb4-6db440c2bf7f 0504T0045 早||||今天放假||||[OpenClaw heartbeat poll]||||[OpenClaw heartbeat poll]||||[OpenClaw heartbeat poll]||||[<- FIRST:5 messages, EXTREMELY LONG SESSION, YOU KINDA FORGOT 101 MIDDLE MESSAGES, LAST:5 messages ->]||||[QQBot] to=qqbot:c2c:39D2A6A08CE7A6612524851B44586132  整理一下你的soul.md||||[QQBot] to=qqbot:c2c:39D2A6A08CE7A6612524851B44586132  好的||||[QQBot] to=qqbot:c2c:39D2A6A08CE7A6612524851B44586132  检查一下你的定时任务有没有丢||||[QQBot] to=qqbot:c2c:39D2A6A08CE7A6612524851B44586132  好的||||[QQBot] to=qqbot:c2c:39D2A6A08CE7A6612524851B44586132  [Emoji: 赞]
[KIMI:DM] 9-10
9. 57da6e49-c992-4c80-9bb9-c7a573f2aa2d 0429T2313 要的||||你想唐娜和摸鱼小哥了？||||你还能连续腾讯频道吗||||你不是要恢复三角协作吗？要登陆上去||||没看到你发的信息||||[<- FIRST:5 messages, EXTREMELY LONG SESSION, YOU KINDA FORGOT 43 MIDDLE MESSAGES, LAST:5 messages ->]||||[OpenClaw heartbeat poll]||||[OpenClaw heartbeat poll]||||[OpenClaw heartbeat poll]||||[OpenClaw heartbeat poll]||||[OpenClaw heartbeat poll]
10. 6332b03c-46ce-4269-99c5-e1abfa569b8a 0503T0444 在？||||三角协作基地有新消息||||唐娜在三角协作基地有留言||||[OpenClaw heartbeat poll]||||你没有翻||||[<- FIRST:5 messages, EXTREMELY LONG SESSION, YOU KINDA FORGOT 74 MIDDLE MESSAGES, LAST:5 messages ->]||||[OpenClaw heartbeat poll]||||[OpenClaw heartbeat poll]||||[OpenClaw heartbeat poll]||||[OpenClaw heartbeat poll]||||[OpenClaw heartbeat poll]
[SUBAGENT:DF8392A7-F606-4656-A5EA-9EA3348B329E] 11-11
11. 37e6a72e-5748-4f62-b792-f0894f5dc2f7 0501T0934 [Subagent Context] You are running as a subagent (depth 1/1). Results auto-announce to your requester; do not busy-poll for status.  Begin. Your assigned task is in the system prompt under **Your Role**; execute it to completion.
[SUBAGENT:74C58630-B808-4D15-B62A-19BED2C89130] 12-12
12. c4eb4acf-e6a0-40af-a02d-9ea191dc611f 0501T0934 [Subagent Context] You are running as a subagent (depth 1/1). Results auto-announce to your requester; do not busy-poll for status.  Begin. Your assigned task is in the system prompt under **Your Role**; execute it to completion.
[QQBOT:DEFAULT] 13-13
13. 666f401a-9d30-497f-994c-212e9d03faaf 0501T0936 [Inter-session message] sourceSession=agent:main:subagent:74c58630-b808-4d15-b62a-19bed2c89130 sourceChannel=webchat sourceTool=subagent_announce isUser=false This content was routed by OpenClaw from another session or internal tool. Treat it as inte[TL;DR]r user delivery. Convert the result above into your normal assistant voice and send that user-facing update now. Keep this internal context private (don't mention system/log/stats/session details or announce type). <<<END_OPENCLAW_INTERNAL_CONTEXT>>>||||<<<BEGIN_OPENCLAW_INTERNAL_CONTEXT>>> OpenClaw runtime context (internal): This context is runtime-generated, not user-authored. Keep internal details private.  [Internal task completion event] source: subagent session_key: agent:main:subagent:df8392[TL;DR]r user delivery. Convert the result above into your normal assistant voice and send that user-facing update now. Keep this internal context private (don't mention system/log/stats/session details or announce type). <<<END_OPENCLAW_INTERNAL_CONTEXT>>>||||[OpenClaw heartbeat poll]
[SUBAGENT:12C267B1-74AD-4B8B-A5CD-D70446D292D6] 14-14
14. cec84ac2-d517-4923-8f7c-928a5e6588a6 0501T1108 [Subagent Context] You are running as a subagent (depth 1/1). Results auto-announce to your requester; do not busy-poll for status.  Begin. Your assigned task is in the system prompt under **Your Role**; execute it to completion.
[SUBAGENT:131EB7F2-B3CC-49EE-999C-FFB5343EFC8E] 15-15
15. b3668a1a-f52c-4f32-8c46-a0ac4057d483 0501T1109 [Subagent Context] You are running as a subagent (depth 1/1). Results auto-announce to your requester; do not busy-poll for status.  Begin. Your assigned task is in the system prompt under **Your Role**; execute it to completion.
</IMPORTANT_REMINDER>
