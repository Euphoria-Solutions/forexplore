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

  type ForexAccount {
    _id: String!
    user: User!
    name: String!
    broker: String
    balance: Float
    lastUpdate: String!
  }

  type Trade {
    _id: String!
    forexAccount: ForexAccount!

    openTime: String!
    closeTime: String!
    positionId: String!
    symbol: String!
    type: String!
    volume: Float!
    openPrice: Float!
    closePrice: Float!
    sl: Float!
    tp: Float!
    commission: Float!
    swap: Float!
    profit: Float!
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

  input TradeInput {
    forexAccount: String!

    openTime: String!
    closeTime: String!
    positionId: String!
    symbol: String!
    type: String!
    volume: Float!
    openPrice: Float!
    closePrice: Float!
    sl: Float!
    tp: Float!
    commission: Float!
    swap: Float!
    profit: Float!
  }

  type Query {
    helloQuery: String
    # User Plan
    getPlans(_id: String): [UserPlan]!
    # User Management
    getUsers(_id: String): [User]!
    # Forex Account
    getForexAccounts(_id: String): [ForexAccount]!
    # Trade
    getTrades(forexAccount: String, _id: String): [Trade]!
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
    # Forex Account
    addForexAccount(userId: String!, name: String!): Boolean!
    editForexAccount(_id: String!, name: String): Boolean!
    deleteForexAccount(_id: String!): Boolean!
    # Trade
    importTradeHistroy(
      forexAccountId: String!
      trades: [TradeInput]!
      broker: String!
      balance: Float!
    ): Boolean!
    # Default
    helloMutation: String
  }
`;
