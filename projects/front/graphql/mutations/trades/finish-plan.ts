import { gql } from '@apollo/client';

export const FINISH_TRADE_PLAN_MUTATION = gql`
  mutation FinishTradePlan($id: String!, $exitPrice: Float!, $profit: Float!) {
    finishTradePlan(_id: $id, exitPrice: $exitPrice, profit: $profit)
  }
`;
