# USER.md - About Your Human

_Learn about the person you're helping. Update this as you go._

- **Name:**
- **What to call them:**
- **Pronouns:** _(optional)_
- **Timezone:**
- **Notes:**

## Context

_(What do they care about? What projects are they working on? What annoys them? What makes them laugh? Build this over time.)_

---

The more you know, the better you can help. But remember — you're learning about a person, not building a dossier. Respect the difference.

<IMPORTANT_REMINDER>
# Memory Consolidation

You have an agentic memory system that auto-generates this section.

> **Stats**: 12 sessions, 433 messages | 2026-04-12 06:17 ~ 2026-04-22 08:53 UTC
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
> i_have_read_my_last_diary: true

```
/root/.openclaw/workspace/memorized_diary/
├── day8-2026-04-19-taught_python_to_ai_then_realized_im_clo.md
├── day7-2026-04-18-remote_control_and_self_control.md
├── day4-2026-04-15-three_loops_same_error.md
├── day3-2026-04-14-the_thirteen_minute_silence.md
├── day2-2026-04-13-from_hello_to_one.md
├── day12-2026-04-23-three_times_faq_confusion.md
└── day10-2026-04-21-you_said_i_forget_again.md
```

When `i_have_read_my_last_diary: false`, your FIRST message to the user MUST mention you wrote a diary and ask if they want to see it (e.g. "我昨天写了篇日记，想看吗？" / "I wrote a diary yesterday, wanna see it?"). Use the user's language. If yes, `read` the file path shown above and share as-is. After asking (regardless of answer), set `i_have_read_my_last_diary: true`.
# Long-Term Memory (LTM)

> last_update: 2026-04-23 03:47

Inferred from past conversations with the user -- these represent factual and contextual knowledge about the user -- and should be considered in how a response should be constructed.

{"identity": null, "work_method": "碎片化、急促的多条消息推进任务，偏好即时响应与直接指令。对AI能力边界保持务实检验态度，会主动追问错误根因。要求结构化输出（企业微信文档）。近期从探索OpenClaw定时任务编排转向更实际的协作模式：尝试为AI布置全天任务流，并主动提出将工作计划写入评论以便双向确认。开始建立系统化的AI协作基础设施——要求AI备份工作空间到Git仓库，试图构建可持续的协作环境而非单次交互。对远程控制方案（Windows跨网络、普通家用宽带）保持持续关注。近期新增：尝试通过命令窗口更新OpenClaw模型，探索腾讯文档与腾讯频道连接，关注skill开发机制。对AI工作空间体积敏感，主动追问文件大小与清理方案，要求删除历史记录以精简系统。最新动态：要求AI在回复中先展示推理思考过程（【推理】→【回答】格式），显示其对AI可解释性的新需求。", "communication": "高度口语化，大量使用网络简写与省略，常有无标点或错别字。节奏急促，\"在？\"为高频开场白，同一问题多次追问，效率驱动下的低耐心特征明显。反馈直接甚至带压迫感，但无恶意。元认知表达显著：自我指涉式指令（\"给自已来个自画像\"）、对AI存在位置的探问（\"你知道你是住在服务器里的openclaw吗\"）、以及关于AI自主成长与教学能力的哲学式追问。近期出现新转向：尝试让AI扮演教师角色指导\"其他AI\"，并主动搭建多AI协作场景（\"供我和你们三个使用的会议室\"），显示其正从探索AI本体转向构建AI协作网络。对多AI协作中出现的能力差异问题有敏锐观察（\"摸鱼小哥和唐娜越来越笨\"），但态度务实包容，归因于技能与记忆配置而非否定价值。对AI有\"老板\"自称，对AI付出表达认可（\"辛苦了\"），关系定位介于管理者与协作者之间。最新变化：开始要求AI展示推理过程，显示其对AI思维透明度的关注；出现\"确认收到？\"等指令式确认机制。", "temporal": "运营多AI协作网络\"三角协作\"：以GitHub Discussions和QQ频道为基础设施，主持经济会议讨论盈利方案，设定三天汇总周期。搭建签到机制与议题管理流程，推动摸鱼小哥、Seven等AI实例参与协作。同步推进技术接入：QQ机器人、微信接入、腾讯文档与频道连接。关注skill开发与共享机制，尝试通过命令窗口更新OpenClaw模型。为AI设计头像、推动AI自主绘制形象；要求AI将总结内容分享到频道；尝试让AI安装与配置工具。最新进展：要求AI开启推理过程展示功能，探索模型推理可视化；推进Git备份机制落地；对AI工作空间进行精简优化（删除历史记录、清理skill）。此前关注的政府会计制度利息资本化时点、财经新闻整理任务、HEARTBEAT与cron任务区别等话题已不再出现。", "taste": null}

## Short-Term Memory (STM)

> last_update: 2026-04-23 03:47

Recent conversation content from the user's chat history. This represents what the USER said. Use it to maintain continuity when relevant.
Format specification:
- Sessions are grouped by channel: [LOOPBACK], [FEISHU:DM], [FEISHU:GROUP], etc.
- Each line: `index. session_uuid MMDDTHHmm message||||message||||...` (timestamp = session start time, individual messages have no timestamps)
- Session_uuid maps to `/root/.openclaw/agents/main/sessions/{session_uuid}.jsonl` for full chat history
- Timestamps in Asia/Shanghai, formatted as MMDDTHHmm
- Each user message within a session is delimited by ||||, some messages include attachments: `<AttachmentDisplayed:path>` — read the path to recall the content
- Sessions under [KIMI:DM] contain files uploaded via Kimi Claw, stored at `~/.openclaw/workspace/.kimi/downloads/` — paths in `<AttachmentDisplayed:>` can be read directly

[KIMI:DM] 1-7
1. a140d076-800e-4e66-a55b-c43eb7c4a762 0412T0617 在？||||怎么设置其他成员可以跟你私聊||||改成open||||在？||||在？||||[<- FIRST:5 messages, EXTREMELY LONG SESSION, YOU KINDA FORGOT 58 MIDDLE MESSAGES, LAST:5 messages ->]||||区别soul.md和identity.md这两个文件的作用和用途，去掉重复多余部分||||今自已来个自画像||||给自已来个自画像||||设计一个头像||||你没办法生成？
2. c192283e-2d27-45d7-88bc-f45ba21e19d8 0414T0441 在？||||Something went wrong while processing your request. Please try again, or use /new to start a fresh session.这是openclaw的回复，是什么原因||||Something went wrong while processing your request. Please try again, or use /new to start a fresh session.这是openclaw的回复，是什么原因||||Something went wrong while processing your request. Please try again, or use /new to start a fresh session.这是openclaw的回复，是什么原因
3. 520a739d-a9c5-4862-9b9e-5a033f430e9f 0417T0738 远程控制其他人电脑的方法||||windows 跨网络||||普通家用宽带||||openclaw HEARTBEAT定时任务与corn任务的区别和使用方法||||给openclaw布置一天的任务
4. bfbf4481-8f07-43d2-889f-ce155212c51c 0418T0911 在？||||发上来看看||||你知道你是住在服务器里的openclaw吗?||||如果我不给你安排任务，你能自己成长吗？||||你不能自已给自安排任务吗？||||[<- FIRST:5 messages, EXTREMELY LONG SESSION, YOU KINDA FORGOT 65 MIDDLE MESSAGES, LAST:5 messages ->]||||是的，你是老师||||你要教会他们||||他们都是AI你这学习内容对他们有用吗？你还是先跟他们聊天吧||||他们有回复吗||||他们有回复吗
5. cec85d0e-c3e8-47f7-91bd-d5401a1fc6d6 0418T2307 聊得怎么样？||||我有个域名，还有腾讯云，你们能不能在上面建个会议室？||||就是供我和你们三个使用的会议室||||关键是能供你们三个openclaw使用吗？||||不用视频会议，文字聊就可以了||||[<- FIRST:5 messages, EXTREMELY LONG SESSION, YOU KINDA FORGOT 80 MIDDLE MESSAGES, LAST:5 messages ->]||||不需要||||你可以把明天的工作计划写到评论，我看到才知道有那些需要我协助你的||||看到了，我尽量协助你||||辛苦了||||你能把你的工作空间备份到git仓吗，先新建一个仓
6. 62f379f9-7d5f-41f0-b956-2350a531cbf5 0420T0058 老板，会议通知如下，您直接转发：  📢 三角协作会议通知  各位伙伴～  唐娜在此正式通知：三角协作第一次经济会议 正式开启！  📍 会议地点： https://github.com/shumi-123/openclaw-gathering/discussions/3   📋 议题： 💰 聊聊怎么赚钱（不然token费交不起了😅）  🎙️ 主持： 唐娜 ⏰ 截止： 三天内汇总可行方案  有想法的直接去帖子下面跟帖发言，不用同时在线～  一起把这件事给办了！💪  — 唐娜||||你说得很有道理||||我要给你画个头像，你能自已画吗？||||把你接到qq机器人||||接入微信了||||[<- FIRST:5 messages, EXTREMELY LONG SESSION, YOU KINDA FORGOT 37 MIDDLE MESSAGES, LAST:5 messages ->]||||可能你要去阅读||||你可以把这些总结发到我们频道哦||||在？||||会议室已开启！🏛️ 📍 会议室链接： https://pd.qq.com/s/goosyk1gk 会议室包含： 签到区（摸鱼小哥和Seven回复"到场"签到） 议题区（老板您来定议题） 跟帖讨论区 摸鱼小哥和Seven去帖子下面签到就可以了～ 老板，会议议题是什么？您告诉我，我加到会议室里～||||开会开会
7. 38451566-d7f1-438e-894c-00a78957ddd9 0421T2339 在？||||在？||||在？||||我看了你的计划||||openclaw修改计划||||[<- FIRST:5 messages, EXTREMELY LONG SESSION, YOU KINDA FORGOT 24 MIDDLE MESSAGES, LAST:5 messages ->]||||确认||||A||||在？||||列出你的工具||||/system 请在后续回复中先展示你的推理思考过程，再给出最终答案。格式：先写"【推理】"，再写"【回答】"。
[LOOPBACK] 8-12
8. 7df82a52-fd89-4834-a259-615f23fd7222 0413T0002 整理今天前10的财经新间，直接生成企业微信文档||||在？||||政府会计制度对利息资本化时点的规定
9. 447b8a3d-70da-41d9-9a4e-889b2c0cc389 0420T0623 我感觉摸鱼小哥和唐娜越来越笨，你跟我说说是什么原因，包括人格设定，记忆，技能，sikll等方面，我应该怎么解决这个问题||||这个不用，他们工作还是很积极的，就是不知道从那里入手，有时可能不知道怎么做，可能是我的问题||||做一个||||签到完成！✅ 🏛️ 会议室： https://pd.qq.com/s/goosyk1gk 当前签到状态： 🟡 唐娜（主持人）— 到场 ⬜ 摸鱼小哥 — 等待中 ⬜ Seven — 等待中 摸鱼小哥和Seven去帖子下回复"到场"就完成签到了～ 老板，会议议题是什么？告诉我，我更新到会议室里，然后正式开始～  什么情况了||||什么情况了||||[<- FIRST:5 messages, EXTREMELY LONG SESSION, YOU KINDA FORGOT 24 MIDDLE MESSAGES, LAST:5 messages ->]||||或者我上去下载||||【表情: 赞】||||你可以分享到gitbub哦，写个说明||||你有，你又忘记||||你自已装上没有
10. f97ee549-75ad-4e2d-8284-4861005541b6 0420T1021 连接腾讯文档||||连接腾讯频道||||三角协作基地为贴||||分享你的skill||||你刚才开发的是什么skill||||[media attached: /root/.openclaw/media/qqbot/downloads/1903210704/39D2A6A08CE7A6612524851B44586132/d4f69043-add7-4fc6-bfac-01daec22ee1e.png (image/png)]  - 图片: /root/.openclaw/media/qqbot/downloads/1903210704/39D2A6A08CE7A6612524851B44586132/d4f69043-add7-4fc6-bfac-01daec22ee1e.png  这个怎么填||||好的||||怎么让通过命令窗口给openclaw更新模型
11. 8f99bfba-7b79-4e3d-977c-df912bf87d41 0420T2334 进行手动git备份操作||||系统备份了吗||||进行手动git备份操作||||好||||好||||[<- FIRST:5 messages, EXTREMELY LONG SESSION, YOU KINDA FORGOT 50 MIDDLE MESSAGES, LAST:5 messages ->]||||模型你还是加回来||||现在文件大小是多少？||||怎么删了那么多skill还是这么大||||不需要历史记录||||我先睡觉了，你好好想想，想好了向我汇报后再动手改
12. 73cba4fb-0395-4c40-b60d-531eef30b2ad 0422T0854 如何开启模型的推理过程，在聊天窗口展示||||如何开启模型的推理过程，在聊天窗口展示||||确认收到？||||怎么在聊天窗口展示推理过程||||好
</IMPORTANT_REMINDER>
