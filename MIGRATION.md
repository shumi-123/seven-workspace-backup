# MIGRATION.md — 本地迁移准备清单

**目标：** 把当前 OpenClaw 实例完整迁移到用户本地电脑

---

## ✅ 已备份（GitHub远程）

- **Workspace**: `github.com/shumi-123/seven-workspace-backup.git`
- **最新提交**: b04d707 (2026-04-29 21:04)
- **大小**: 6.4M
- **包含**: AGENTS.md, SOUL.md, USER.md, TOOLS.md, paper_trading/, skills/, memory/, scripts/, platform/, watchlist.json

---

## 📦 需要额外迁移的文件（非Git tracked）

| 路径 | 大小 | 重要性 | 说明 |
|---|---|---|---|
| `~/.openclaw/openclaw.json` | 11KB | **核心** | 主配置：模型、渠道、插件加载、身份绑定 |
| `~/.openclaw/cron.json` | 187B | **核心** | 定时任务配置（股票监控 cron jobs） |
| `~/.openclaw/cron/` | — | **核心** | cron任务定义文件 |
| `~/.openclaw/credentials/` | — | **高** | OAuth token（飞书、QQ、微信等授权凭据） |
| `~/.openclaw/extensions/` | — | **高** | 插件目录（QQ Bot、飞书、微信、微博、企业微信） |
| `~/.openclaw/qqbot/` | — | **高** | QQ Bot专属配置 |
| `~/.openclaw/identity/` | — | **中** | 身份标识文件 |
| `~/.openclaw/agents/` | 5.9M | **低** | Session历史记录（可选，会重新生成） |
| `~/.openclaw/skills/` | — | **中** | 用户安装skills（部分已在workspace/skills/） |
| `~/.openclaw/openclaw-weixin/` | — | **中** | 微信接入配置 |

---

## 🔴 敏感信息警告

**credentials/ 目录包含明文Token**：
- 飞书 OAuth token
- QQ Bot token
- 微信接入token
- GitHub personal access token（在git remote URL中）

**迁移到本地后必须重新授权**，旧token在更换环境后会失效。建议：
1. 重新走一次各平台的OAuth授权流程
2. 或者把 credentials/ 目录一起复制（有风险但方便）

---

## 🛠️ 迁移步骤

### 方案A：最小迁移（推荐）
1. 本地安装 OpenClaw
2. `git clone https://github.com/shumi-123/seven-workspace-backup.git ~/.openclaw/workspace`
3. 复制 `openclaw.json` + `cron.json` + `cron/` 到本地 `~/.openclaw/`
4. 重新安装插件：`openclaw plugin install` 或从 extensions/ 目录复制
5. 重新授权各平台（飞书/QQ/微信）
6. 验证 cron jobs 正常触发

### 方案B：完整迁移（包含历史）
1. 把整个 `~/.openclaw/` 目录打包 tar.gz
2. 传输到本地解压
3. 重新授权（token环境绑定）
4. 启动 OpenClaw

---

## 📊 当前打包大小估算

- Workspace: 6.4M
- Agents sessions: 5.9M
- Extensions + skills: ~10M
- 其他配置: ~1M
- **总计**: ~25M

---

## ⏱️ 待办

- [ ] 用户确认迁移方案（A最小 / B完整）
- [ ] 打包非Git文件
- [ ] 本地OpenClaw安装确认
- [ ] 迁移后功能验证清单

**最后更新**: 2026-04-29 21:08
