import { gql } from '@apollo/client';

export const ADD_NOTE_MUTATION = gql`
  mutation Mutation($forexAccount: String!, $description: String!) {
    addNote(forexAccount: $forexAccount, description: $description)
  }
`;
