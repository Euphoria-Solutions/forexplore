import { gql } from '@apollo/client';

export const typeDefs = gql`
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

  type UserDetails {
    _id: String!
    username: String!
    emailVerified: Boolean!
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

  type Query {
    helloQuery: String
    # User Plan
    getPlans(_id: String): [UserPlan]!
    # User Management
    getUsers(_id: String): [User]!
  }

  type Mutation {
    # Auth
    logIn(email: String!, password: String!): String # access token
    signUp(
      username: String!
      firstName: String!
      lastName: String!
      phone: String!
      birthday: String!
      type: String!
      gender: String!
      email: String!
      password: String!
    ): Boolean! # send email verification
    forgetPass(email: String!, password: String!): Boolean!
    verifyToken(token: String): UserDetails
    # OTP
    checkOTP(_id: String!, otp: Float!): String!
    sendOTP(_id: String!): Boolean!
    sendOTPForForgetPass(email: String!): Boolean!
    checkOTPForForgetPass(email: String!, otp: Float!): Boolean!
    # User Plan
    createPlan(name: String!, price: Float!, features: [String]!): UserPlan!
    editPlan(
      _id: String!
      name: String
      price: Float
      features: [String]
    ): Boolean!
    deletePlan(_id: String!): Boolean!
    # User Management
    blockUser(_id: String!): Boolean!
    # Default
    helloMutation: String
  }
`;
