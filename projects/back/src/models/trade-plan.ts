import mongoose from 'mongoose';

const { Schema } = mongoose;

const TradePlanSchema = new Schema({
  forexAccount: { type: Schema.Types.ObjectId, ref: 'ForexAccount' },
  title: String,
});

export const TradePlanModel =
  mongoose.models.TradePlan || mongoose.model('TradePlan', TradePlanSchema);
