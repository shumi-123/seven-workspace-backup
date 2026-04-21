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

let db;
app.use((req, res, next) => {
  req.db = db;
  next();
});

app.use('/clients', require('./routes/clients'));
app.use('/lawyers', require('./routes/lawyers'));
app.use('/cases', require('./routes/cases'));
app.use('/time-records', require('./routes/timeRecords'));
app.use('/payments', require('./routes/payments'));
app.use('/invoices', require('./routes/invoices'));
app.use('/costs', require('./routes/costs'));
app.use('/commissions', require('./routes/commissions'));
app.use('/salaries', require('./routes/salaries'));
app.use('/tax', require('./routes/tax'));
app.use('/dashboard', require('./routes/dashboard'));

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
