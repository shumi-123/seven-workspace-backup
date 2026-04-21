const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const stats = {};

  // 总收款
  req.db.get('SELECT SUM(amount) as total FROM payments WHERE status = "已到账"', [], (err, row) => {
    stats.totalRevenue = row?.total || 0;

    // 总成本
    req.db.get('SELECT SUM(amount) as total FROM costs', [], (err2, row2) => {
      stats.totalCost = row2?.total || 0;

      // 总绩效
      req.db.get('SELECT SUM(amount) as total FROM performance', [], (err3, row3) => {
        stats.totalPerformance = row3?.total || 0;

        // 客户数
        req.db.get('SELECT COUNT(*) as count FROM clients', [], (err4, row4) => {
          stats.clientCount = row4?.count || 0;

          // 项目数
          req.db.get('SELECT COUNT(*) as count FROM projects', [], (err5, row5) => {
            stats.projectCount = row5?.count || 0;

            // 进行中项目
            req.db.get('SELECT COUNT(*) as count FROM projects WHERE status = "进行中"', [], (err6, row6) => {
              stats.activeProjects = row6?.count || 0;

              // 利润
              stats.profit = stats.totalRevenue - stats.totalCost - stats.totalPerformance;

              // 近30天收款
              req.db.all(
                'SELECT strftime("%Y-%m", pay_date) as month, SUM(amount) as total FROM payments WHERE status = "已到账" AND pay_date >= date("now", "-30 days") GROUP BY month',
                [],
                (err7, recentPayments) => {
                  // 成本分类汇总
                  req.db.all(
                    'SELECT category, SUM(amount) as total FROM costs GROUP BY category',
                    [],
                    (err8, costByCategory) => {
                      res.render('dashboard', {
                        stats,
                        recentPayments: recentPayments || [],
                        costByCategory: costByCategory || []
                      });
                    }
                  );
                }
              );
            });
          });
        });
      });
    });
  });
});

module.exports = router;
