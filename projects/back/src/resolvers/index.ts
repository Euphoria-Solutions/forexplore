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
import {
  addForexAccount,
  deleteForexAccount,
  editForexAccount,
  getForexAccounts,
} from './forex-account';
import { getTrades, importTradeHistroy } from './trade';
import {
  getOrderAnalysis,
  getPairAnalysis,
  getSessionAnalysis,
} from './analysis/advanced';
import {
  getBalanceAnalysis,
  getPLAnalysis,
  getTotalTradesAnalysis,
  getWinRateAnalysis,
} from './analysis/basic';

export const resolversObjects = {
  Query: {
    helloQuery: () => 'Hello Query',
    // User Plan
    getPlans,
    // User Management
    getUsers,
    // Forex Account,
    getForexAccounts,
    // Trade,
    getTrades,
    // Analysis,
    getBalanceAnalysis,
    getWinRateAnalysis,
    getPLAnalysis,
    getTotalTradesAnalysis,
    getSessionAnalysis,
    getOrderAnalysis,
    getPairAnalysis,
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
    // Forex Account
    addForexAccount,
    editForexAccount,
    deleteForexAccount,
    // Trade
    importTradeHistroy,
    // Default
    helloMutation: () => 'Hello Mutation',
  },
};

export const allResolvers = mapValues(resolversObjects, entries =>
  mapValues(entries)
);
