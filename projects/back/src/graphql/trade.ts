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
    forexAccount: String!
    instrument: String!
    lot: String!
    mentalStatement: String!
    technicalAnalysis: String!
    entryWhen: [String]!
    exitWhen: [String]!
    entryPrice: Float!
    targetProfit: Float
    stopLoss: Float
    createdAt: String
    profit: String
    exitPrice: Float
    status: String
    type: String!
  }

  type Note {
    _id: String!
    forexAccount: String!
    date: String!
    description: String!
  }

  type TradePlanDetails {
    date: String!
    plans: [Plan]!
    notes: [Note]!
  }

  type ProfitCalendarDetails {
    type: String!
    day: Float!
    totalTrades: Float!
    growthPercent: Float!
    growthDollar: Float!
    weekDay: Float!
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
    sl: Float
    tp: Float
    commission: Float!
    swap: Float!
    profit: Float!
  }

  input PlanInput {
    _id: String!

    time: String
    symbol: String
    type: String
    lot: Float
    entryPrice: Float
    stopLoss: Float
    takeProfit: Float
    linkedToTrade: Boolean
  }

  extend type Query {
    # Forex Account
    getForexAccounts(_id: String, user: String): [ForexAccount]!
    # Trade
    getTrades(forexAccount: String!, _id: String, date: String): [Trade]!
    # Trade Plan
    getTradePlanCallenderData(
      forexAccount: String!
      startDate: String
      endDate: String
    ): [TradePlanDetails]!
    # Calendar
    getProfitCalendar(
      forexAccount: String!
      month: String!
      year: Float!
    ): [ProfitCalendarDetails]!
  }

  extend type Mutation {
    # Forex Account
    addForexAccount(user: String!, name: String!): Boolean!
    editForexAccount(_id: String!, name: String): Boolean!
    deleteForexAccount(_id: String!): Boolean!
    # Trade
    importTradeHistory(
      forexAccountId: String!
      trades: [TradeInput]!
      broker: String!
      balance: Float!
    ): [Trade]!
    # Trade Plan
    addTradingPlan(
      forexAccount: String!
      instrument: String!
      lot: String!
      mentalStatement: String!
      technicalAnalysis: String!
      entryWhen: [String]!
      exitWhen: [String]!
      entryPrice: Float!
      targetProfit: Float
      stopLoss: Float
      profit: String
      exitPrice: Float
      type: String!
    ): Boolean!
    editTradePlan(
      _id: String!
      instrument: String
      lot: String
      mentalStatement: String
      technicalAnalysis: String
      entryWhen: [String]
      exitWhen: [String]
      entryPrice: Float
      targetProfit: Float
      stopLoss: Float
      profit: String
      exitPrice: Float
    ): Boolean!
    deleteTradePlan(_id: String!): Boolean!
    finishTradePlan(_id: String!, exitPrice: Float!, profit: Float!): Boolean!
    # Note
    addNote(forexAccount: String!, description: String!): Boolean!
    editNote(_id: String!, description: String!): Boolean!
    removeNote(_id: String!): Boolean!
  }
`;
