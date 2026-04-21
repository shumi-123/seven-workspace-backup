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
  req.db.run('DELETE FROM clients WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err.message);
    res.redirect('/clients');
  });
});

module.exports = router;
