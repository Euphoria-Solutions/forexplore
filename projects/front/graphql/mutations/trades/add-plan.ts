import { gql } from '@apollo/client';

export const ADD_PLAN_MUTATION = gql`
  mutation Mutation(
    $forexAccount: String!
    $instrument: String!
    $mentalStatement: String!
    $technicalAnalysis: String!
    $entryWhen: [String]!
    $exitWhen: [String]!
    $entryPrice: Float!
    $type: String!
    $targetProfit: Float
    $stopLoss: Float
    $lot: Float!
  ) {
    addTradingPlan(
      forexAccount: $forexAccount
      instrument: $instrument
      mentalStatement: $mentalStatement
      technicalAnalysis: $technicalAnalysis
      entryWhen: $entryWhen
      exitWhen: $exitWhen
      entryPrice: $entryPrice
      type: $type
      targetProfit: $targetProfit
      stopLoss: $stopLoss
      lot: $lot
    )
  }
`;
