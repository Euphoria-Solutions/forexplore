import { gql } from '@apollo/client';

export const userTypes = gql`
  type User {
    _id: String!
    username: String!
    firstName: String!
    lastName: String!

    phone: String!
    birthday: String!
    type: String! # trade type
    gender: String!

    plan: UserPlan!
    activeDay: Float!
    email: String!
    password: String! # hashed password
    blocked: Boolean!
  }

  type UserPlan {
    _id: String!
    name: String!
    price: Float!
    features: [Feature]!
  }

  type Feature {
    _id: String!
    name: String!
  }

  extend type Query {
    # User Plan
    getPlans(_id: String): [UserPlan]!
    # User Management
    getUsers(_id: String): [User]!
  }

  extend type Mutation {
    # User Plan
    createUserPlan(name: String!, price: Float!, features: [String]!): UserPlan!
    editUserPlan(
      _id: String!
      name: String
      price: Float
      features: [String]
    ): Boolean!
    deleteUserPlan(_id: String!): Boolean!
    # User Management
    blockUser(_id: String!): Boolean!
  }
`;
