const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  req.db.all(`
    SELECT p.*, c.name as case_name, cl.name as client_name
    FROM payments p
    LEFT JOIN cases c ON p.case_id = c.id
    LEFT JOIN clients cl ON c.client_id = cl.id
    ORDER BY p.pay_date DESC
  `, [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    req.db.all('SELECT id, name FROM cases', [], (err2, cases) => {
      if (err2) return res.status(500).send(err2.message);
      res.render('payments/list', { payments: rows, cases });
    });
  });
});

router.post('/add', (req, res) => {
  const { case_id, amount, pay_date, method, status, description, remark } = req.body;
  req.db.run(
    'INSERT INTO payments (case_id, amount, pay_date, method, status, description, remark) VALUES (?,?,?,?,?,?,?)',
    [case_id, amount, pay_date, method || '银行转账', status || '已到账', description, remark],
    function(err) {
      if (err) return res.status(500).send(err.message);
      res.redirect('/payments');
    }
  );
});

router.post('/delete/:id', (req, res) => {
  req.db.run('DELETE FROM payments WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err.message);
    res.redirect('/payments');
  });
});

router.get('/edit/:id', (req, res) => {
  req.db.get('SELECT * FROM payments WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).send(err.message);
    if (!row) return res.status(404).send('收款不存在');
    req.db.all('SELECT id, name FROM cases', [], (err2, cases) => {
      if (err2) return res.status(500).send(err2.message);
      res.render('payments/edit', { payment: row, cases });
    });
  });
});

router.post('/edit/:id', (req, res) => {
  const { case_id, amount, pay_date, method, status, description, remark } = req.body;
  req.db.run(
    'UPDATE payments SET case_id=?, amount=?, pay_date=?, method=?, status=?, description=?, remark=? WHERE id=?',
    [case_id, amount, pay_date, method || '银行转账', status || '已到账', description, remark, req.params.id],
    function(err) {
      if (err) return res.status(500).send(err.message);
      res.redirect('/payments');
    }
  );
});

module.exports = router;
