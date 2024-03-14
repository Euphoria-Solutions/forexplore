import mongoose from 'mongoose';

const { Schema } = mongoose;

const weekSchema = new Schema({
  week: Number,
  trades: Number,
});

const StatisticsSchema = new Schema({
  forexAccount: { type: Schema.Types.ObjectId, ref: 'ForexAccount' },

  year: Number,
  month: String,
  // balance: Number,
  trades: Number,
  profit: Number,
  loss: Number,
  weeks: [weekSchema],
});

export const StatisticsModel =
  mongoose.models.Statistic || mongoose.model('Statistic', StatisticsSchema);
