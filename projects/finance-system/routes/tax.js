const express = require('express');
const router = express.Router();

// 个税速算表
const taxBrackets = [
  { limit: 3000, rate: 0.03, deduction: 0 },
  { limit: 12000, rate: 0.10, deduction: 210 },
  { limit: 25000, rate: 0.20, deduction: 1410 },
  { limit: 35000, rate: 0.25, deduction: 2660 },
  { limit: 55000, rate: 0.30, deduction: 4410 },
  { limit: 80000, rate: 0.35, deduction: 7160 },
  { limit: Infinity, rate: 0.45, deduction: 15160 }
];

function calcMonthlyTax(taxableIncome) {
  if (taxableIncome <= 0) return 0;
  for (const b of taxBrackets) {
    if (taxableIncome <= b.limit) {
      return Math.round((taxableIncome * b.rate - b.deduction) * 100) / 100;
    }
  }
  const last = taxBrackets[taxBrackets.length - 1];
  return Math.round((taxableIncome * last.rate - last.deduction) * 100) / 100;
}

router.get('/', (req, res) => {
  const year = req.query.year || new Date().getFullYear();
  const month = req.query.month || new Date().getMonth() + 1;
  
  req.db.all(`
    SELECT s.*, l.name as lawyer_name, l.base_salary, l.commission_rate
    FROM salaries s
    LEFT JOIN lawyers l ON s.lawyer_id = l.id
    WHERE s.year = ? AND s.month = ?
    ORDER BY s.net_salary DESC
  `, [year, month], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    
    // 汇总
    let totalGross = 0, totalTax = 0, totalNet = 0, totalSocial = 0, totalHousing = 0;
    rows.forEach(r => {
      totalGross += r.gross_salary || 0;
      totalTax += r.tax || 0;
      totalNet += r.net_salary || 0;
      totalSocial += r.social_insurance || 0;
      totalHousing += r.housing_fund || 0;
    });
    
    req.db.all('SELECT id, name FROM lawyers', [], (err2, lawyers) => {
      if (err2) return res.status(500).send(err2.message);
      res.render('tax/list', {
        taxRecords: rows,
        year,
        month,
        totalGross,
        totalTax,
        totalNet,
        totalSocial,
        totalHousing,
        lawyers,
        taxBrackets
      });
    });
  });
});

// 年终奖个税计算器
router.post('/bonus', (req, res) => {
  const { lawyer_id, year, bonus } = req.body;
  const b = parseFloat(bonus) || 0;
  const monthlyAvg = b / 12;
  let rate = 0.03, deduction = 0;
  if (monthlyAvg > 3000) { rate = 0.10; deduction = 210; }
  else if (monthlyAvg > 12000) { rate = 0.20; deduction = 1410; }
  else if (monthlyAvg > 25000) { rate = 0.25; deduction = 2660; }
  else if (monthlyAvg > 35000) { rate = 0.30; deduction = 4410; }
  else if (monthlyAvg > 55000) { rate = 0.35; deduction = 7160; }
  else if (monthlyAvg > 80000) { rate = 0.45; deduction = 15160; }
  const tax = Math.max(0, b * rate - deduction);
  res.json({ bonus: b, monthlyAvg: Math.round(monthlyAvg * 100) / 100, rate, deduction, tax: Math.round(tax * 100) / 100, net: Math.round((b - tax) * 100) / 100 });
});

module.exports = router;
