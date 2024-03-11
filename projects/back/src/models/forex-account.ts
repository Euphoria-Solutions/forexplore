import mongoose from 'mongoose';

const { Schema } = mongoose;

const ForexAccountSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  name: String,
  broker: String,
  balance: Number,
  lastUpdate: String,
});

export const ForexAccountModel =
  mongoose.models.ForexAccount ||
  mongoose.model('ForexAccount', ForexAccountSchema);
