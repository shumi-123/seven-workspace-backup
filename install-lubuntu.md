# Lubuntu 22.04 LTS 安装指南（Intel N3450 + 4GB）

## 1. 准备U盘
- ISO下载：https://lubuntu.me/downloads/ → 选 22.04 LTS (64-bit)
- U盘烧录：Windows用 [Rufus](https://rufus.ie/) 或 [balenaEtcher](https://www.balena.io/etcher/)
- U盘容量 ≥ 4GB

## 2. 安装过程关键选择
- **语言：** 中文
- **安装类型：** 清除整个磁盘并安装（旧电脑无重要数据）
- **时区：** Shanghai
- **用户名/密码：** 设好，密码后续SSH要用
- **⚠️ 重要：** 勾选"最小安装"（Minimal Installation）—— 不装LibreOffice、游戏、媒体播放器

## 3. 安装后必做（终端执行）

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装SSH（让我能远程连）
sudo apt install -y openssh-server
sudo systemctl enable ssh

# 看IP地址
ip addr | grep "inet 192" | head -1
# 记下这个IP，告诉我
```

## 4. 防火墙（如果开了ufw）
```bash
sudo ufw allow ssh
sudo ufw enable
```

## 5. 4GB内存优化
- **别装Chrome** —— 用Firefox ESR（更省内存）
- **关闭视觉效果：** 菜单 → 偏好设置 → LXQt设置 → 会话设置 → 去掉 compositor
- **开机不启动的应用全关掉**

## 6. 给我用的额外包（装完Lubuntu后）
```bash
sudo apt install -y git curl docker.io
sudo usermod -aG docker $USER
```

## 后续
装完告诉我IP地址，我远程SSH上去部署OpenClaw。

---
预计耗时：下载15分钟 + U盘烧录5分钟 + 安装20分钟 = 40分钟搞定。
