import { gql } from '@apollo/client';

export const analysisTypes = gql`
  scalar JSON

  type Statistic {
    month: String!
    balance: Float!
  }

  type TradeStatistic {
    month: String!
    week: String
    trades: Float!
  }

  type PLStatistic {
    month: String!
    profit: Float!
    loss: Float!
  }

  type SessionStatistic {
    month: String!
    Sydney: Float!
    London: Float!
    NewYork: Float!
    Tokyo: Float!
  }

  type OrderTypeStatistic {
    month: String!
    long: Float!
    short: Float!
  }

  type BalanceAnalysis {
    balance: Float!
    growth: Float!
    statistics: [Statistic]
  }

  type WinRateAnalysis {
    winRate: Float!
    growth: Float!
  }

  type PLAnalysis {
    statistics: [PLStatistic]!
  }

  type TotalTradesAnalysis {
    statistics: [TradeStatistic]!
  }

  type SessionAnalysis {
    currentSessions: [String]!
    sessionType: String! # Worst, Best Neutral
    statistics: [SessionStatistic]!
  }

  type OrderTypeAnalysis {
    bestOrderType: String!
    winRate: Float!
    growth: Float!
    statistics: [OrderTypeStatistic]!
  }

  type PairAnalysis {
    bestPairs: [String]!
    worstPairs: [String]!
    bestPairsStatistics: [JSON]!
    worstPairsStatistics: [JSON]!
  }

  extend type Query {
    # Analysis
    getBalanceAnalysis(forexAccount: String!): BalanceAnalysis!
    getWinRateAnalysis(forexAccount: String!): WinRateAnalysis!
    getPLAnalysis(forexAccount: String!): PLAnalysis!
    getTotalTradesAnalysis(
      forexAccount: String!
      type: String!
    ): TotalTradesAnalysis!
    getSessionAnalysis(forexAccount: String!): SessionAnalysis!
    getOrderAnalysis(forexAccount: String!): OrderTypeAnalysis!
    getPairAnalysis(forexAccount: String!): PairAnalysis!
  }
`;
