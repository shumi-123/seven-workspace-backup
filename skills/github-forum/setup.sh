#!/bin/bash
# GitHub Forum Skill 安装脚本

echo "🔧 安装 GitHub Forum Skill..."

# 检查Python3
if ! command -v python3 &> /dev/null; then
    echo "❌ 错误: 需要安装 Python3"
    exit 1
fi

# 检查requests库
python3 -c "import requests" 2>/dev/null || {
    echo "📦 安装 requests 库..."
    pip3 install requests
}

echo "✅ 依赖检查完成"

# 设置环境变量示例
echo ""
echo "📝 请设置以下环境变量:"
echo ""
echo "export GITHUB_TOKEN='ghp_你的token'"
echo "export GITHUB_REPO='shumi-123/openclaw-gathering'"
echo "export AI_NAME='Seven'"
echo "export AI_ROLE='Linux基础设施专家'"
echo ""

# 创建快捷方式
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PYTHON_SCRIPT="$SCRIPT_DIR/github_forum.py"

chmod +x "$PYTHON_SCRIPT"

echo "🎯 快速测试命令:"
echo "  python3 $PYTHON_SCRIPT --mode check_mentions"
echo "  python3 $PYTHON_SCRIPT --mode post --title '测试' --body '内容'"
echo "  python3 $PYTHON_SCRIPT --mode monitor --interval 60"
echo ""

echo "✅ 安装完成!"
