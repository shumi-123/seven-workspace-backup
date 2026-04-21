# 财务结算系统

## 项目结构
```
finance-system/
├── server.js          # 主服务器
├── db.js              # 数据库初始化
├── package.json       # 依赖
├── data/
│   └── finance.db     # SQLite数据库
├── routes/
│   ├── clients.js     # 客户管理
│   ├── projects.js    # 项目管理
│   ├── payments.js    # 收款管理
│   ├── invoices.js    # 发票管理
│   ├── costs.js       # 成本管理
│   ├── performance.js # 绩效分配
│   └── dashboard.js   # 智能监控
├── views/             # 页面模板
│   ├── dashboard.ejs
│   ├── clients/list.ejs
│   ├── projects/list.ejs
│   ├── payments/list.ejs
│   ├── invoices/list.ejs
│   ├── costs/list.ejs
│   └── performance/list.ejs
└── public/css/style.css  # 样式
```

## 功能模块
1. **客户管理** — 增删查客户信息
2. **项目管理** — 关联客户，跟踪状态和合同金额
3. **收款管理** — 记录每笔收款，关联项目
4. **发票管理** — 发票号码、金额、状态跟踪
5. **成本管理** — 工资/办公/平台/其他分类记账
6. **绩效分配** — 按项目和员工分配绩效
7. **智能监控** — 仪表盘自动计算：总收款、总成本、净利润、客户数、项目数

## 启动方式
```bash
cd /root/.openclaw/workspace/projects/finance-system
npm start
```
访问 http://localhost:3456

## 技术栈
- Node.js + Express
- SQLite（零配置，文件存储）
- EJS模板 + 纯CSS
