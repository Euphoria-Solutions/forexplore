import { gql } from '@apollo/client';
import { analysisTypes } from './analysis';
import { authTypes } from './auth';
import { tradeTypes } from './trade';
import { userTypes } from './user';

export const typeDefs = gql`
  ${analysisTypes}
  ${authTypes}
  ${tradeTypes}
  ${userTypes}

  type Query {
    helloQuery: String
  }

  type Mutation {
    helloMutation: String
  }
`;
