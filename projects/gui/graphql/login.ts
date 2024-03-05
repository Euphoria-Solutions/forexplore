import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation LogIn($email: String!, $password: String!) {
    logIn(email: $email, password: $password)
  }
`;
