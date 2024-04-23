import { gql } from '@apollo/client';

export const CHANGE_PASSWORD_MUTATION = gql`
  mutation Mutation(
    $id: String!
    $oldPassword: String!
    $newPassword: String!
  ) {
    changePass(_id: $id, oldPassword: $oldPassword, newPassword: $newPassword)
  }
`;
