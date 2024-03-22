import mongoose from 'mongoose';

const { Schema } = mongoose;

const PlanSchema = new Schema({
  tradePlan: { type: Schema.Types.ObjectId, ref: 'TradePlan' },

  time: String,
  symbol: String,
  type: String,
  lot: Number,
  entryPrice: Number,
  stopLoss: Number,
  takeProfit: Number,
});

export const PlanModel =
  mongoose.models.Plan || mongoose.model('Plan', PlanSchema);
