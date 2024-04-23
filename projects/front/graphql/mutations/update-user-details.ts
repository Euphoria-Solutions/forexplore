import { gql } from '@apollo/client';

export const UPDATE_USER_DETAILS_MUTATION = gql`
  mutation Mutation(
    $id: String!
    $firstName: String
    $lastName: String
    $username: String
    $phone: String
  ) {
    updateUserDetails(
      _id: $id
      firstName: $firstName
      lastName: $lastName
      username: $username
      phone: $phone
    )
  }
`;
