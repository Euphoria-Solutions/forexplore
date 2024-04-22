import { gql } from '@apollo/client';

export const GET_SESSION_ANALYSIS_QUERY = gql`
  query Query($forexAccount: String!) {
    getSessionAnalysis(forexAccount: $forexAccount) {
      currentSessions
      sessionType
      statistics {
        NewYork
        Tokyo
        London
        Sydney
        month
      }
    }
  }
`;
