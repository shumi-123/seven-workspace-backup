const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  req.db.all(`
    SELECT i.*, p.name as project_name
    FROM invoices i
    LEFT JOIN projects p ON i.project_id = p.id
    ORDER BY i.issue_date DESC
  `, [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    req.db.all('SELECT id, name FROM projects', [], (err2, projects) => {
      if (err2) return res.status(500).send(err2.message);
      res.render('invoices/list', { invoices: rows, projects });
    });
  });
});

router.post('/add', (req, res) => {
  const { project_id, invoice_no, amount, issue_date, status, type, remark } = req.body;
  req.db.run(
    'INSERT INTO invoices (project_id, invoice_no, amount, issue_date, status, type, remark) VALUES (?,?,?,?,?,?,?)',
    [project_id, invoice_no, amount, issue_date, status || '已开具', type || '增值税普通发票', remark],
    function(err) {
      if (err) return res.status(500).send(err.message);
      res.redirect('/invoices');
    }
  );
});

router.post('/delete/:id', (req, res) => {
  req.db.run('DELETE FROM invoices WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err.message);
    res.redirect('/invoices');
  });
});

module.exports = router;
