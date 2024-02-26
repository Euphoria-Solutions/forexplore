import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  firstName: String,
  lastName: String,

  phone: String,
  birthday: String,
  type: String,
  gender: String,

  email: {
    type: String,
    unique: true,
  },
  password: String,

  plan: { type: Schema.Types.ObjectId, ref: 'Plan' },
  activeDay: Number,

  otp: String,
  emailVerified: Boolean,

  blocked: Boolean,
});

export const UserModel =
  mongoose.models.User || mongoose.model('User', UserSchema);
