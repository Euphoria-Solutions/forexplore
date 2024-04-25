import { gql } from '@apollo/client';

export const GET_WINRATE_ANALYSIS_QUERY = gql`
  query GetWinRateAnalysis($forexAccount: String!) {
    getWinRateAnalysis(forexAccount: $forexAccount) {
      winRate
      growth
    }
  }
`;
