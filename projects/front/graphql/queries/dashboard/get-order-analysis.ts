import { gql } from '@apollo/client';

export const GET_ORDER_ANALYSIS_QUERY = gql`
  query Query($forexAccount: String!) {
    getOrderAnalysis(forexAccount: $forexAccount) {
      bestOrderType
      growth
      winRate
      statistics {
        long
        month
        short
      }
    }
  }
`;
