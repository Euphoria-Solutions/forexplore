import { mapValues } from 'lodash';
import {
  changePass,
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
import { getProfitCalendar, getTrades, importTradeHistory } from './trade';
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
  addNote,
  addTradingPlan,
  deleteTradePlan,
  editNote,
  editTradePlan,
  finishTradePlan,
  getTradePlanCallenderData,
  removeNote,
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
    getProfitCalendar,
    // Analysis,
    getBalanceAnalysis,
    getWinRateAnalysis,
    getPLAnalysis,
    getTotalTradesAnalysis,
    getSessionAnalysis,
    getOrderAnalysis,
    getPairAnalysis,
    // Trade Plan
    getTradePlanCallenderData,
  },
  Mutation: {
    // Auth
    signUp,
    logIn,
    forgetPass,
    verifyToken,
    changePass,
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
    addTradingPlan,
    editTradePlan,
    deleteTradePlan,
    finishTradePlan,
    // Note
    addNote,
    editNote,
    removeNote,
    // Default
    helloMutation: () => 'Hello Mutation',
  },
};

export const allResolvers = mapValues(resolversObjects, entries =>
  mapValues(entries)
);
