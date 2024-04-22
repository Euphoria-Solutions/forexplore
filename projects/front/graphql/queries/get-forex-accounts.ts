import { gql } from '@apollo/client';

export const GET_FOREX_ACCOUNTS = gql`
  query GetForexAccounts($user: String) {
    getForexAccounts(user: $user) {
      _id
      name
      broker
      lastUpdate
      user {
        _id
        activeDay
        birthday
        blocked
        email
        firstName
        gender
        lastName
        password
        phone
        type
        username
      }
    }
  }
`;
