const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  req.db.all('SELECT * FROM costs ORDER BY pay_date DESC', [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.render('costs/list', { costs: rows });
  });
});

router.post('/add', (req, res) => {
  const { category, subcategory, amount, pay_date, description, remark } = req.body;
  req.db.run(
    'INSERT INTO costs (category, subcategory, amount, pay_date, description, remark) VALUES (?,?,?,?,?,?)',
    [category, subcategory, amount, pay_date, description, remark],
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

module.exports = router;
