import { mapValues } from 'lodash';
import { forgetPass, logIn, signUp } from './user';
import {
  checkOTP,
  checkOTPForForgetPass,
  sendOTP,
  sendOTPForForgetPass,
} from './otp';
import { createPlan, deletePlan, editPlan, getPlans } from './user-plan';

export const resolversObjects = {
  Query: {
    helloQuery: () => 'Hello Query',
    getPlans,
  },
  Mutation: {
    // Auth
    signUp,
    logIn,
    forgetPass,
    // OTP
    checkOTP,
    sendOTP,
    sendOTPForForgetPass,
    checkOTPForForgetPass,
    // User Plan
    createPlan,
    editPlan,
    deletePlan,
    // Default
    helloMutation: () => 'Hello Mutation',
  },
};

export const allResolvers = mapValues(resolversObjects, entries =>
  mapValues(entries)
);
