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
    email: String!
    password: String! # hashed password
  }

  type Query {
    helloQuery: String
  }

  type Mutation {
    # Auth
    logIn(email: String!, password: String!): String! # access token
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
    # OTP
    checkOTP(_id: String!, otp: Float!): String!
    sendOTP(_id: String!): Boolean!
    sendOTPForForgetPass(email: String!): Boolean!
    checkOTPForForgetPass(email: String!, otp: Float!): Boolean!

    # Default
    helloMutation: String
  }
`;
