import { gql } from '@apollo/client';

export const LINK_TRADE_TO_PLAN = gql`
  mutation LinkPlanToTrade($planId: String!, $tradeId: String!) {
    linkPlanToTrade(planId: $planId, tradeId: $tradeId)
  }
`;
