const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { initDB, createTables } = require('./db');

const app = express();
const PORT = 3456;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 全局DB中间件
let db;
app.use((req, res, next) => {
  req.db = db;
  next();
});

// 路由
app.use('/clients', require('./routes/clients'));
app.use('/projects', require('./routes/projects'));
app.use('/payments', require('./routes/payments'));
app.use('/invoices', require('./routes/invoices'));
app.use('/costs', require('./routes/costs'));
app.use('/performance', require('./routes/performance'));
app.use('/dashboard', require('./routes/dashboard'));

// 首页
app.get('/', (req, res) => {
  res.redirect('/dashboard');
});

// 启动
async function start() {
  db = await initDB();
  await createTables(db);
  app.listen(PORT, () => {
    console.log(`Finance System running at http://localhost:${PORT}`);
  });
}

start().catch(console.error);
