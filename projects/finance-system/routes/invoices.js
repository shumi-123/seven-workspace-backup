const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  req.db.all(`
    SELECT i.*, c.name as case_name
    FROM invoices i
    LEFT JOIN cases c ON i.case_id = c.id
    ORDER BY i.issue_date DESC
  `, [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    req.db.all('SELECT id, name FROM cases', [], (err2, cases) => {
      if (err2) return res.status(500).send(err2.message);
      res.render('invoices/list', { invoices: rows, cases });
    });
  });
});

router.post('/add', (req, res) => {
  const { case_id, invoice_no, amount, issue_date, status, type, purchaser, remark } = req.body;
  req.db.run(
    'INSERT INTO invoices (case_id, invoice_no, amount, issue_date, status, type, purchaser, remark) VALUES (?,?,?,?,?,?,?,?)',
    [case_id, invoice_no, amount, issue_date, status || '已开具', type || '增值税普通发票', purchaser, remark],
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
