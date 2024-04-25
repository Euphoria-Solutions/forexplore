import { gql } from '@apollo/client';

export const GET_BALANCE_ANALYSIS_QUERY = gql`
  query GetBalanceAnalysis($forexAccount: String!) {
    getBalanceAnalysis(forexAccount: $forexAccount) {
      balance
      growth
      statistics {
        month
        balance
      }
    }
  }
`;
