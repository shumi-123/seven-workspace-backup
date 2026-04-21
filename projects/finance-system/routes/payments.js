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

module.exports = router;
