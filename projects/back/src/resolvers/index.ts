import { mapValues } from 'lodash';
import {
  addUserMood,
  changePass,
  editUserMood,
  forgetPass,
  getUserMoods,
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
  addNote,
  addTradingPlan,
  deleteTradePlan,
  editNote,
  editTradePlan,
  finishTradePlan,
  getSpecificTradePlan,
  getTradePlanCallenderData,
  removeNote,
} from './trade-plan';
import {
  getBalanceAnalysis,
  getOrderAnalysis,
  getPairAnalysis,
  getPersonalWinrateGrowthAnalysis,
  getPLAnalysis,
  getSessionAnalysis,
  getTotalTradesAnalysis,
  getTradingHoursAnalysis,
  getWeekDaysProfitAnalysis,
  getWinRateAnalysis,
} from './analysis';

export const resolversObjects = {
  Query: {
    helloQuery: () => 'Hello Query',
    // User Plan
    getUserPlans,
    // User Management
    getUsers,
    // User Mood
    getUserMoods,
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
    getWeekDaysProfitAnalysis,
    getTradingHoursAnalysis,
    getPersonalWinrateGrowthAnalysis,
    // Trade Plan
    getTradePlanCallenderData,
    getSpecificTradePlan,
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
    // User Mood
    addUserMood,
    editUserMood,
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
