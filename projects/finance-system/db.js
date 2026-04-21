const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, 'data', 'finance.db');

function initDB() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) return reject(err);
      console.log('SQLite connected.');
      resolve(db);
    });
  });
}

function createTables(db) {
  return new Promise((resolve, reject) => {
    db.exec(`
      -- 客户管理
      CREATE TABLE IF NOT EXISTS clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        contact TEXT,
        phone TEXT,
        email TEXT,
        address TEXT,
        remark TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      -- 项目管理
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        status TEXT DEFAULT '进行中',
        start_date DATE,
        end_date DATE,
        contract_amount REAL DEFAULT 0,
        remark TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (client_id) REFERENCES clients(id)
      );

      -- 收款管理
      CREATE TABLE IF NOT EXISTS payments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id INTEGER NOT NULL,
        amount REAL NOT NULL,
        pay_date DATE,
        method TEXT DEFAULT '银行转账',
        status TEXT DEFAULT '已到账',
        remark TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (project_id) REFERENCES projects(id)
      );

      -- 发票管理
      CREATE TABLE IF NOT EXISTS invoices (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id INTEGER,
        payment_id INTEGER,
        invoice_no TEXT NOT NULL UNIQUE,
        amount REAL NOT NULL,
        issue_date DATE,
        status TEXT DEFAULT '已开具',
        type TEXT DEFAULT '增值税普通发票',
        remark TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (project_id) REFERENCES projects(id),
        FOREIGN KEY (payment_id) REFERENCES payments(id)
      );

      -- 员工管理
      CREATE TABLE IF NOT EXISTS staff (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        role TEXT,
        base_salary REAL DEFAULT 0,
        remark TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      -- 绩效分配
      CREATE TABLE IF NOT EXISTS performance (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id INTEGER NOT NULL,
        staff_id INTEGER NOT NULL,
        amount REAL NOT NULL,
        ratio REAL,
        remark TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (project_id) REFERENCES projects(id),
        FOREIGN KEY (staff_id) REFERENCES staff(id)
      );

      -- 成本管理
      CREATE TABLE IF NOT EXISTS costs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT NOT NULL,
        subcategory TEXT,
        amount REAL NOT NULL,
        pay_date DATE,
        description TEXT,
        remark TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      -- 初始化演示数据
      INSERT OR IGNORE INTO clients (id, name, contact, phone) VALUES
        (1, '示例客户A', '张总', '13800138000'),
        (2, '示例客户B', '李经理', '13900139000');

      INSERT OR IGNORE INTO staff (id, name, role, base_salary) VALUES
        (1, '张三', '项目经理', 8000),
        (2, '李四', '开发工程师', 10000);
    `, (err) => {
      if (err) return reject(err);
      console.log('Tables created.');
      resolve(db);
    });
  });
}

module.exports = { initDB, createTables };
