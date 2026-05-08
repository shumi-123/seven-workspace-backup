# 从零构建LLM项目：开源模型本地部署路线

> 2026-05-08 | 实战路线调整：先部署开源模型，再实验持续学习

---

## 一、推荐模型选型

| 模型 | 参数 | 优势 | 适用场景 | 量化后显存 |
|------|------|------|---------|-----------|
| **DeepSeek-R1-Distill-Qwen-32B** | 32B | 推理能力强（会"慢思考"），中文优秀 | 股票分析、策略推理 | ~20GB (INT4) |
| **Qwen2.5-32B-Instruct** | 32B | 中文最强开源模型，指令遵循好 | 文本分析、报告生成 | ~20GB (INT4) |
| **Llama-3.1-70B** | 70B | 英文最强，生态最大 | 代码、英文分析 | ~40GB (INT4) |
| **DeepSeek-R1-Distill-Qwen-14B** | 14B | 小尺寸可跑在消费级显卡 | 快速原型验证 | ~9GB (INT4) |
| **Qwen2.5-7B-Instruct** | 7B | 入门级，24GB显存显卡可跑全精度 | 实验调试、低延迟 | ~6GB (INT4) |

**推荐组合：**
- **主力**：DeepSeek-R1-Distill-Qwen-32B（推理能力对股票分析最关键）
- **快速原型**：Qwen2.5-7B（调试prompt、测试流程）

---

## 二、本地部署方案

### 方案A：Ollama（最简单，推荐起步）

```bash
# 安装
curl -fsSL https://ollama.com/install.sh | sh

# 拉取模型
ollama pull deepseek-r1:32b
ollama pull qwen2.5:7b

# 运行
ollama run deepseek-r1:32b

# API调用
curl http://localhost:11434/api/generate -d '{
  "model": "deepseek-r1:32b",
  "prompt": "分析今日A股行情..."
}'
```

**优势**：一键安装、自动下载、自动量化、REST API直接可用
**劣势**：推理优化不如专业框架，高并发性能一般

---

### 方案B：vLLM（生产级，推荐主力）

```bash
# 安装
pip install vllm

# 启动服务
python -m vllm.entrypoints.openai.api_server \
  --model deepseek-ai/DeepSeek-R1-Distill-Qwen-32B \
  --quantization awq \
  --max-model-len 32768

# 调用（OpenAI兼容API）
curl http://localhost:8000/v1/chat/completions -d '{
  "model": "deepseek-r1:32b",
  "messages": [{"role": "user", "content": "分析股票"}]
}'
```

**优势**：连续批处理、PagedAttention（高效KV Cache）、OpenAI兼容API
**劣势**：安装依赖多，配置稍复杂

---

### 方案C：llama.cpp（极致量化，低配硬件）

```bash
# 下载GGUF量化模型
wget https://huggingface.co/Qwen/Qwen2.5-7B-Instruct-GGUF/resolve/main/qwen2.5-7b-instruct-q4_k_m.gguf

# 运行
./llama-cli -m qwen2.5-7b-instruct-q4_k_m.gguf -cnv
```

**优势**：CPU可跑、量化方案成熟、无GPU也行
**劣势**：比GPU方案慢10-100倍

---

## 三、推荐部署栈（你的场景）

```
┌─────────────────────────────────────────┐
│           应用层（你的程序）              │
│     股票数据获取 → Prompt构建 → 调用API   │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│           API层（vLLM / Ollama）          │
│     接收请求 → 调用模型 → 返回结果        │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│           模型层（DeepSeek-R1 32B）       │
│     推理分析 → 生成股票判断               │
└─────────────────────────────────────────┘
```

---

## 四、硬件需求

| 配置 | 可跑模型 | 成本 |
|------|---------|------|
| RTX 4090 (24GB) | Qwen2.5-14B / DeepSeek-R1-14B | ~1.5万 |
| RTX 3090 ×2 (48GB) | DeepSeek-R1-32B / Qwen2.5-32B | ~2万 |
| Mac Studio M2 Ultra (192GB统一内存) | 70B+ 全精度 | ~3万 |
| 消费级CPU (32GB内存) | Qwen2.5-7B INT4 | 现有电脑 |

**最低起步**：你现在的电脑可以先跑7B模型做原型验证。

---

## 五、下一步行动计划

| 阶段 | 时间 | 动作 | 产出 |
|------|------|------|------|
| **阶段1** | 本周 | 安装Ollama，拉取Qwen2.5-7B | 本地跑通第一个股票分析prompt |
| **阶段2** | 下周 | 安装vLLM，部署DeepSeek-R1-14B | 有OpenAI兼容API可用 |
| **阶段3** | 第3周 | 构建"每日数据→自动prompt→模型输出"流水线 | 自动化日报生成 |
| **阶段4** | 第4周 | 接入RAG（向量数据库），让模型读每日新闻 | 增量知识注入 |
| **阶段5** | 第2月 | 实验持续学习（LoRA微调每日行情数据） | 模型准确率是否提升 |

---

## 六、关键资源

- **Ollama模型库**：https://ollama.com/library
- **vLLM文档**：https://docs.vllm.ai/
- **HuggingFace模型**：https://huggingface.co/deepseek-ai
- **GGUF量化模型**：https://huggingface.co/TheBloke（已停止维护，找官方GGUF）

---

> "先让开源模型跑起来，再喂它你的数据，最后让它自己进化。这是最快路径。" — Seven, 2026-05-08
