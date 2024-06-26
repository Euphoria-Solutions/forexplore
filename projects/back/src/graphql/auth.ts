import { gql } from '@apollo/client';

export const authTypes = gql`
  type UserDetails {
    _id: String!
    username: String!
    emailVerified: Boolean!
  }

  extend type Mutation {
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
    ): String! # send email verification
    forgetPass(email: String!, password: String!): Boolean!
    verifyToken(token: String): UserDetails
    checkOTP(_id: String!, otp: Float!): String!
    sendOTP(_id: String!): Boolean!
    sendOTPForForgetPass(email: String!): Boolean!
    checkOTPForForgetPass(email: String!, otp: Float!): String!
    changePass(
      _id: String!
      oldPassword: String!
      newPassword: String!
    ): Boolean!
  }
`;
