import { gql } from '@apollo/client';

export const GET_TOTAL_TRADES_ANALYSIS_QUERY = gql`
  query GetTotalTradesAnalysis($forexAccount: String!, $type: String) {
    getTotalTradesAnalysis(forexAccount: $forexAccount, type: $type) {
      statistics {
        month
        week
        trades
      }
    }
  }
`;
