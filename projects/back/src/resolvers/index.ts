import { mapValues } from 'lodash';
import { forgetPass, logIn, signUp, verifyToken } from './user';
import {
  checkOTP,
  checkOTPForForgetPass,
  sendOTP,
  sendOTPForForgetPass,
} from './otp';
import { createPlan, deletePlan, editPlan, getPlans } from './user-plan';
import { blockUser, getUsers } from './user-management';

export const resolversObjects = {
  Query: {
    helloQuery: () => 'Hello Query',
    // User Plan
    getPlans,
    // User Management
    getUsers,
  },
  Mutation: {
    // Auth
    signUp,
    logIn,
    forgetPass,
    verifyToken,
    // OTP
    checkOTP,
    sendOTP,
    sendOTPForForgetPass,
    checkOTPForForgetPass,
    // User Plan
    createPlan,
    editPlan,
    deletePlan,
    // User Management
    blockUser,
    // Default
    helloMutation: () => 'Hello Mutation',
  },
};

export const allResolvers = mapValues(resolversObjects, entries =>
  mapValues(entries)
);
