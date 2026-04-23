const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  req.db.all(`
    SELECT co.*, c.name as case_name
    FROM costs co
    LEFT JOIN cases c ON co.case_id = c.id
    ORDER BY co.pay_date DESC
  `, [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    req.db.all('SELECT id, name FROM cases', [], (err2, cases) => {
      if (err2) return res.status(500).send(err2.message);
      res.render('costs/list', { costs: rows, cases });
    });
  });
});

router.post('/add', (req, res) => {
  const { category, subcategory, amount, pay_date, description, case_id, remark } = req.body;
  req.db.run(
    'INSERT INTO costs (category, subcategory, amount, pay_date, description, case_id, remark) VALUES (?,?,?,?,?,?,?)',
    [category, subcategory, amount, pay_date, description, case_id || null, remark],
    function(err) {
      if (err) return res.status(500).send(err.message);
      res.redirect('/costs');
    }
  );
});

router.post('/delete/:id', (req, res) => {
  req.db.run('DELETE FROM costs WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err.message);
    res.redirect('/costs');
  });
});

router.get('/edit/:id', (req, res) => {
  req.db.get('SELECT * FROM costs WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).send(err.message);
    if (!row) return res.status(404).send('成本不存在');
    req.db.all('SELECT id, name FROM cases', [], (err2, cases) => {
      if (err2) return res.status(500).send(err2.message);
      res.render('costs/edit', { cost: row, cases });
    });
  });
});

router.post('/edit/:id', (req, res) => {
  const { category, subcategory, amount, pay_date, description, case_id, remark } = req.body;
  req.db.run(
    'UPDATE costs SET category=?, subcategory=?, amount=?, pay_date=?, description=?, case_id=?, remark=? WHERE id=?',
    [category, subcategory, amount, pay_date, description, case_id || null, remark, req.params.id],
    function(err) {
      if (err) return res.status(500).send(err.message);
      res.redirect('/costs');
    }
  );
});

module.exports = router;
