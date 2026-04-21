const express = require('express');
const router = express.Router();

// 项目列表
router.get('/', (req, res) => {
  req.db.all(`
    SELECT p.*, c.name as client_name 
    FROM projects p 
    LEFT JOIN clients c ON p.client_id = c.id 
    ORDER BY p.created_at DESC
  `, [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    req.db.all('SELECT id, name FROM clients', [], (err2, clients) => {
      if (err2) return res.status(500).send(err2.message);
      res.render('projects/list', { projects: rows, clients });
    });
  });
});

// 新增项目
router.post('/add', (req, res) => {
  const { client_id, name, status, start_date, end_date, contract_amount, remark } = req.body;
  req.db.run(
    'INSERT INTO projects (client_id, name, status, start_date, end_date, contract_amount, remark) VALUES (?,?,?,?,?,?,?)',
    [client_id, name, status || '进行中', start_date, end_date, contract_amount || 0, remark],
    function(err) {
      if (err) return res.status(500).send(err.message);
      res.redirect('/projects');
    }
  );
});

// 删除项目
router.post('/delete/:id', (req, res) => {
  req.db.run('DELETE FROM projects WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err.message);
    res.redirect('/projects');
  });
});

module.exports = router;
