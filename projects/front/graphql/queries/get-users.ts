import { gql } from '@apollo/client';

export const GET_USERS_QUERY = gql`
  query Query($id: String) {
    getUsers(_id: $id) {
      username
      firstName
      phone
      lastName
    }
  }
`;
