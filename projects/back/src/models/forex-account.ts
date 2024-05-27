import mongoose from 'mongoose';

const { Schema } = mongoose;

const sessionSchema = new Schema(
  {
    session: String,
    pl: Number,
  },
  { _id: false }
);

const pairSchema = new Schema(
  {
    pair: String,
    pl: Number,
  },
  { _id: false }
);

const weekDaysData = new Schema(
  {
    weekDay: Number,
    pl: Number,
  },
  { _id: false }
);

const hoursData = new Schema(
  {
    hour: Number,
    profit: Number,
  },
  { _id: false }
);

const ForexAccountSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  sessions: [sessionSchema],
  winRateTypes: {
    overall: {
      winRate: Number,
      prevWinRate: Number,
    },
    long: {
      winRate: Number,
      prevWinRate: Number,
    },
    short: {
      winRate: Number,
      prevWinRate: Number,
    },
  },
  balance: {
    balance: Number,
    prevBalance: Number,
  },
  tradeTypes: {
    overall: {
      trades: Number,
      winTrades: Number,
    },
    long: {
      trades: Number,
      winTrades: Number,
      pl: Number,
    },
    short: {
      trades: Number,
      winTrades: Number,
      pl: Number,
    },
  },
  pairs: [pairSchema],
  weekDays: [weekDaysData],
  hours: [hoursData],
  name: String,
  broker: String,
  lastUpdate: String,
});

export const ForexAccountModel =
  mongoose.models.ForexAccount ||
  mongoose.model('ForexAccount', ForexAccountSchema);
