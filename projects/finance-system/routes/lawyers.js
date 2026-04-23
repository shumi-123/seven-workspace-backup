const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  req.db.all('SELECT * FROM lawyers ORDER BY created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.render('lawyers/list', { lawyers: rows });
  });
});

router.post('/add', (req, res) => {
  const { name, license_no, position, base_salary, commission_rate, social_insurance, housing_fund, remark } = req.body;
  req.db.run(
    'INSERT INTO lawyers (name, license_no, position, base_salary, commission_rate, social_insurance, housing_fund, remark) VALUES (?,?,?,?,?,?,?,?)',
    [name, license_no, position, parseFloat(base_salary)||0, parseFloat(commission_rate)||0, parseFloat(social_insurance)||0, parseFloat(housing_fund)||0, remark],
    function(err) {
      if (err) return res.status(500).send(err.message);
      res.redirect('/lawyers');
    }
  );
});

router.post('/delete/:id', (req, res) => {
  const lawyerId = req.params.id;
  const checks = [
    ['SELECT COUNT(*) as count FROM cases WHERE responsible_lawyer_id = ? OR assistant_lawyer_id = ?', '案件'],
    ['SELECT COUNT(*) as count FROM time_records WHERE lawyer_id = ?', '工时记录'],
    ['SELECT COUNT(*) as count FROM case_commissions WHERE lawyer_id = ?', '案件提成'],
    ['SELECT COUNT(*) as count FROM salaries WHERE lawyer_id = ?', '工资记录']
  ];
  let pending = checks.length;
  let blocked = [];
  checks.forEach(([sql, name]) => {
    req.db.get(sql, [lawyerId, lawyerId], (err, row) => {
      if (row && row.count > 0) blocked.push(name);
      if (--pending === 0) {
        if (blocked.length > 0) return res.status(400).send('该律师有关联' + blocked.join('、') + '，请先删除');
        req.db.run('DELETE FROM lawyers WHERE id = ?', [lawyerId], (err2) => {
          if (err2) return res.status(500).send(err2.message);
          res.redirect('/lawyers');
        });
      }
    });
  });
});

router.get('/edit/:id', (req, res) => {
  req.db.get('SELECT * FROM lawyers WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).send(err.message);
    if (!row) return res.status(404).send('律师不存在');
    res.render('lawyers/edit', { lawyer: row });
  });
});

router.post('/edit/:id', (req, res) => {
  const { name, license_no, position, base_salary, commission_rate, social_insurance, housing_fund, remark } = req.body;
  req.db.run(
    'UPDATE lawyers SET name=?, license_no=?, position=?, base_salary=?, commission_rate=?, social_insurance=?, housing_fund=?, remark=? WHERE id=?',
    [name, license_no, position, parseFloat(base_salary)||0, parseFloat(commission_rate)||0, parseFloat(social_insurance)||0, parseFloat(housing_fund)||0, remark, req.params.id],
    function(err) {
      if (err) return res.status(500).send(err.message);
      res.redirect('/lawyers');
    }
  );
});

module.exports = router;
