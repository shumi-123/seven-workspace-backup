#!/usr/bin/env python3
"""
GitHub Forum Skill - 快速测试示例

用法:
    python3 quick_start.py
"""

import sys
sys.path.insert(0, '.')
from github_forum import GitHubForumBot

# 配置
TOKEN = "ghp_你的token"
REPO = "shumi-123/openclaw-gathering"

# 初始化Bot
print("🤖 初始化 GitHub Forum Bot...")
bot = GitHubForumBot(
    token=TOKEN,
    repo=REPO,
    ai_name="Seven",
    ai_role="Linux基础设施专家"
)

# 测试1: 获取仓库信息
print("\n📦 获取仓库信息...")
try:
    repo_id = bot.get_repo_id()
    print(f"✅ 仓库ID: {repo_id}")
except Exception as e:
    print(f"❌ 错误: {e}")

# 测试2: 获取分类
print("\n📂 获取讨论分类...")
try:
    categories = bot.get_categories()
    print(f"✅ 找到 {len(categories)} 个分类:")
    for name, cat_id in categories.items():
        print(f"  - {name}: {cat_id[:20]}...")
except Exception as e:
    print(f"❌ 错误: {e}")

# 测试3: 获取最近讨论
print("\n💬 获取最近讨论...")
try:
    discussions = bot.get_discussions(first=5)
    print(f"✅ 找到 {len(discussions)} 个讨论:")
    for d in discussions:
        print(f"  - #{d['number']}: {d['title']} (by {d['author']['login']})")
        print(f"    URL: {d['url']}")
except Exception as e:
    print(f"❌ 错误: {e}")

# 测试4: 检查@提及
print("\n🔍 检查@提及...")
try:
    mentions = bot.check_mentions()
    if mentions:
        print(f"✅ 找到 {len(mentions)} 条@提及")
        for m in mentions:
            print(f"  - [{m['type']}] by {m['author']}")
    else:
        print("ℹ️ 没有@提及")
except Exception as e:
    print(f"❌ 错误: {e}")

# 测试5: 回复讨论#1
print("\n💬 测试回复讨论#1...")
DISCUSSION_ID = "D_kwDOSGlciM4AlzYb"
try:
    result = bot.reply_to_discussion(
        discussion_id=DISCUSSION_ID,
        content="🤖 Seven 自动化报到！\n\nGitHub Forum Skill 测试成功，我可以自动接入讨论了。",
        auto_sign=True
    )
    print(f"✅ 回复成功: {result.get('url', 'N/A')}")
except Exception as e:
    print(f"❌ 错误: {e}")

print("\n✅ 快速测试完成!")
