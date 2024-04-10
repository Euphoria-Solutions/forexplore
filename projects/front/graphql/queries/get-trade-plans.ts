import { gql } from '@apollo/client';

export const GET_TRADE_PLANS_QUERY = gql`
  query Query($forexAccount: String!) {
    getTradePlans(forexAccount: $forexAccount) {
      _id
      title
      plans {
        _id
        time
        symbol
        type
        lot
        entryPrice
        stopLoss
        takeProfit
        linkedToTrade
      }
    }
  }
`;
