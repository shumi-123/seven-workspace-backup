const express = require('express');
const router = express.Router();

// 个税计算器
function calcTax(taxableIncome) {
  let tax = 0;
  if (taxableIncome <= 0) return 0;
  if (taxableIncome <= 3000) tax = taxableIncome * 0.03;
  else if (taxableIncome <= 12000) tax = 3000 * 0.03 + (taxableIncome - 3000) * 0.10;
  else if (taxableIncome <= 25000) tax = 3000 * 0.03 + 9000 * 0.10 + (taxableIncome - 12000) * 0.20;
  else if (taxableIncome <= 35000) tax = 3000 * 0.03 + 9000 * 0.10 + 13000 * 0.20 + (taxableIncome - 25000) * 0.25;
  else if (taxableIncome <= 55000) tax = 3000 * 0.03 + 9000 * 0.10 + 13000 * 0.20 + 10000 * 0.25 + (taxableIncome - 35000) * 0.30;
  else if (taxableIncome <= 80000) tax = 3000 * 0.03 + 9000 * 0.10 + 13000 * 0.20 + 10000 * 0.25 + 20000 * 0.30 + (taxableIncome - 55000) * 0.35;
  else tax = 3000 * 0.03 + 9000 * 0.10 + 13000 * 0.20 + 10000 * 0.25 + 20000 * 0.30 + 25000 * 0.35 + (taxableIncome - 80000) * 0.45;
  return Math.round(tax * 100) / 100;
}

router.get('/', (req, res) => {
  req.db.all(`
    SELECT s.*, l.name as lawyer_name
    FROM salaries s
    LEFT JOIN lawyers l ON s.lawyer_id = l.id
    ORDER BY s.year DESC, s.month DESC
  `, [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    req.db.all('SELECT id, name FROM lawyers', [], (err2, lawyers) => {
      if (err2) return res.status(500).send(err2.message);
      res.render('salaries/list', { salaries: rows, lawyers });
    });
  });
});

router.post('/add', (req, res) => {
  const { lawyer_id, year, month, base_salary, commission, bonus, deduction, social_insurance, housing_fund, other_deduction, remark } = req.body;
  
  const bs = parseFloat(base_salary) || 0;
  const comm = parseFloat(commission) || 0;
  const bon = parseFloat(bonus) || 0;
  const ded = parseFloat(deduction) || 0;
  const si = parseFloat(social_insurance) || 0;
  const hf = parseFloat(housing_fund) || 0;
  const od = parseFloat(other_deduction) || 0;
  
  const gross = bs + comm + bon - ded;
  const taxable = gross - si - hf - od - 5000;
  const tax = calcTax(taxable);
  const net = gross - si - hf - od - tax;
  
  req.db.run(
    'INSERT INTO salaries (lawyer_id, year, month, base_salary, commission, bonus, deduction, social_insurance, housing_fund, other_deduction, gross_salary, taxable_income, tax, net_salary, remark) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    [lawyer_id, year, month, bs, comm, bon, ded, si, hf, od, gross, Math.max(0, taxable), tax, net, remark],
    function(err) {
      if (err) return res.status(500).send(err.message);
      res.redirect('/salaries');
    }
  );
});

router.post('/delete/:id', (req, res) => {
  req.db.run('DELETE FROM salaries WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err.message);
    res.redirect('/salaries');
  });
});

module.exports = router;
