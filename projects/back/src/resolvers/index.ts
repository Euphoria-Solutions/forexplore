import { mapValues } from 'lodash';
import {
  forgetPass,
  logIn,
  signUp,
  updateUserDetails,
  verifyToken,
} from './user';
import {
  checkOTP,
  checkOTPForForgetPass,
  sendOTP,
  sendOTPForForgetPass,
} from './otp';
import {
  createUserPlan,
  deleteUserPlan,
  editUserPlan,
  getUserPlans,
} from './user-plan';
import { blockUser, getUsers } from './user-management';
import {
  addForexAccount,
  deleteForexAccount,
  editForexAccount,
  getForexAccounts,
} from './forex-account';
import { getTrades, importTradeHistory } from './trade';
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
import {
  addPlan,
  createTradePlan,
  deletePlan,
  deleteTradePlan,
  editPlan,
  editTradePlan,
  getTradePlans,
  linkPlanToTrade,
} from './trade-plan';

export const resolversObjects = {
  Query: {
    helloQuery: () => 'Hello Query',
    // User Plan
    getUserPlans,
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
    // Trade Plan
    getTradePlans,
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
    createUserPlan,
    editUserPlan,
    deleteUserPlan,
    // User Management
    blockUser,
    updateUserDetails,
    // Forex Account
    addForexAccount,
    editForexAccount,
    deleteForexAccount,
    // Trade
    importTradeHistory,
    // Trade Plan
    createTradePlan,
    editTradePlan,
    deleteTradePlan,
    // Plan
    addPlan,
    editPlan,
    deletePlan,
    linkPlanToTrade,
    // Default
    helloMutation: () => 'Hello Mutation',
  },
};

export const allResolvers = mapValues(resolversObjects, entries =>
  mapValues(entries)
);
