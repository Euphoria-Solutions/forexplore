import { gql } from '@apollo/client';

export const ADD_PLAN_MUTATION = gql`
  mutation Mutation(
    $tradePlan: String!
    $time: String!
    $symbol: String!
    $type: String!
    $lot: Float!
    $entryPrice: Float!
    $stopLoss: Float!
    $takeProfit: Float!
  ) {
    addPlan(
      tradePlan: $tradePlan
      time: $time
      symbol: $symbol
      type: $type
      lot: $lot
      entryPrice: $entryPrice
      stopLoss: $stopLoss
      takeProfit: $takeProfit
    )
  }
`;
