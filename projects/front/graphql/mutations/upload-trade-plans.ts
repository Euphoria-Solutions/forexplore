import { gql } from '@apollo/client';

export const UPLOAD_TRADE_PLANS_MUTATION = gql`
  mutation Mutation($tradePlan: String!, $plans: [PlanInput]!) {
    uploadTradePlans(tradePlan: $tradePlan, plans: $plans) {
      _id
      time
      symbol
      type
      lot
      entryPrice
      takeProfit
      stopLoss
      tradePlan {
        _id
      }
    }
  }
`;
