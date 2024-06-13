import { gql } from '@apollo/client';

export const GET_SPECIFIC_TRADE_PLAN_QUERY = gql`
  query GetSpecificTradePlan($id: String) {
    getSpecificTradePlan(_id: $id) {
      _id
      forexAccount
      instrument
      lot
      mentalStatement
      technicalAnalysis
      entryWhen
      exitWhen
      entryPrice
      targetProfit
      stopLoss
      createdAt
      profit
      exitPrice
      status
      type
    }
  }
`;
