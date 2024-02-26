import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import {
  MutationCheckOtpArgs,
  MutationCheckOtpForForgetPassArgs,
  MutationSendOtpArgs,
  MutationSendOtpForForgetPassArgs,
  ResolversParentTypes,
} from '../generated/generated';
import { UserModel } from '../models';
import { otpGenerator } from '../helper';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS,
  },
});

const secretKey = process.env.JWT_KEY ?? '';
export const checkOTP = async (
  _: ResolversParentTypes,
  params: MutationCheckOtpArgs
) => {
  try {
    const user = await UserModel.findOne({ _id: params._id });

    const token = jwt.verify(user.otp, secretKey);

    if (typeof token == 'string') return null;

    if (token.otp == params.otp) {
      console.log('a');
      const sessionToken = jwt.sign(
        {
          _id: user._id,
          username: user.username,
        },
        secretKey,
        {
          expiresIn: '7d',
        }
      );
      await UserModel.findByIdAndUpdate(params._id, { emailVerified: true });

      return sessionToken;
    }

    return null;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const sendOTP = async (
  _: ResolversParentTypes,
  params: MutationSendOtpArgs
) => {
  try {
    const user = await UserModel.findById(params._id);
    const otp = otpGenerator();
    const hashedOTP = jwt.sign({ otp }, secretKey, { expiresIn: 300 });

    await UserModel.findByIdAndUpdate(params._id, { otp: hashedOTP });

    await transporter.sendMail({
      from: 'anadaochir@gmail.com',
      to: user.email,
      subject: user.type,
      text: `
        verification number: ${otp}
        `,
    });

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const sendOTPForForgetPass = async (
  _: ResolversParentTypes,
  params: MutationSendOtpForForgetPassArgs
) => {
  const otp = otpGenerator();
  const hashedOTP = jwt.sign({ otp }, secretKey, { expiresIn: 300 });
  try {
    await UserModel.findOneAndUpdate(
      { email: params.email },
      { otp: hashedOTP }
    );

    await transporter.sendMail({
      from: 'anadaochir@gmail.com',
      to: params.email,
      subject: 'Password Recovery',
      text: `
        verification number: ${otp}
        `,
    });

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const checkOTPForForgetPass = async (
  _: ResolversParentTypes,
  params: MutationCheckOtpForForgetPassArgs
) => {
  try {
    const user = await UserModel.findOne({ email: params.email });

    const token = jwt.verify(user.otp, secretKey);

    if (typeof token == 'string') return null;

    if (token.otp == params.otp) {
      return true;
    }
  } catch (err) {
    throw new Error((err as Error).message);
  }
};
