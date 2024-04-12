import { gql } from '@apollo/client';

export const CREATE_TRADING_PLAN_MUTATION = gql`
  mutation CreateTradePlan(
    $forexAccount: String!
    $title: String!
    $order: Float!
  ) {
    createTradePlan(forexAccount: $forexAccount, title: $title, order: $order)
  }
`;
