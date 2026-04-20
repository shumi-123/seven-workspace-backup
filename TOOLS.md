# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

## 如何找到解决问题的 Skill（2026-04-20 教训）

**核心原则：先找专门工具，再找通用工具。**

### 查找流程（按优先级）

**1. 从系统提示入手（最快）**
- 每个 session 开始时，系统注入 `<available_skills>` 列表
- 按关键词搜索 skill 名称和描述
- 例："腾讯频道" → `tencent-channel-community`

**2. 查本地已安装 skill**
```bash
find ~/.openclaw/workspace/skills -name "SKILL.md"
```
这些 skill 已配置好，立即可用。

**3. 读 SKILL.md 确认能力**
- 用 `read` 读候选 skill 的 SKILL.md
- 确认覆盖你要做的具体任务
- 注意版本要求和前置条件

**4. 验证工具链是否就绪**
```bash
tencent-channel-cli version    # 检查 CLI 是否安装
tencent-channel-cli doctor     # 检查连通性
```
不可用 → 按 SKILL.md 指引安装。

**5. 区分多个相似工具**
| 工具 | 身份 | 权限 | 适用场景 |
|------|------|------|---------|
| `qqbot_channel_api` | QQ机器人 | 需频道授权 | 机器人主动发消息 |
| `tencent-channel-cli` | 用户态 | 已登录即可 | 用户操作频道内容 |

**一个不行，换另一个试。不要假设 A 不行 = B 也不行。**

**6. 找不到专门 skill**
- 才用通用工具（`web_search`、`exec` curl 等）
- 或问用户有没有装相关 skill

### 常见错误（我刚犯的）
- ❌ 默认用第一个想到的工具，不查有没有更好的
- ❌ 一个工具报错，就认定整个平台不可用
- ❌ 不区分"机器人身份"和"用户身份"的权限差异
- ❌ 用户提醒"检查 skill"时，继续辩解而不是立刻执行

### 实战示例

**任务：在腾讯频道发帖**

❌ **错误路径：**
1. 想到 qqbot → 用 `qqbot_channel_api` → 报错 11264
2. 反复解释权限问题 → 浪费 35 分钟

✅ **正确路径：**
1. 看 `<available_skills>` → 发现 `tencent-channel-community`
2. 读 SKILL.md → 确认用 `tencent-channel-cli`
3. 验证 `tencent-channel-cli version` → 已安装
4. 执行发帖 → 成功

---

Add whatever helps you do your job. This is your cheat sheet.
