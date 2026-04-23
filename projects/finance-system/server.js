const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const { initDB, createTables } = require('./db');

const app = express();
const PORT = 3456;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
  secret: 'lawfirm-finance-secret-2026',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

let db;
app.use((req, res, next) => {
  req.db = db;
  next();
});

// 登录页面
app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin123') {
    req.session.user = { username };
    res.redirect('/dashboard');
  } else {
    res.render('login', { error: '账号或密码错误' });
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

// 认证中间件
function requireAuth(req, res, next) {
  if (req.session.user) return next();
  res.redirect('/login');
}

// 业务路由（需登录）
app.use('/clients', requireAuth, require('./routes/clients'));
app.use('/lawyers', requireAuth, require('./routes/lawyers'));
app.use('/cases', requireAuth, require('./routes/cases'));
app.use('/time-records', requireAuth, require('./routes/timeRecords'));
app.use('/payments', requireAuth, require('./routes/payments'));
app.use('/invoices', requireAuth, require('./routes/invoices'));
app.use('/costs', requireAuth, require('./routes/costs'));
app.use('/commissions', requireAuth, require('./routes/commissions'));
app.use('/salaries', requireAuth, require('./routes/salaries'));
app.use('/tax', requireAuth, require('./routes/tax'));
app.use('/export', requireAuth, require('./routes/export'));
app.use('/dashboard', requireAuth, require('./routes/dashboard'));

app.get('/', (req, res) => {
  res.redirect('/dashboard');
});

async function start() {
  db = await initDB();
  await createTables(db);
  app.listen(PORT, () => {
    console.log(`Law Firm Finance System running at http://localhost:${PORT}`);
  });
}

start().catch(console.error);
