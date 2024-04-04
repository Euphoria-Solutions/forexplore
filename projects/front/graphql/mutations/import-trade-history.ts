import { gql } from '@apollo/client';

export const IMPORT_TRADE_HISTORY_MUTATION = gql`
  mutation ImportTradeHistory(
    $forexAccountId: String!
    $broker: String!
    $balance: Float!
    $trades: [TradeInput]!
  ) {
    importTradeHistory(
      forexAccountId: $forexAccountId
      broker: $broker
      balance: $balance
      trades: $trades
    ) {
      _id
      positionId
    }
  }
`;
