import { gql } from '@apollo/client';

export const EDIT_NOTE_MUTATION = gql`
  mutation Mutation($id: String!, $description: String!) {
    editNote(_id: $id, description: $description)
  }
`;
