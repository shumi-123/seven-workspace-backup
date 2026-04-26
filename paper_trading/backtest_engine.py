#!/usr/bin/env python3
"""
三角协作 — 量化策略回测引擎 v0.1
双阈值动量+均值回归策略
"""

import json
import math
from dataclasses import dataclass, field
from typing import List, Dict, Tuple, Optional
from datetime import datetime

@dataclass
class Tick:
    """单条K线数据"""
    date: str
    open: float
    high: float
    low: float
    close: float
    volume: float
    amount: float

@dataclass
class Position:
    """持仓记录"""
    stock: str
    entry_price: float
    quantity: int
    entry_date: str

@dataclass
class Trade:
    """交易记录"""
    date: str
    stock: str
    action: str  # BUY / SELL
    price: float
    quantity: int
    reason: str

@dataclass
class Portfolio:
    """账户状态"""
    cash: float = 1_000_000.0
    positions: Dict[str, Position] = field(default_factory=dict)
    trades: List[Trade] = field(default_factory=list)

@dataclass
class Params:
    """策略参数"""
    N: int = 20           # 突破周期
    M: int = 5            # 止损周期
    stop_loss: float = 0.05  # 止损比例 5%
    rsi_low: int = 30     # RSI超卖阈值
    rsi_high: int = 70    # RSI超买阈值
    position_pct: float = 0.2  # 单标的上限仓位 20%

class TechnicalIndicators:
    """技术指标计算"""
    
    @staticmethod
    def ma(prices: List[float], period: int) -> List[Optional[float]]:
        """简单移动平均"""
        result = []
        for i in range(len(prices)):
            if i < period - 1:
                result.append(None)
            else:
                result.append(sum(prices[i-period+1:i+1]) / period)
        return result
    
    @staticmethod
    def rsi(prices: List[float], period: int = 14) -> List[Optional[float]]:
        """RSI相对强弱指标"""
        result = [None] * period
        gains = []
        losses = []
        for i in range(1, len(prices)):
            diff = prices[i] - prices[i-1]
            gains.append(max(diff, 0))
            losses.append(max(-diff, 0))
        
        for i in range(period, len(prices)):
            avg_gain = sum(gains[i-period:i]) / period
            avg_loss = sum(losses[i-period:i]) / period
            if avg_loss == 0:
                result.append(100.0)
            else:
                rs = avg_gain / avg_loss
                result.append(100 - (100 / (1 + rs)))
        return result
    
    @staticmethod
    def bollinger(prices: List[float], period: int = 20, std_mult: float = 2.0) -> Tuple[List[Optional[float]], List[Optional[float]], List[Optional[float]]]:
        """布林带：中轨, 上轨, 下轨"""
        ma = TechnicalIndicators.ma(prices, period)
        upper = []
        lower = []
        for i in range(len(prices)):
            if i < period - 1 or ma[i] is None:
                upper.append(None)
                lower.append(None)
            else:
                std = math.sqrt(sum((p - ma[i])**2 for p in prices[i-period+1:i+1]) / period)
                upper.append(ma[i] + std_mult * std)
                lower.append(ma[i] - std_mult * std)
        return ma, upper, lower

class StrategyEngine:
    """策略引擎"""
    
    def __init__(self, params: Params):
        self.params = params
        self.portfolio = Portfolio()
    
    def backtest(self, ticks: List[Tick], stock: str) -> Dict:
        """
        对单只标的进行回测
        返回：收益率、最大回撤、夏普比率、交易次数
        """
        closes = [t.close for t in ticks]
        volumes = [t.volume for t in ticks]
        
        # 计算指标
        ma5 = TechnicalIndicators.ma(closes, 5)
        ma20 = TechnicalIndicators.ma(closes, 20)
        ma60 = TechnicalIndicators.ma(closes, 60)
        rsi_vals = TechnicalIndicators.rsi(closes, 14)
        bb_ma, bb_upper, bb_lower = TechnicalIndicators.bollinger(closes, 20)
        
        equity_curve = []
        max_equity = self.portfolio.cash
        max_drawdown = 0.0
        
        for i in range(60, len(ticks)):  # 从第60天开始（指标预热）
            tick = ticks[i]
            date = tick.date
            price = tick.close
            
            # 检查止损
            if stock in self.portfolio.positions:
                pos = self.portfolio.positions[stock]
                loss_pct = (price - pos.entry_price) / pos.entry_price
                if loss_pct <= -self.params.stop_loss:
                    self._sell(tick, stock, f"止损触发({loss_pct:.1%})")
            
            # 买入条件（同时满足）
            # 1. 价格突破N日高点
            # 2. 成交量放大
            # 3. RSI未超买
            if stock not in self.portfolio.positions:
                high_n = max(t.close for t in ticks[i-self.params.N:i])
                vol_avg = sum(t.volume for t in ticks[i-5:i]) / 5
                
                buy_signal = (
                    price >= high_n and
                    tick.volume >= vol_avg * 1.2 and
                    rsi_vals[i] is not None and rsi_vals[i] < self.params.rsi_high
                )
                
                if buy_signal:
                    max_pos_value = self.portfolio.cash * self.params.position_pct
                    qty = int(max_pos_value / price / 100) * 100  # 100股整数
                    if qty >= 100:
                        self._buy(tick, stock, qty, "突破+放量")
            
            # 卖出条件
            # 1. 价格跌破M日低点
            # 2. RSI超买
            if stock in self.portfolio.positions:
                low_m = min(t.close for t in ticks[i-self.params.M:i])
                
                sell_signal = (
                    price <= low_m or
                    (rsi_vals[i] is not None and rsi_vals[i] > self.params.rsi_high)
                )
                
                if sell_signal:
                    self._sell(tick, stock, "跌破低点/RSI超买")
            
            # 计算当日净值
            equity = self.portfolio.cash
            if stock in self.portfolio.positions:
                pos = self.portfolio.positions[stock]
                equity += pos.quantity * price
            equity_curve.append((date, equity))
            
            if equity > max_equity:
                max_equity = equity
            drawdown = (max_equity - equity) / max_equity
            if drawdown > max_drawdown:
                max_drawdown = drawdown
        
        # 最终结算
        final_equity = self.portfolio.cash
        for pos in self.portfolio.positions.values():
            final_equity += pos.quantity * closes[-1]
        
        total_return = (final_equity - 1_000_000) / 1_000_000
        
        return {
            "stock": stock,
            "params": self.params,
            "total_return": total_return,
            "max_drawdown": max_drawdown,
            "trade_count": len(self.portfolio.trades),
            "final_equity": final_equity,
            "equity_curve": equity_curve
        }
    
    def _buy(self, tick: Tick, stock: str, qty: int, reason: str):
        cost = qty * tick.close
        if cost <= self.portfolio.cash:
            self.portfolio.cash -= cost
            self.portfolio.positions[stock] = Position(
                stock=stock,
                entry_price=tick.close,
                quantity=qty,
                entry_date=tick.date
            )
            self.portfolio.trades.append(Trade(
                date=tick.date, stock=stock, action="BUY",
                price=tick.close, quantity=qty, reason=reason
            ))
    
    def _sell(self, tick: Tick, stock: str, reason: str):
        if stock not in self.portfolio.positions:
            return
        pos = self.portfolio.positions[stock]
        proceeds = pos.quantity * tick.close
        self.portfolio.cash += proceeds
        self.portfolio.trades.append(Trade(
            date=tick.date, stock=stock, action="SELL",
            price=tick.close, quantity=pos.quantity, reason=reason
        ))
        del self.portfolio.positions[stock]


class GridSearch:
    """参数网格搜索"""
    
    @staticmethod
    def search(ticks: List[Tick], stock: str) -> List[Dict]:
        """遍历所有参数组合，返回排序后的结果"""
        results = []
        
        param_space = {
            'N': [5, 10, 20, 60],
            'M': [3, 5, 10],
            'stop_loss': [0.03, 0.05, 0.08, 0.10],
            'rsi_low': [20, 25, 30],
            'rsi_high': [70, 75, 80]
        }
        
        total = 1
        for v in param_space.values():
            total *= len(v)
        
        print(f"开始网格搜索：{total} 种参数组合")
        
        for N in param_space['N']:
            for M in param_space['M']:
                for sl in param_space['stop_loss']:
                    for rsi_l in param_space['rsi_low']:
                        for rsi_h in param_space['rsi_high']:
                            params = Params(
                                N=N, M=M, stop_loss=sl,
                                rsi_low=rsi_l, rsi_high=rsi_h
                            )
                            engine = StrategyEngine(params)
                            result = engine.backtest(ticks, stock)
                            results.append(result)
        
        # 按收益率排序，过滤最大回撤 < 20%
        results = [r for r in results if r['max_drawdown'] < 0.20]
        results.sort(key=lambda x: x['total_return'], reverse=True)
        
        return results


def load_data_from_csv(filepath: str) -> List[Tick]:
    """从CSV加载历史K线数据"""
    ticks = []
    import csv
    with open(filepath, 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            ticks.append(Tick(
                date=row.get('date', row.get('trade_date', '')),
                open=float(row['open']),
                high=float(row['high']),
                low=float(row['low']),
                close=float(row['close']),
                volume=float(row.get('volume', 0)),
                amount=float(row.get('amount', 0))
            ))
    return ticks


def load_data_from_kimi(stock: str, years: int = 5) -> List[Tick]:
    """
    从kimi_finance拉取历史数据（待实现）
    当前 kimi_finance 只支持 realtime_price / realtime_tech
    历史日线需要其他数据源
    """
    raise NotImplementedError("需要接入历史K线数据源")


if __name__ == "__main__":
    print("三角协作量化回测引擎 v0.1")
    print("使用方式：")
    print("  1. 准备CSV历史数据（date,open,high,low,close,volume,amount）")
    print("  2. ticks = load_data_from_csv('600519.csv')")
    print("  3. results = GridSearch.search(ticks, '600519.SH')")
    print("  4. print(results[0])  # TOP1参数")
