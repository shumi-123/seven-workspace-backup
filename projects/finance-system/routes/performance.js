const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  req.db.all(`
    SELECT pf.*, p.name as project_name, s.name as staff_name
    FROM performance pf
    LEFT JOIN projects p ON pf.project_id = p.id
    LEFT JOIN staff s ON pf.staff_id = s.id
    ORDER BY pf.created_at DESC
  `, [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    req.db.all('SELECT id, name FROM projects', [], (err2, projects) => {
      if (err2) return res.status(500).send(err2.message);
      req.db.all('SELECT id, name FROM staff', [], (err3, staff) => {
        if (err3) return res.status(500).send(err3.message);
        res.render('performance/list', { performance: rows, projects, staff });
      });
    });
  });
});

router.post('/add', (req, res) => {
  const { project_id, staff_id, amount, ratio, remark } = req.body;
  req.db.run(
    'INSERT INTO performance (project_id, staff_id, amount, ratio, remark) VALUES (?,?,?,?,?)',
    [project_id, staff_id, amount, ratio, remark],
    function(err) {
      if (err) return res.status(500).send(err.message);
      res.redirect('/performance');
    }
  );
});

router.post('/delete/:id', (req, res) => {
  req.db.run('DELETE FROM performance WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err.message);
    res.redirect('/performance');
  });
});

module.exports = router;
