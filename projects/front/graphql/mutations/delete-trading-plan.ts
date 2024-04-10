import { gql } from '@apollo/client';

export const REMOVE_TRADING_PLAN_MUTATION = gql`
  mutation DeleteTradePlan($id: String!) {
    deleteTradePlan(_id: $id)
  }
`;
