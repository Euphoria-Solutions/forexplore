import { gql } from '@apollo/client';

export const typeDefs = gql`
  type Query {
    helloQuery: String
  }

  type Mutation {
    helloMutation: String
  }
`;
