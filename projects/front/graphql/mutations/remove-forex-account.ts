import { gql } from '@apollo/client';

export const REMOVE_FOREX_ACCOUNT_MUTATION = gql`
  mutation Mutation($id: String!) {
    deleteForexAccount(_id: $id)
  }
`;
