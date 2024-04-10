import { gql } from '@apollo/client';

export const CREATE_TRADING_PLAN_MUTATION = gql`
  mutation CreateTradePlan($forexAccount: String!, $title: String!) {
    createTradePlan(forexAccount: $forexAccount, title: $title)
  }
`;
