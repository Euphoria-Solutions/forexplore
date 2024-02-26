import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserPlanSchema = new Schema({
  name: String,
  price: Number,
  features: [String],
});

export const UserPlanModel =
  mongoose.models.Plan || mongoose.model('Plan', UserPlanSchema);
