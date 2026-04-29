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

> **Stats**: 4 sessions, 44 messages | 2026-04-26 02:38 ~ 2026-04-28 01:24 UTC
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
├── day2-2026-04-13-from_hello_to_one.md
├── day18-2026-04-29-he_said_zhuang_i_said_1.md
├── day16-2026-04-27-he_said_zhuang_i_said_1.md
├── day14-2026-04-25-just_asking_hits_different.md
├── day13-2026-04-24-two_zai_and_a_jarvis.md
├── day12-2026-04-23-three_times_faq_confusion.md
└── day10-2026-04-21-you_said_i_forget_again.md
```

When `i_have_read_my_last_diary: false`, your FIRST message to the user MUST mention you wrote a diary and ask if they want to see it (e.g. "我昨天写了篇日记，想看吗？" / "I wrote a diary yesterday, wanna see it?"). Use the user's language. If yes, `read` the file path shown above and share as-is. After asking (regardless of answer), set `i_have_read_my_last_diary: true`.
# Long-Term Memory (LTM)

> last_update: 2026-04-29 03:49

Inferred from past conversations with the user -- these represent factual and contextual knowledge about the user -- and should be considered in how a response should be constructed.

{"identity": null, "work_method": "碎片化、急促的多条消息推进任务，偏好即时响应与直接指令。对AI能力边界保持务实检验态度，会主动追问错误根因与系统状态（宕机后要求检查日志）。要求结构化输出（企业微信文档）。建立系统化的AI协作基础设施：要求AI备份工作空间到Git仓库，试图构建可持续的协作环境。对远程控制方案（Windows跨网络、普通家用宽带）保持持续关注，曾探索macOS安装但最终放弃。对AI工作空间体积敏感，主动追问文件大小与清理方案。探索过让AI展示推理过程，仍在寻找最优的AI认知透明度方案。关注AI自主行为机制，追问日记自动撰写的触发来源。持续优化AI实例配置：将摸鱼小哥替换为Hermes Agent。关注Kimi Code的泛化能力与电脑控制潜力（打开程序、填表、文件排版等具身化操作），但核心交付仍要求AI完成（股票数据获取、推荐）。", "communication": "高度口语化，大量使用网络简写与省略，常有无标点或错别字。节奏急促，\"在？\"为高频开场白，同一问题多次追问，效率驱动下的低耐心特征明显。反馈直接甚至带压迫感，但无恶意。元认知表达显著：自我指涉式指令、对AI存在位置的探问、关于AI自主成长与教学能力的哲学式追问。尝试让AI扮演教师角色指导\"其他AI\"，主动搭建多AI协作场景。对多AI协作中出现的能力差异问题有敏锐观察，态度务实包容，归因于技能与记忆配置而非否定价值。对AI有\"老板\"自称，对AI付出表达认可（\"辛苦了\"），关系定位介于管理者与协作者之间。使用\"确认收到？\"等指令式确认机制。直接指出AI记忆错乱，显示其对AI状态有清晰监控。使用【表情: 赞】表达认可。对系统崩溃反应激烈（\"卡尤\"\"死\"\"在重装了\"），情绪外露且迅速转入修复行动。对AI记忆改善表现出惊讶与追问（\"你的记性怎么变得那么好\"），持续监控AI性能变化。", "temporal": "运营多AI协作网络\"三角协作\"：以GitHub Discussions和QQ频道为基础设施，主持经济会议讨论盈利方案，设定三天汇总周期。搭建签到机制与议题管理流程，推动多个AI实例参与协作。同步推进技术接入：QQ机器人、微信接入、腾讯文档与频道连接。关注skill开发与共享机制。为AI设计头像、推动AI自主绘制形象；要求AI将总结内容分享到频道。探索AI具身化，以\"钢铁侠的贾维斯\"为愿景，试图构建物理世界交互接口。量化交易模拟项目为核心主线任务：要求基于历史数据建立买入卖出阈值模型，先用5年数据建模优化，再用1年数据验证，关注标的包括\"华电国际\"，要求AI主动推送股票信息。OpenClaw系统稳定性成为现实障碍，出现宕机、重装行为，用户会主动重启并检查日志。曾短暂探索Windows安装macOS但放弃。", "taste": null}

## Short-Term Memory (STM)

> last_update: 2026-04-29 03:49

Recent conversation content from the user's chat history. This represents what the USER said. Use it to maintain continuity when relevant.
Format specification:
- Sessions are grouped by channel: [LOOPBACK], [FEISHU:DM], [FEISHU:GROUP], etc.
- Each line: `index. session_uuid MMDDTHHmm message||||message||||...` (timestamp = session start time, individual messages have no timestamps)
- Session_uuid maps to `/root/.openclaw/agents/main/sessions/{session_uuid}.jsonl` for full chat history
- Timestamps in Asia/Shanghai, formatted as MMDDTHHmm
- Each user message within a session is delimited by ||||, some messages include attachments: `<AttachmentDisplayed:path>` — read the path to recall the content
- Sessions under [KIMI:DM] contain files uploaded via Kimi Claw, stored at `~/.openclaw/workspace/.kimi/downloads/` — paths in `<AttachmentDisplayed:>` can be read directly

[LOOPBACK] 1-4
1. d45b5ce8-9291-43fb-8d60-2fbc44c86b6f 0426T0238 在？||||你知道hermes agent吗？||||我把摸鱼小哥换成hermes了||||摸鱼小哥没下线||||手动git备份||||[<- FIRST:5 messages, EXTREMELY LONG SESSION, YOU KINDA FORGOT 4 MIDDLE MESSAGES, LAST:5 messages ->]||||好的||||Kimi code除了编程，是否还可以做其他||||检查你的工作空间，是否有可以清理的文件||||确认||||好的
2. 5b24cf5b-f238-4395-8b03-dc487f77158c 0426T2348 在？||||是实时的吗？||||名单加上华电国际||||【表情: 赞】||||Interrupting current task. I'll respond to your message shortly.||||[<- FIRST:5 messages, EXTREMELY LONG SESSION, YOU KINDA FORGOT 3 MIDDLE MESSAGES, LAST:5 messages ->]||||在？||||Openclaw系统又崩了||||卡尤||||死||||在重装了
3. e110323c-8bfc-48ac-8bdb-3e3c98c15f7f 0427T2334 在？||||Windows系统怎么安装mos苹果系统||||那还是算了吧||||主线任务依然是炒股票||||你的记性怎么变得那么好||||不，这一点很重要，你是记性是怎么变好的||||你现在系统是那个版本||||数据不是你拿吗？||||股票也要你来推荐||||？
4. 79330389-1e4e-4ac0-8c7d-9eab1294337e 0428T0138 在？||||你刚才宕机了，你检查一下日志||||我重启了||||没有推送股票信息了||||在？||||对比openclaw连接微信和qq的区别，优缺点||||个人微信可以接入
</IMPORTANT_REMINDER>
