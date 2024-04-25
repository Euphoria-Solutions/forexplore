import { gql } from '@apollo/client';

export const GET_PL_ANALYSIS_QUERY = gql`
  query GetPLAnalysis($forexAccount: String!) {
    getPLAnalysis(forexAccount: $forexAccount) {
      statistics {
        month
        profit
        loss
      }
    }
  }
`;
