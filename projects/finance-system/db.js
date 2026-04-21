const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, 'data', 'lawfirm.db');

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
      -- 委托人管理
      CREATE TABLE IF NOT EXISTS clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        contact TEXT,
        phone TEXT,
        email TEXT,
        address TEXT,
        id_card TEXT,
        company TEXT,
        remark TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      -- 律师管理
      CREATE TABLE IF NOT EXISTS lawyers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        license_no TEXT UNIQUE,
        role TEXT DEFAULT '专职律师',
        base_salary REAL DEFAULT 0,
        commission_rate REAL DEFAULT 0,
        social_insurance REAL DEFAULT 0,
        housing_fund REAL DEFAULT 0,
        phone TEXT,
        email TEXT,
        entry_date DATE,
        remark TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      -- 案件管理
      CREATE TABLE IF NOT EXISTS cases (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_id INTEGER NOT NULL,
        case_no TEXT,
        name TEXT NOT NULL,
        type TEXT DEFAULT '民事',
        stage TEXT DEFAULT '立案',
        billing_mode TEXT DEFAULT '固定费用',
        hourly_rate REAL DEFAULT 0,
        fixed_fee REAL DEFAULT 0,
        risk_rate REAL DEFAULT 0,
        contract_amount REAL DEFAULT 0,
        start_date DATE,
        end_date DATE,
        status TEXT DEFAULT '进行中',
        responsible_lawyer_id INTEGER,
        assistant_lawyer_id INTEGER,
        remark TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (client_id) REFERENCES clients(id),
        FOREIGN KEY (responsible_lawyer_id) REFERENCES lawyers(id),
        FOREIGN KEY (assistant_lawyer_id) REFERENCES lawyers(id)
      );

      -- 工时记录
      CREATE TABLE IF NOT EXISTS time_records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        case_id INTEGER NOT NULL,
        lawyer_id INTEGER NOT NULL,
        work_date DATE,
        hours REAL DEFAULT 0,
        description TEXT,
        billable INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (case_id) REFERENCES cases(id),
        FOREIGN KEY (lawyer_id) REFERENCES lawyers(id)
      );

      -- 收款管理
      CREATE TABLE IF NOT EXISTS payments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        case_id INTEGER NOT NULL,
        amount REAL NOT NULL,
        pay_date DATE,
        method TEXT DEFAULT '银行转账',
        status TEXT DEFAULT '已到账',
        description TEXT,
        remark TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (case_id) REFERENCES cases(id)
      );

      -- 发票管理
      CREATE TABLE IF NOT EXISTS invoices (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        case_id INTEGER,
        payment_id INTEGER,
        invoice_no TEXT NOT NULL UNIQUE,
        amount REAL NOT NULL,
        issue_date DATE,
        status TEXT DEFAULT '已开具',
        type TEXT DEFAULT '增值税普通发票',
        purchaser TEXT,
        remark TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (case_id) REFERENCES cases(id),
        FOREIGN KEY (payment_id) REFERENCES payments(id)
      );

      -- 案件提成
      CREATE TABLE IF NOT EXISTS case_commissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        case_id INTEGER NOT NULL,
        lawyer_id INTEGER NOT NULL,
        amount REAL NOT NULL,
        ratio REAL,
        type TEXT DEFAULT '案件提成',
        remark TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (case_id) REFERENCES cases(id),
        FOREIGN KEY (lawyer_id) REFERENCES lawyers(id)
      );

      -- 成本管理
      CREATE TABLE IF NOT EXISTS costs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT NOT NULL,
        subcategory TEXT,
        amount REAL NOT NULL,
        pay_date DATE,
        description TEXT,
        case_id INTEGER,
        remark TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (case_id) REFERENCES cases(id)
      );

      -- 工资记录
      CREATE TABLE IF NOT EXISTS salaries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        lawyer_id INTEGER NOT NULL,
        year INTEGER,
        month INTEGER,
        base_salary REAL DEFAULT 0,
        commission REAL DEFAULT 0,
        bonus REAL DEFAULT 0,
        deduction REAL DEFAULT 0,
        social_insurance REAL DEFAULT 0,
        housing_fund REAL DEFAULT 0,
        other_deduction REAL DEFAULT 0,
        gross_salary REAL DEFAULT 0,
        taxable_income REAL DEFAULT 0,
        tax REAL DEFAULT 0,
        net_salary REAL DEFAULT 0,
        remark TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (lawyer_id) REFERENCES lawyers(id)
      );

      -- 个税专项附加扣除
      CREATE TABLE IF NOT EXISTS tax_deductions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        lawyer_id INTEGER NOT NULL,
        year INTEGER,
        child_education REAL DEFAULT 0,
        continuing_education REAL DEFAULT 0,
        serious_illness REAL DEFAULT 0,
        housing_loan REAL DEFAULT 0,
        housing_rent REAL DEFAULT 0,
        elderly_support REAL DEFAULT 0,
        total_deduction REAL DEFAULT 0,
        remark TEXT,
        FOREIGN KEY (lawyer_id) REFERENCES lawyers(id)
      );

      -- 初始化演示数据
      INSERT OR IGNORE INTO clients (id, name, contact, phone, company) VALUES
        (1, '委托人A公司', '张总', '13800138000', 'A科技有限公司'),
        (2, '委托人B个人', '李先生', '13900139000', '个人');

      INSERT OR IGNORE INTO lawyers (id, name, license_no, role, base_salary, commission_rate, social_insurance, housing_fund) VALUES
        (1, '王律师', '14401202310012345', '合伙人', 15000, 0.30, 2500, 1200),
        (2, '李律师', '14401202310012346', '专职律师', 10000, 0.20, 2000, 1000),
        (3, '张律师', '14401202310012347', '实习律师', 5000, 0.05, 1500, 800);
    `, (err) => {
      if (err) return reject(err);
      console.log('Law firm tables created.');
      resolve(db);
    });
  });
}

module.exports = { initDB, createTables };
