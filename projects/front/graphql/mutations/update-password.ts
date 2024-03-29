import { gql } from '@apollo/client';

export const UPDATE_PASSWORD_MUTATION = gql`
  mutation Mutation($email: String!, $password: String!) {
    forgetPass(email: $email, password: $password)
  }
`;
