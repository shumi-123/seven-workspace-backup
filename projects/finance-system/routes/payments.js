const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  req.db.all(`
    SELECT py.*, p.name as project_name, c.name as client_name
    FROM payments py
    LEFT JOIN projects p ON py.project_id = p.id
    LEFT JOIN clients c ON p.client_id = c.id
    ORDER BY py.pay_date DESC
  `, [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    req.db.all('SELECT id, name FROM projects', [], (err2, projects) => {
      if (err2) return res.status(500).send(err2.message);
      res.render('payments/list', { payments: rows, projects });
    });
  });
});

router.post('/add', (req, res) => {
  const { project_id, amount, pay_date, method, status, remark } = req.body;
  req.db.run(
    'INSERT INTO payments (project_id, amount, pay_date, method, status, remark) VALUES (?,?,?,?,?,?)',
    [project_id, amount, pay_date, method || '银行转账', status || '已到账', remark],
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
