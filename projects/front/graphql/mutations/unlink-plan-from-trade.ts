import { gql } from '@apollo/client';

export const UNLINK_PLAN_FROM_TRADE = gql`
  mutation Mutation($planId: String!, $tradeId: String!) {
    unLinkPlanFromTrade(planId: $planId, tradeId: $tradeId)
  }
`;
