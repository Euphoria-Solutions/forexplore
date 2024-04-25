import { Trade } from '../../generated/generated';

export const getTopPairs = (
  inserted: Trade[],
  pairs: { pair: string; pl: number; trades: number; winTrades: number }[] = []
) => {
  inserted.forEach(trade => {
    let isExist = false;
    pairs.map((pair, indx: number) => {
      if (pair.pair == trade.symbol) {
        isExist = true;
        pairs[indx] = {
          pair: pair.pair,
          pl: pair.pl + trade.profit,
          trades: pair.trades + 1,
          winTrades: pair.winTrades + (trade.profit > 0 ? 1 : 0),
        };
      }
    });

    if (!isExist) {
      pairs.push({
        pair: trade.symbol,
        pl: trade.profit,
        trades: 1,
        winTrades: trade.profit > 0 ? 1 : 0,
      });
    }
  });

  return pairs.sort((a, b) => b.pl - a.pl);
};
