import { gql } from '@apollo/client';

export const SIGN_UP_MUTATION = gql`
  mutation Mutation(
    $username: String!
    $firstName: String!
    $lastName: String!
    $phone: String!
    $birthday: String!
    $type: String!
    $gender: String!
    $email: String!
    $password: String!
  ) {
    signUp(
      username: $username
      firstName: $firstName
      lastName: $lastName
      phone: $phone
      birthday: $birthday
      type: $type
      gender: $gender
      email: $email
      password: $password
    )
  }
`;
