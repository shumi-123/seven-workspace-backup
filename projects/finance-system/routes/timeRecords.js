const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  req.db.all(`
    SELECT t.*, c.name as case_name, l.name as lawyer_name
    FROM time_records t
    LEFT JOIN cases c ON t.case_id = c.id
    LEFT JOIN lawyers l ON t.lawyer_id = l.id
    ORDER BY t.work_date DESC
  `, [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    req.db.all('SELECT id, name FROM cases', [], (err2, cases) => {
      if (err2) return res.status(500).send(err2.message);
      req.db.all('SELECT id, name FROM lawyers', [], (err3, lawyers) => {
        if (err3) return res.status(500).send(err3.message);
        res.render('timeRecords/list', { records: rows, cases, lawyers });
      });
    });
  });
});

router.post('/add', (req, res) => {
  const { case_id, lawyer_id, work_date, hours, description, billable } = req.body;
  req.db.run(
    'INSERT INTO time_records (case_id, lawyer_id, work_date, hours, description, billable) VALUES (?,?,?,?,?,?)',
    [case_id, lawyer_id, work_date, hours || 0, description, billable ? 1 : 0],
    function(err) {
      if (err) return res.status(500).send(err.message);
      res.redirect('/time-records');
    }
  );
});

router.post('/delete/:id', (req, res) => {
  req.db.run('DELETE FROM time_records WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err.message);
    res.redirect('/time-records');
  });
});

router.get('/edit/:id', (req, res) => {
  req.db.get('SELECT * FROM time_records WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).send(err.message);
    if (!row) return res.status(404).send('记录不存在');
    req.db.all('SELECT id, name FROM cases', [], (err2, cases) => {
      if (err2) return res.status(500).send(err2.message);
      req.db.all('SELECT id, name FROM lawyers', [], (err3, lawyers) => {
        if (err3) return res.status(500).send(err3.message);
        res.render('timeRecords/edit', { record: row, cases, lawyers });
      });
    });
  });
});

router.post('/edit/:id', (req, res) => {
  const { case_id, lawyer_id, work_date, hours, description, billable } = req.body;
  req.db.run(
    'UPDATE time_records SET case_id=?, lawyer_id=?, work_date=?, hours=?, description=?, billable=? WHERE id=?',
    [case_id, lawyer_id, work_date, hours || 0, description, billable ? 1 : 0, req.params.id],
    function(err) {
      if (err) return res.status(500).send(err.message);
      res.redirect('/time-records');
    }
  );
});

module.exports = router;
