const express = require('express');
const router = express.Router();

// 通用CSV导出
router.get('/:table', (req, res) => {
  const table = req.params.table;
  const allowed = ['clients','lawyers','cases','payments','invoices','costs','salaries','time_records','case_commissions'];
  if (!allowed.includes(table)) return res.status(400).send('不支持的表');
  
  req.db.all(`SELECT * FROM ${table}`, [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    if (rows.length === 0) return res.send('无数据');
    
    const headers = Object.keys(rows[0]).filter(k => k !== 'created_at');
    let csv = '\uFEFF' + headers.join(',') + '\n';
    rows.forEach(row => {
      csv += headers.map(h => {
        let val = row[h] !== null ? String(row[h]) : '';
        if (val.includes(',') || val.includes('\n') || val.includes('"')) {
          val = '"' + val.replace(/"/g, '""') + '"';
        }
        return val;
      }).join(',') + '\n';
    });
    
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename=${table}_${new Date().toISOString().slice(0,10)}.csv`);
    res.send(csv);
  });
});

module.exports = router;
