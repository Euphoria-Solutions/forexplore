import mongoose from 'mongoose';

const { Schema } = mongoose;

const TradePlanSchema = new Schema({
  forexAccount: { type: Schema.Types.ObjectId, ref: 'ForexAccount' },
  instrument: String,
  lot: String,
  mentalStatement: String,
  technicalAnalysis: String,
  entryWhen: [String],
  exitWhen: [String],
  entryPrice: Number,
  targetProfit: Number,
  stopLoss: Number,
  createdAt: String,
  profit: Number,
  exitPrice: Number,
  status: String,
});

export const TradePlanModel =
  mongoose.models.TradePlan || mongoose.model('TradePlan', TradePlanSchema);
