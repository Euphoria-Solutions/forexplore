import { gql } from '@apollo/client';

export const VERIFY_TOKEN_MUTATION = gql`
  mutation Mutation($token: String) {
    verifyToken(token: $token) {
      _id
      username
      emailVerified
    }
  }
`;
