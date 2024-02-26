import jwt from 'jsonwebtoken';
import {
  MutationForgetPassArgs,
  MutationLogInArgs,
  MutationSignUpArgs,
  ResolversParentTypes,
} from '../generated/generated';
import { mailer, otpGenerator } from '../helper';
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

    return true;
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
