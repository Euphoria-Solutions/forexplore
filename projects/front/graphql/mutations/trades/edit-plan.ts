import { gql } from '@apollo/client';

export const EDIT_TRADE_PLAN_MUTATION = gql`
  mutation Mutation(
    $id: String!
    $instrument: String
    $lot: String
    $mentalStatement: String
    $technicalAnalysis: String
    $entryWhen: [String]
    $exitWhen: [String]
    $entryPrice: Float
    $targetProfit: Float
    $stopLoss: Float
    $profit: String
    $exitPrice: Float
  ) {
    editTradePlan(
      _id: $id
      instrument: $instrument
      lot: $lot
      mentalStatement: $mentalStatement
      technicalAnalysis: $technicalAnalysis
      entryWhen: $entryWhen
      exitWhen: $exitWhen
      entryPrice: $entryPrice
      targetProfit: $targetProfit
      stopLoss: $stopLoss
      profit: $profit
      exitPrice: $exitPrice
    )
  }
`;
