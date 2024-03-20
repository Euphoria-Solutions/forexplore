import mongoose from 'mongoose';

const { Schema } = mongoose;

const weekSchema = new Schema(
  {
    week: Number,
    trades: Number,
  },
  { _id: false }
);

const sessionSchema = new Schema(
  {
    session: String,
    trades: Number,
    winTrades: Number,
  },
  { _id: false }
);

const pairSchema = new Schema(
  {
    pair: String,
    trades: Number,
    winTrades: Number,
  },
  { _id: false }
);

const StatisticsSchema = new Schema({
  forexAccount: { type: Schema.Types.ObjectId, ref: 'ForexAccount' },

  year: Number,
  month: String,
  balance: Number,
  trades: Number,
  profit: Number,
  loss: Number,
  long: Number,
  short: Number,
  weeks: [weekSchema],
  sessions: [sessionSchema],
  pairs: [pairSchema],
  lastUpdate: String,
});

export const StatisticsModel =
  mongoose.models.Statistic || mongoose.model('Statistic', StatisticsSchema);
