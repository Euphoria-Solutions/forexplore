import { gql } from '@apollo/client';

export const REMOVE_PLAN_MUTATION = gql`
  mutation Mutation($id: String!) {
    deletePlan(_id: $id)
  }
`;
