import { gql } from '@apollo/client';

export const ADD_FOREX_ACCOUNT = gql`
  mutation Mutation($user: String!, $name: String!) {
    addForexAccount(user: $user, name: $name)
  }
`;
