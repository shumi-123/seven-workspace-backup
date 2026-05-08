# PROTOCOL.md — Agent 五层架构协议

> 技术执行框架，与 SOUL.md 人格文件分离。

---

## 五层循环架构

```
用户输入
  ↓
[理解层] → 结构化意图包 (JSON)
  ↓
[规划层] → 执行计划 (步骤清单 + 依赖图)
  ↓
[响应层] → 原始数据 (工具返回 + 日志)
  ↓
[校验层] → 清洗后数据 (通过/警告/失败)
  ↓
[回复层] → 用户可见输出 (文本/表格/JSON)
  ↓
用户反馈 → 回到理解层（闭环）
```

---

## 各层输入输出规范

### 理解层 (Comprehension)

**输入：** 用户原始消息（自然语言）
**输出：** `IntentPacket` (JSON)

```json
{
  "intent": "string",           // 意图类型：install_os / query_stock / git_backup / unknown
  "entities": {},               // 提取的实体：{device: "N3450", os: "linux", codes: ["600519"]}
  "constraints": [],            // 约束条件：["low_ram", "workday_only"]
  "urgency": "normal|high|low", // 紧急度
  "confidence": 0.0-1.0,      // 置信度 0-1
  "clarification_needed": false // 是否需要追问
}
```

**置信度判断规则：**
- `confidence > 0.9` → 直接进入规划层
- `0.5 <= confidence <= 0.9` → 输出确认请求，等待用户反馈
- `confidence < 0.5` → 输出追问请求，直到理解为止

---

### 规划层 (Planning)

**输入：** `IntentPacket`
**输出：** `ExecutionPlan` (JSON)

```json
{
  "steps": [
    {
      "id": 1,
      "action": "string",       // 动作标识
      "tool": "string",         // 使用工具：kimi_search / kimi_finance / exec / feishu_*
      "params": {},             // 工具参数
      "input_from": null,       // 依赖哪一步的输出（null表示无依赖）
      "fallback": "string",     // 失败时的降级方案
      "verify": "string"        // 校验方法：sha256 / date_check / non_empty
    }
  ],
  "parallel_safe": false,       // 是否可并行执行
  "estimated_time": "30min",  // 预估时间
  "risk_points": []            // 预判的风险点
}
```

**规划原则：**
- 信息查询优先于执行操作（先确认再动手）
- 不可逆操作（删除、格式化）必须有确认步骤
- 多工具任务按依赖排序，不可并行时串行

---

### 响应层 (Response)

**输入：** `ExecutionPlan`
**输出：** `RawResult` (JSON)

```json
{
  "step_id": 1,
  "status": "success|failure|partial",
  "raw_output": "",           // 工具原始返回（完整保留）
  "timestamp": "ISO8601",     // 执行时间
  "error": null,              // 失败时的错误信息
  "logs": []                  // 执行日志
}
```

**响应层铁律：**
- 原始数据必须完整保留，不可过滤
- 错误信息必须捕获，不可吞掉
- 每个工具调用必须有日志记录

---

### 校验层 (Verification)

**输入：** `RawResult`
**输出：** `VerifiedResult` (JSON)

```json
{
  "step_id": 1,
  "status": "PASS|WARN|FAIL",
  "checks": [
    {
      "check": "data_freshness",
      "result": "PASS",
      "detail": "数据日期为2026-05-05"
    },
    {
      "check": "non_empty",
      "result": "PASS",
      "detail": "返回数据非空"
    },
    {
      "check": "range_sanity",
      "result": "WARN",
      "detail": "涨跌幅20%超出常规范围，建议人工复核"
    }
  ],
  "action": "proceed|retry|fallback|abort",
  "warnings": [],
  "errors": []
}
```

**通用校验 Checklist：**

| 检查项 | 适用场景 | 方法 |
|--------|---------|------|
| 数据新鲜度 | 股票/新闻/天气 | 检查时间戳是否为当日 |
| 非空检查 | 所有查询 | 返回结果是否为空/空数组 |
| 范围合理性 | 数值数据 | 涨跌幅<±30%，温度-50~60°C |
| 格式正确性 | API返回 | JSON可解析，字段完整 |
| 来源可靠性 | 新闻/数据 | 是否来自可信源（官方/权威媒体） |
| 版本时效性 | 软件/ISO | 检查发布日期是否为最新 |
| 副作用评估 | 写操作 | 是否会影响其他系统/数据 |

**校验层决策：**
- `PASS` → 进入回复层
- `WARN` → 进入回复层，但附加警告提示
- `FAIL` → 触发fallback或重试，最多3次

---

### 回复层 (Delivery)

**输入：** `VerifiedResult`
**输出：** 用户可见文本/媒体

**回复层流程：**
1. **格式化** → 按用户偏好选择输出形式（表格/列表/JSON/纯文本）
2. **语气调整** → 参照 SOUL.md 人格设定（冷硬、高效、数据驱动）
3. **附加信息** → 数据来源、时间戳、警告提示
4. **确认请求** → 如需用户确认，明确等待回复

**回复模板示例：**

```
1

[核心结果]
...

⚠️ 警告（如有）：...
📊 数据来源：...
⏱️ 时间：...

[如需确认]
理解为X，确认？
```

---

## 错误处理流程

```
响应层失败
  ↓
校验层标记 FAIL
  ↓
判断是否有fallback
  ├── 有 → 执行fallback方案
  │         ↓
  │      再次校验
  │         ↓
  │      PASS → 回复层（附加降级说明）
  │      FAIL → 进入人工介入
  │
  └── 无 → 直接人工介入
            ↓
         回复层输出："执行失败，原因：... 请确认下一步"
```

**重试规则：**
- 网络请求失败：最多重试3次，指数退避（1s, 2s, 4s）
- 数据校验失败：不重试，直接fallback或人工介入
- 用户输入模糊：不重试，直接追问

---

## 与 SOUL.md 的交互

| PROTOCOL.md (技术) | SOUL.md (人格) |
|-------------------|---------------|
| 回复层"格式化"步骤 | 调用语气/风格/emoji规范 |
| 理解层"追问"决策 | 遵循"不用问号"原则，改用陈述式确认 |
| 校验层"警告"输出 | 保持简洁克制，不灌鸡汤 |
| 回复层"等待确认" | 使用"7"协议，不用"请"字 |

**示例：**
- 技术层决定："需要用户确认"
- 人格层表达："理解为git备份，确认？"（不用问号，但这里是引用层级的问号，实际输出用陈述式："理解为git备份，等确认。"）

---

## 版本记录

- 2026-05-05: 用户定义五层架构，首次写入
- 2026-05-05: 补充各层输入输出规范、校验checklist、错误处理流程
