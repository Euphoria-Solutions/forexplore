import { gql } from '@apollo/client';

export const GET_PAIR_ANALYSIS_QUERY = gql`
  query Query($forexAccount: String!) {
    getPairAnalysis(forexAccount: $forexAccount) {
      bestPairs
      bestPairsStatistics
      worstPairsStatistics
      worstPairs
    }
  }
`;
