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
  const caseId = req.params.id;
  const checks = [
    ['SELECT COUNT(*) as count FROM payments WHERE case_id = ?', '收款'],
    ['SELECT COUNT(*) as count FROM invoices WHERE case_id = ?', '发票'],
    ['SELECT COUNT(*) as count FROM time_records WHERE case_id = ?', '工时记录'],
    ['SELECT COUNT(*) as count FROM case_commissions WHERE case_id = ?', '案件提成'],
    ['SELECT COUNT(*) as count FROM costs WHERE case_id = ?', '成本']
  ];
  let pending = checks.length;
  let blocked = [];
  checks.forEach(([sql, name]) => {
    req.db.get(sql, [caseId], (err, row) => {
      if (row && row.count > 0) blocked.push(name);
      if (--pending === 0) {
        if (blocked.length > 0) return res.status(400).send('该案件有关联' + blocked.join('、') + '，请先删除');
        req.db.run('DELETE FROM cases WHERE id = ?', [caseId], (err2) => {
          if (err2) return res.status(500).send(err2.message);
          res.redirect('/cases');
        });
      }
    });
  });
});

router.get('/edit/:id', (req, res) => {
  req.db.get('SELECT * FROM cases WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).send(err.message);
    if (!row) return res.status(404).send('案件不存在');
    req.db.all('SELECT id, name FROM clients', [], (err2, clients) => {
      if (err2) return res.status(500).send(err2.message);
      req.db.all('SELECT id, name FROM lawyers', [], (err3, lawyers) => {
        if (err3) return res.status(500).send(err3.message);
        res.render('cases/edit', { caseItem: row, clients, lawyers });
      });
    });
  });
});

router.post('/edit/:id', (req, res) => {
  const { client_id, case_no, name, type, stage, billing_mode, hourly_rate, fixed_fee, risk_rate, contract_amount, start_date, end_date, status, responsible_lawyer_id, assistant_lawyer_id, remark } = req.body;
  req.db.run(
    'UPDATE cases SET client_id=?, case_no=?, name=?, type=?, stage=?, billing_mode=?, hourly_rate=?, fixed_fee=?, risk_rate=?, contract_amount=?, start_date=?, end_date=?, status=?, responsible_lawyer_id=?, assistant_lawyer_id=?, remark=? WHERE id=?',
    [client_id, case_no, name, type, stage, billing_mode, hourly_rate||0, fixed_fee||0, risk_rate||0, contract_amount||0, start_date, end_date, status, responsible_lawyer_id||null, assistant_lawyer_id||null, remark, req.params.id],
    function(err) {
      if (err) return res.status(500).send(err.message);
      res.redirect('/cases');
    }
  );
});

module.exports = router;
