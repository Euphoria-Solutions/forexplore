import { mapValues } from 'lodash';
import { forgetPass, logIn, signUp } from './user';
import {
  checkOTP,
  checkOTPForForgetPass,
  sendOTP,
  sendOTPForForgetPass,
} from './otp';

export const resolversObjects = {
  Query: {
    helloQuery: () => 'Hello Query',
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
    // Default
    helloMutation: () => 'Hello Mutation',
  },
};

export const allResolvers = mapValues(resolversObjects, entries =>
  mapValues(entries)
);
