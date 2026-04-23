const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  req.db.all('SELECT * FROM clients ORDER BY created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.render('clients/list', { clients: rows });
  });
});

router.post('/add', (req, res) => {
  const { name, contact, phone, email, address, id_card, company, remark } = req.body;
  req.db.run(
    'INSERT INTO clients (name, contact, phone, email, address, id_card, company, remark) VALUES (?,?,?,?,?,?,?,?)',
    [name, contact, phone, email, address, id_card, company, remark],
    function(err) {
      if (err) return res.status(500).send(err.message);
      res.redirect('/clients');
    }
  );
});

router.post('/delete/:id', (req, res) => {
  req.db.get('SELECT COUNT(*) as count FROM cases WHERE client_id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).send(err.message);
    if (row.count > 0) return res.status(400).send('该委托人有关联案件，请先删除案件');
    req.db.run('DELETE FROM clients WHERE id = ?', [req.params.id], (err2) => {
      if (err2) return res.status(500).send(err2.message);
      res.redirect('/clients');
    });
  });
});

router.get('/edit/:id', (req, res) => {
  req.db.get('SELECT * FROM clients WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).send(err.message);
    if (!row) return res.status(404).send('委托人不存在');
    res.render('clients/edit', { client: row });
  });
});

router.post('/edit/:id', (req, res) => {
  const { name, contact, phone, email, address, id_card, company, remark } = req.body;
  req.db.run(
    'UPDATE clients SET name=?, contact=?, phone=?, email=?, address=?, id_card=?, company=?, remark=? WHERE id=?',
    [name, contact, phone, email, address, id_card, company, remark, req.params.id],
    function(err) {
      if (err) return res.status(500).send(err.message);
      res.redirect('/clients');
    }
  );
});

module.exports = router;
