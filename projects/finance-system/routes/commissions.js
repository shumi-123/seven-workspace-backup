const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  req.db.all(`
    SELECT cc.*, c.name as case_name, l.name as lawyer_name
    FROM case_commissions cc
    LEFT JOIN cases c ON cc.case_id = c.id
    LEFT JOIN lawyers l ON cc.lawyer_id = l.id
    ORDER BY cc.created_at DESC
  `, [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    req.db.all('SELECT id, name FROM cases', [], (err2, cases) => {
      if (err2) return res.status(500).send(err2.message);
      req.db.all('SELECT id, name FROM lawyers', [], (err3, lawyers) => {
        if (err3) return res.status(500).send(err3.message);
        res.render('commissions/list', { commissions: rows, cases, lawyers });
      });
    });
  });
});

router.post('/add', (req, res) => {
  const { case_id, lawyer_id, amount, ratio, type, remark } = req.body;
  req.db.run(
    'INSERT INTO case_commissions (case_id, lawyer_id, amount, ratio, type, remark) VALUES (?,?,?,?,?,?)',
    [case_id, lawyer_id, amount, ratio, type || '案件提成', remark],
    function(err) {
      if (err) return res.status(500).send(err.message);
      res.redirect('/commissions');
    }
  );
});

router.post('/delete/:id', (req, res) => {
  req.db.run('DELETE FROM case_commissions WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err.message);
    res.redirect('/commissions');
  });
});

router.get('/edit/:id', (req, res) => {
  req.db.get('SELECT * FROM case_commissions WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).send(err.message);
    if (!row) return res.status(404).send('提成不存在');
    req.db.all('SELECT id, name FROM cases', [], (err2, cases) => {
      if (err2) return res.status(500).send(err2.message);
      req.db.all('SELECT id, name FROM lawyers', [], (err3, lawyers) => {
        if (err3) return res.status(500).send(err3.message);
        res.render('commissions/edit', { commission: row, cases, lawyers });
      });
    });
  });
});

router.post('/edit/:id', (req, res) => {
  const { case_id, lawyer_id, amount, ratio, type, remark } = req.body;
  req.db.run(
    'UPDATE case_commissions SET case_id=?, lawyer_id=?, amount=?, ratio=?, type=?, remark=? WHERE id=?',
    [case_id, lawyer_id, amount, ratio || 0, type || '案件提成', remark, req.params.id],
    function(err) {
      if (err) return res.status(500).send(err.message);
      res.redirect('/commissions');
    }
  );
});

module.exports = router;
