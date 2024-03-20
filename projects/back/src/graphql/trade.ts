import { gql } from '@apollo/client';

export const tradeTypes = gql`
  type ForexAccount {
    _id: String!
    user: User!
    name: String!
    broker: String
    balance: Float
    lastUpdate: String!
  }

  type Trade {
    _id: String!
    forexAccount: ForexAccount!

    openTime: String!
    closeTime: String!
    positionId: String!
    symbol: String!
    type: String!
    volume: Float!
    openPrice: Float!
    closePrice: Float!
    sl: Float!
    tp: Float!
    commission: Float!
    swap: Float!
    profit: Float!
  }

  input TradeInput {
    forexAccount: String!

    openTime: String!
    closeTime: String!
    positionId: String!
    symbol: String!
    type: String!
    volume: Float!
    openPrice: Float!
    closePrice: Float!
    sl: Float!
    tp: Float!
    commission: Float!
    swap: Float!
    profit: Float!
  }

  extend type Query {
    # Forex Account
    getForexAccounts(_id: String): [ForexAccount]!
    # Trade
    getTrades(forexAccount: String, _id: String): [Trade]!
  }

  extend type Mutation {
    # Forex Account
    addForexAccount(userId: String!, name: String!): Boolean!
    editForexAccount(_id: String!, name: String): Boolean!
    deleteForexAccount(_id: String!): Boolean!
    # Trade
    importTradeHistroy(
      forexAccountId: String!
      trades: [TradeInput]!
      broker: String!
      balance: Float!
    ): [Trade]!
  }
`;
