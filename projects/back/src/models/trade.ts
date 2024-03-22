import mongoose from 'mongoose';

const { Schema } = mongoose;

const TradeSchema = new Schema({
  forexAccount: { type: Schema.Types.ObjectId, ref: 'ForexAccount' },
  plan: { type: Schema.Types.ObjectId, ref: 'Plan' },

  openTime: String,
  closeTime: String,
  positionId: {
    type: String,
    unique: true,
    index: true,
  },
  session: [String],
  symbol: String,
  type: String,
  volume: Number,
  openPrice: Number,
  closePrice: Number,
  sl: Number,
  tp: Number,
  commission: Number,
  swap: Number,
  profit: Number,
});

export const TradeModel =
  mongoose.models.Trade || mongoose.model('Trade', TradeSchema);
