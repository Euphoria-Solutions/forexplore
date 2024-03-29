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
    plan: Plan
  }

  type TradePlan {
    _id: String!
    forexAccount: ForexAccount!

    title: String!
  }

  type Plan {
    _id: String!
    tradePlan: TradePlan!

    time: String!
    symbol: String!
    type: String!
    lot: Float!
    entryPrice: Float!
    stopLoss: Float!
    takeProfit: Float!
  }

  type TradePlanDetails {
    _id: String!
    title: String!
    plans: [Plan]!
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

  input PlanInput {
    _id: String!
    tradePlan: String!

    time: String!
    symbol: String!
    type: String!
    lot: Float!
    entryPrice: Float!
    stopLoss: Float!
    takeProfit: Float!
  }

  extend type Query {
    # Forex Account
    getForexAccounts(_id: String): [ForexAccount]!
    # Trade
    getTrades(forexAccount: String, _id: String): [Trade]!
    # Trade Plan
    getTradePlans(forexAccount: String!): [TradePlanDetails]!
  }

  extend type Mutation {
    # Forex Account
    addForexAccount(user: String!, name: String!): Boolean!
    editForexAccount(_id: String!, name: String): Boolean!
    deleteForexAccount(_id: String!): Boolean!
    # Trade
    importTradeHistroy(
      forexAccountId: String!
      trades: [TradeInput]!
      broker: String!
      balance: Float!
    ): [Trade]!
    # Trade Plan
    createTradePlan(forexAccount: String!, title: String!): Boolean!
    editTradePlan(_id: String!, title: String!): Boolean!
    deleteTradePlan(_id: String!): Boolean!
    # Plan
    addPlan(
      tradePlan: String!
      time: String!
      symbol: String!
      type: String!
      lot: Float!
      entryPrice: Float!
      stopLoss: Float!
      takeProfit: Float!
    ): Boolean!
    editPlan(plans: [PlanInput!]): Boolean!
    deletePlan(_id: String!): Boolean!
    linkPlanToTrade(planId: String!, tradeId: String!): Boolean!
  }
`;
