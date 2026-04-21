const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  req.db.all(`
    SELECT c.*, cl.name as client_name, l1.name as responsible_lawyer, l2.name as assistant_lawyer
    FROM cases c
    LEFT JOIN clients cl ON c.client_id = cl.id
    LEFT JOIN lawyers l1 ON c.responsible_lawyer_id = l1.id
    LEFT JOIN lawyers l2 ON c.assistant_lawyer_id = l2.id
    ORDER BY c.created_at DESC
  `, [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    req.db.all('SELECT id, name FROM clients', [], (err2, clients) => {
      if (err2) return res.status(500).send(err2.message);
      req.db.all('SELECT id, name FROM lawyers', [], (err3, lawyers) => {
        if (err3) return res.status(500).send(err3.message);
        res.render('cases/list', { cases: rows, clients, lawyers });
      });
    });
  });
});

router.post('/add', (req, res) => {
  const { client_id, case_no, name, type, stage, billing_mode, hourly_rate, fixed_fee, risk_rate, contract_amount, start_date, end_date, status, responsible_lawyer_id, assistant_lawyer_id, remark } = req.body;
  req.db.run(
    'INSERT INTO cases (client_id, case_no, name, type, stage, billing_mode, hourly_rate, fixed_fee, risk_rate, contract_amount, start_date, end_date, status, responsible_lawyer_id, assistant_lawyer_id, remark) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    [client_id, case_no, name, type || '民事', stage || '立案', billing_mode || '固定费用', hourly_rate || 0, fixed_fee || 0, risk_rate || 0, contract_amount || 0, start_date, end_date, status || '进行中', responsible_lawyer_id || null, assistant_lawyer_id || null, remark],
    function(err) {
      if (err) return res.status(500).send(err.message);
      res.redirect('/cases');
    }
  );
});

router.post('/delete/:id', (req, res) => {
  req.db.run('DELETE FROM cases WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err.message);
    res.redirect('/cases');
  });
});

module.exports = router;
