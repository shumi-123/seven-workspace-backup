"""
双因子量化策略 — 建模阶段用训练集搜索最优买入/卖出阈值，测试集验证
因子: 成交量确认(放量倍数) + 价格突破(均线周期/突破幅度)
"""
import pandas as pd
import numpy as np
from itertools import product

def load_data(stock_code, start, end):
    """拉取历史数据"""
    import akshare as ak
    df = ak.stock_zh_a_hist(symbol=stock_code, period="daily",
                            start_date=start, end_date=end, adjust="qfq")
    df.columns = ['date','open','close','high','low','volume','amount',
                  'amplitude','pct_change','change_amount','turnover']
    df['date'] = pd.to_datetime(df['date'])
    df = df.sort_values('date').reset_index(drop=True)
    return df

def generate_signals(df, buy_ma, buy_vol_mul, sell_ma, stop_loss=0):
    """
    基于阈值生成信号
    - 买入: 收盘价 > MA(buy_ma) AND 成交量 > MA(成交量,5) * buy_vol_mul
    - 卖出: 收盘价 < MA(sell_ma) OR 止损(回撤达stop_loss%)
    """
    df = df.copy()
    df['ma_buy'] = df['close'].rolling(buy_ma).mean()
    df['ma_sell'] = df['close'].rolling(sell_ma).mean()
    df['vol_ma5'] = df['volume'].rolling(5).mean()
    
    df['signal'] = 0
    df['position'] = 0
    entry_price = 0
    pos = 0
    
    for i in range(len(df)):
        # 止损线（持仓时检查）
        if pos == 1 and stop_loss > 0:
            drawdown = (df.loc[i, 'close'] / entry_price - 1) * 100
            if drawdown <= -stop_loss:
                pos = 0
                df.loc[i, 'signal'] = -2  # 止损卖出
                continue
        
        # 买入条件
        buy_cond = (df.loc[i, 'close'] > df.loc[i, 'ma_buy']) and \
                   (df.loc[i, 'volume'] > df.loc[i, 'vol_ma5'] * buy_vol_mul)
        
        # 卖出条件
        sell_cond = df.loc[i, 'close'] < df.loc[i, 'ma_sell']
        
        if buy_cond and pos == 0:
            pos = 1
            entry_price = df.loc[i, 'close']
            df.loc[i, 'signal'] = 1
        elif sell_cond and pos == 1:
            pos = 0
            df.loc[i, 'signal'] = -1
        
        df.loc[i, 'position'] = pos
    
    return df

def backtest(df, initial=100000, pos_ratio=0.5):
    """回测引擎"""
    df = df.copy()
    df['returns'] = df['close'].pct_change()
    df['strat_ret'] = df['position'].shift(1) * df['returns']
    df['equity'] = initial * (1 + df['strat_ret'].cumsum() * pos_ratio)
    df['buyhold'] = initial * (1 + df['returns'].cumsum())
    return df

def metrics(df):
    """绩效指标"""
    sr = df['strat_ret'].dropna()
    total = (df['equity'].iloc[-1] / df['equity'].iloc[0] - 1) * 100
    annual = (df['equity'].iloc[-1] / df['equity'].iloc[0]) ** (252/len(df)) - 1 if len(df) > 0 else 0
    mdd = ((df['equity'] / df['equity'].cummax()) - 1).min() * 100
    sharpe = sr.mean() / sr.std() * np.sqrt(252) if sr.std() > 0 else -999
    win = (sr > 0).mean() * 100 if len(sr) > 0 else 0
    trades = len(df[df['signal'] != 0])
    return {'total': total, 'annual': annual*100, 'mdd': mdd, 'sharpe': sharpe, 'win': win, 'trades': trades}

def modeling(train_df):
    """
    建模阶段: 在训练集上搜索买入/卖出阈值
    目标是找到总收益最大的参数组合
    """
    print(f"\n{'='*60}")
    print("【建模阶段】搜索最优买入/卖出阈值")
    print(f"{'='*60}")
    
    # 参数空间定义
    buy_ma_options = [5, 10, 20, 30]          # 买入均线周期
    buy_vol_mul_options = [1.2, 1.5, 2.0, 3.0, 5.0]  # 成交量放大倍数
    sell_ma_options = [5, 10, 20, 30]          # 卖出均线周期
    stop_loss_options = [0, 3, 5, 8, 10]       # 止损比例(%), 0=不设止损
    pos_ratio_options = [0.5, 0.8, 1.0]        # 仓位比例
    
    param_combinations = list(product(
        buy_ma_options, buy_vol_mul_options, sell_ma_options, 
        stop_loss_options, pos_ratio_options
    ))
    
    print(f"参数空间: {len(param_combinations)} 种组合")
    print(f"  买入均线: {buy_ma_options}")
    print(f"  放量倍数: {buy_vol_mul_options}")
    print(f"  卖出均线: {sell_ma_options}")
    print(f"  止损比例: {stop_loss_options}%")
    print(f"  仓位比例: {pos_ratio_options}")
    
    best_total_return = -999
    best_params = None
    best_df = None
    all_results = []
    
    for idx, (buy_ma, buy_vol, sell_ma, stop_loss, pos_ratio) in enumerate(param_combinations):
        df = generate_signals(train_df.copy(), buy_ma, buy_vol, sell_ma, stop_loss)
        df = backtest(df, pos_ratio=pos_ratio)
        m = metrics(df)
        
        all_results.append({
            'buy_ma': buy_ma, 'buy_vol': buy_vol, 'sell_ma': sell_ma,
            'stop_loss': stop_loss, 'pos_ratio': pos_ratio,
            **m
        })
        
        # 建模目标: 总收益最大（同时过滤掉回撤过大的）
        if m['total'] > best_total_return and m['mdd'] > -50:  # 过滤极端回撤
            best_total_return = m['total']
            best_params = (buy_ma, buy_vol, sell_ma, stop_loss, pos_ratio)
            best_df = df
    
    # 输出最优参数
    buy_ma, buy_vol, sell_ma, stop_loss, pos_ratio = best_params
    print(f"\n{'='*60}")
    print("【最优阈值】建模结果")
    print(f"{'='*60}")
    print(f"买入条件: 收盘价 > MA({buy_ma}日) AND 成交量 > 5日均量 × {buy_vol}")
    print(f"卖出条件: 收盘价 < MA({sell_ma}日)", end="")
    if stop_loss > 0:
        print(f" OR 持仓回撤 ≥ {stop_loss}% 止损")
    else:
        print(" (无止损)")
    print(f"仓位比例: {pos_ratio*100}%")
    
    tm = metrics(best_df)
    print(f"\n建模集表现:")
    print(f"  总收益: {tm['total']:.2f}%")
    print(f"  年化收益: {tm['annual']:.2f}%")
    print(f"  最大回撤: {tm['mdd']:.2f}%")
    print(f"  夏普比率: {tm['sharpe']:.2f}")
    print(f"  胜率: {tm['win']:.1f}%")
    print(f"  交易次数: {tm['trades']}次")
    
    return best_params, pd.DataFrame(all_results)

def validation(test_df, best_params):
    """
    验证阶段: 用建模得到的最优阈值，在测试集上跑
    参数绝不动
    """
    buy_ma, buy_vol, sell_ma, stop_loss, pos_ratio = best_params
    
    print(f"\n{'='*60}")
    print("【验证阶段】用最优阈值跑测试集")
    print(f"{'='*60}")
    print(f"测试集: {test_df['date'].iloc[0].date()} ~ {test_df['date'].iloc[-1].date()}")
    
    df = generate_signals(test_df.copy(), buy_ma, buy_vol, sell_ma, stop_loss)
    df = backtest(df, pos_ratio=pos_ratio)
    m = metrics(df)
    
    print(f"\n测试集表现:")
    print(f"  总收益: {m['total']:.2f}%")
    print(f"  年化收益: {m['annual']:.2f}%")
    print(f"  最大回撤: {m['mdd']:.2f}%")
    print(f"  夏普比率: {m['sharpe']:.2f}")
    print(f"  胜率: {m['win']:.1f}%")
    print(f"  交易次数: {m['trades']}次")
    
    # Buy & Hold 基准
    bh = (test_df['close'].iloc[-1] / test_df['close'].iloc[0] - 1) * 100
    print(f"\nBuy&Hold同期收益: {bh:.2f}%")
    
    if m['total'] > bh:
        print(f"=> 策略跑赢 {m['total']-bh:.2f}个百分点")
    else:
        print(f"=> 策略跑输 {bh-m['total']:.2f}个百分点")
    
    return df

def run(stock_code):
    """完整流程"""
    print(f"\n{'#'*60}")
    print(f"# 标的: {stock_code}")
    print(f"{'#'*60}")
    
    # 1. 拉数据
    train_df = load_data(stock_code, '20190101', '20231231')
    test_df = load_data(stock_code, '20240101', '20241231')
    
    # 2. 建模（找最优阈值）
    best_params, all_results = modeling(train_df)
    
    # 3. 验证（不动参数）
    val_df = validation(test_df, best_params)
    
    return best_params, all_results, val_df

# ====== 执行 ======
if __name__ == "__main__":
    # 示例: 贵州茅台
    # run("600519")
    pass
