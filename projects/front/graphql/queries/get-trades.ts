import { gql } from '@apollo/client';

export const GET_TRADES_QUERY = gql`
  query Query($forexAccount: String) {
    getTrades(forexAccount: $forexAccount) {
      _id
      openTime
      closeTime
      positionId
      symbol
      type
      volume
      openPrice
      closePrice
      sl
      tp
      commission
      swap
      profit
      plan {
        _id
        time
        symbol
        type
        lot
        entryPrice
        stopLoss
        takeProfit
      }
    }
  }
`;
