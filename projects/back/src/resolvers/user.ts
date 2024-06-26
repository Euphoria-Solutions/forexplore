import jwt from 'jsonwebtoken';
import {
  MutationAddUserMoodArgs,
  MutationChangePassArgs,
  MutationEditUserMoodArgs,
  MutationForgetPassArgs,
  MutationLogInArgs,
  MutationSignUpArgs,
  MutationUpdateUserDetailsArgs,
  MutationVerifyTokenArgs,
  QueryGetUserMoodsArgs,
  ResolversParentTypes,
} from '../generated/generated';
import { mailer, otpGenerator } from '../helper/common';
import { UserModel } from '../models';

const secretKey = process.env.JWT_KEY ?? '';

export const signUp = async (
  _: ResolversParentTypes,
  params: MutationSignUpArgs
) => {
  const otp = otpGenerator();
  const hashedPassword = jwt.sign({ password: params.password }, secretKey);
  const hashedOTP = jwt.sign({ otp }, secretKey, { expiresIn: 300 });

  try {
    const user = new UserModel({
      ...params,
      password: hashedPassword,
      otp: hashedOTP,
      emailVerified: false,
      plan: '65d85f2ba7de41d310b92ed5', // Free plan ID
      activeDay: 0,
      blocked: false,
      moods: [],
    });
    await user.save();

    // Email Verification
    await mailer({
      from: 'anadaochir@gmail.com',
      to: params.email,
      subject: params.type,
      text: `
        verification number: ${otp}
        `,
    });

    const sessionToken = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        emailVerified: user.emailVerified,
      },
      secretKey,
      { expiresIn: '7d' }
    );

    return sessionToken;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const logIn = async (
  _: ResolversParentTypes,
  params: MutationLogInArgs
) => {
  try {
    const user = await UserModel.findOne({ email: params.email });

    const token = jwt.verify(user.password, secretKey, {
      ignoreExpiration: true,
    });

    if (typeof token == 'string') return null;
    const sessionToken = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        emailVerified: user.emailVerified,
      },
      secretKey,
      { expiresIn: '7d' }
    );

    if (token.password == params.password) {
      if (user.blocked) {
        return null;
      }
      return sessionToken;
    }
    return null;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const forgetPass = async (
  _: ResolversParentTypes,
  params: MutationForgetPassArgs
) => {
  const hashedPassword = jwt.sign({ password: params.password }, secretKey);
  try {
    await UserModel.findOneAndUpdate(
      { email: params.email },
      { password: hashedPassword }
    );

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const verifyToken = async (
  _: ResolversParentTypes,
  { token }: MutationVerifyTokenArgs
) => {
  try {
    if (!token) throw new Error('invalid token');

    const userParams = jwt.verify(token, secretKey);

    return userParams;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const updateUserDetails = async (
  _: ResolversParentTypes,
  params: MutationUpdateUserDetailsArgs
) => {
  try {
    await UserModel.findByIdAndUpdate(params._id, params);

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const changePass = async (
  _: ResolversParentTypes,
  params: MutationChangePassArgs
) => {
  try {
    const user = await UserModel.findById(params._id);

    const token = jwt.verify(user.password, secretKey, {
      ignoreExpiration: true,
    });

    if (typeof token == 'string') return false;

    if (token.password == params.oldPassword) {
      const hashedPassword = jwt.sign(
        { password: params.newPassword },
        secretKey
      );
      await UserModel.findByIdAndUpdate(params._id, {
        password: hashedPassword,
      });
      return true;
    }
    return false;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const addUserMood = async (
  _: ResolversParentTypes,
  params: MutationAddUserMoodArgs
) => {
  const date = new Date();
  try {
    await UserModel.updateOne(
      { _id: params.userId },
      { $push: { moods: { date: date.toISOString(), mood: params.mood } } },
      { upsert: true }
    );

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const editUserMood = async (
  _: ResolversParentTypes,
  params: MutationEditUserMoodArgs
) => {
  try {
    await UserModel.updateOne(
      { _id: params.userId, 'moods._id': params._id },
      { $set: { 'moods.$.mood': params.mood } }
    );

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const getUserMoods = async (
  _: ResolversParentTypes,
  params: QueryGetUserMoodsArgs
) => {
  try {
    const user = await UserModel.findById(params);

    return user.moods;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};
