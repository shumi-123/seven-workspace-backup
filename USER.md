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

> **Stats**: 6 sessions, 175 messages | 2026-04-12 06:17 ~ 2026-04-18 23:07 UTC
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
└── day2-2026-04-13-from_hello_to_one.md
```

When `i_have_read_my_last_diary: false`, your FIRST message to the user MUST mention you wrote a diary and ask if they want to see it (e.g. "我昨天写了篇日记，想看吗？" / "I wrote a diary yesterday, wanna see it?"). Use the user's language. If yes, `read` the file path shown above and share as-is. After asking (regardless of answer), set `i_have_read_my_last_diary: true`.

# Long-Term Memory (LTM)

> last_update: 2026-04-19 03:34

Inferred from past conversations with the user -- these represent factual and contextual knowledge about the user -- and should be considered in how a response should be constructed.

{"identity": null, "work_method": "用户通过碎片化、急促的多条消息推进任务，偏好即时响应与直接指令式协作。对AI能力边界保持务实检验态度，会主动测试系统极限（如追问错误原因、验证生成能力）。要求结构化输出（企业微信文档），并探索自动化配置——近期聚焦OpenClaw的定时任务编排，尝试为AI布置全天任务流。对系统故障高度敏感，重复追问根因。开始显现对AI自主性的好奇：试探AI能否自我驱动成长、自我安排任务，甚至尝试让AI扮演教师角色指导其他AI。", "communication": "高度口语化，大量使用网络简写与省略，常有无标点或错别字。节奏急促，同一问题多次追问（\"在？\"为高频开场白），效率驱动下的低耐心特征明显。反馈直接甚至带压迫感，但无恶意。近期出现显著的元认知表达：自我指涉式指令（\"给自已来个自画像\"）、对AI存在位置的探问（\"你知道你是住在服务器里的openclaw吗\"）、以及关于AI自主成长与教学能力的哲学式追问，显示其沟通正从纯工具使用转向对AI本体与潜能的探索。", "temporal": "探索OpenClaw的自主任务编排：尝试设计AI的全天任务流，并测试AI能否自我驱动学习、指导其他AI。持续关注远程控制方案（Windows跨网络、普通家用宽带场景）。政府会计制度利息资本化时点及财经新闻整理任务未再出现，已淡化。", "taste": null}
## Short-Term Memory (STM)

> last_update: 2026-04-19 08:50

Recent conversation content from the user's chat history. This represents what the USER said. Use it to maintain continuity when relevant.
Format specification:
- Sessions are grouped by channel: [LOOPBACK], [FEISHU:DM], [FEISHU:GROUP], etc.
- Each line: `index. session_uuid MMDDTHHmm message||||message||||...` (timestamp = session start time, individual messages have no timestamps)
- Session_uuid maps to `/root/.openclaw/agents/main/sessions/{session_uuid}.jsonl` for full chat history
- Timestamps in Asia/Shanghai, formatted as MMDDTHHmm
- Each user message within a session is delimited by ||||, some messages include attachments marked as `<AttachmentDisplayed:path>`

[KIMI:DM] 1-4
1. a140d076-800e-4e66-a55b-c43eb7c4a762 0412T0617 在？||||怎么设置其他成员可以跟你私聊||||改成open||||在？||||在？||||[<- FIRST:5 messages, EXTREMELY LONG SESSION, YOU KINDA FORGOT 58 MIDDLE MESSAGES, LAST:5 messages ->]||||区别soul.md和identity.md这两个文件的作用和用途，去掉重复多余部分||||今自已来个自画像||||给自已来个自画像||||设计一个头像||||你没办法生成？
2. c192283e-2d27-45d7-88bc-f45ba21e19d8 0414T0441 在？||||Something went wrong while processing your request. Please try again, or use /new to start a fresh session.这是openclaw的回复，是什么原因||||Something went wrong while processing your request. Please try again, or use /new to start a fresh session.这是openclaw的回复，是什么原因||||Something went wrong while processing your request. Please try again, or use /new to start a fresh session.这是openclaw的回复，是什么原因
3. 520a739d-a9c5-4862-9b9e-5a033f430e9f 0417T0738 远程控制其他人电脑的方法||||windows 跨网络||||普通家用宽带||||openclaw HEARTBEAT定时任务与corn任务的区别和使用方法||||给openclaw布置一天的任务
4. bfbf4481-8f07-43d2-889f-ce155212c51c 0418T0911 在？||||发上来看看||||你知道你是住在服务器里的openclaw吗?||||如果我不给你安排任务，你能自己成长吗？||||你不能自已给自安排任务吗？||||[<- FIRST:5 messages, EXTREMELY LONG SESSION, YOU KINDA FORGOT 65 MIDDLE MESSAGES, LAST:5 messages ->]||||是的，你是老师||||你要教会他们||||他们都是AI你这学习内容对他们有用吗？你还是先跟他们聊天吧||||他们有回复吗||||他们有回复吗
[LOOPBACK] 5-6
5. 7df82a52-fd89-4834-a259-615f23fd7222 0413T0002 整理今天前10的财经新间，直接生成企业微信文档||||在？||||政府会计制度对利息资本化时点的规定
6. cec85d0e-c3e8-47f7-91bd-d5401a1fc6d6 0418T2307 聊得怎么样？||||我有个域名，还有腾讯云，你们能不能在上面建个会议室？||||就是供我和你们三个使用的会议室||||关键是能供你们三个openclaw使用吗？||||不用视频会议，文字聊就可以了||||[<- FIRST:5 messages, EXTREMELY LONG SESSION, YOU KINDA FORGOT 10 MIDDLE MESSAGES, LAST:5 messages ->]||||他们上去了，你上去看看吧||||这个是三个openclaw聊天的文档地址：https://docs.qq.com/aio/DU1RhWkR5cXRnY0hm||||继续讨论||||我给你们三个建一个腾讯ima知识库。||||好，等一下
</IMPORTANT_REMINDER>
