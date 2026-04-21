const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  req.db.all('SELECT * FROM lawyers ORDER BY created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.render('lawyers/list', { lawyers: rows });
  });
});

router.post('/add', (req, res) => {
  const { name, license_no, role, base_salary, commission_rate, social_insurance, housing_fund, phone, email, entry_date, remark } = req.body;
  req.db.run(
    'INSERT INTO lawyers (name, license_no, role, base_salary, commission_rate, social_insurance, housing_fund, phone, email, entry_date, remark) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
    [name, license_no, role || '专职律师', base_salary || 0, commission_rate || 0, social_insurance || 0, housing_fund || 0, phone, email, entry_date, remark],
    function(err) {
      if (err) return res.status(500).send(err.message);
      res.redirect('/lawyers');
    }
  );
});

router.post('/delete/:id', (req, res) => {
  req.db.run('DELETE FROM lawyers WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err.message);
    res.redirect('/lawyers');
  });
});

module.exports = router;
