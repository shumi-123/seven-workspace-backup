const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const stats = {};
  
  req.db.get('SELECT SUM(amount) as total FROM payments WHERE status = "已到账"', [], (err, row) => {
    stats.totalRevenue = row?.total || 0;
    
    req.db.get('SELECT SUM(amount) as total FROM costs', [], (err2, row2) => {
      stats.totalCost = row2?.total || 0;
      
      req.db.get('SELECT SUM(amount) as total FROM case_commissions', [], (err3, row3) => {
        stats.totalCommission = row3?.total || 0;
        
        req.db.get('SELECT SUM(tax) as total FROM salaries', [], (err4, row4) => {
          stats.totalTax = row4?.total || 0;
          
          req.db.get('SELECT SUM(social_insurance + housing_fund) as total FROM salaries', [], (err5, row5) => {
            stats.totalSocial = row5?.total || 0;
            
            req.db.get('SELECT COUNT(*) as count FROM clients', [], (err6, row6) => {
              stats.clientCount = row6?.count || 0;
              
              req.db.get('SELECT COUNT(*) as count FROM cases', [], (err7, row7) => {
                stats.caseCount = row7?.count || 0;
                
                req.db.get('SELECT COUNT(*) as count FROM cases WHERE status = "进行中"', [], (err8, row8) => {
                  stats.activeCases = row8?.count || 0;
                  
                  stats.profit = stats.totalRevenue - stats.totalCost - stats.totalCommission - stats.totalSocial;
                  
                  // 案件类型分布
                  req.db.all('SELECT type, COUNT(*) as count FROM cases GROUP BY type', [], (err9, caseTypes) => {
                    
                    // 本月收款
                    req.db.get('SELECT SUM(amount) as total FROM payments WHERE status = "已到账" AND pay_date >= date("now", "start of month")', [], (err10, row10) => {
                      stats.monthRevenue = row10?.total || 0;
                      
                      // 成本分类
                      req.db.all('SELECT category, SUM(amount) as total FROM costs GROUP BY category', [], (err11, costByCategory) => {
                        
                        res.render('dashboard', {
                          stats,
                          caseTypes: caseTypes || [],
                          costByCategory: costByCategory || []
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});

module.exports = router;
