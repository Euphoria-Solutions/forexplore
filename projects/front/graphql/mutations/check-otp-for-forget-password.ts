import { gql } from '@apollo/client';

export const CHECK_OTP_FOR_FORGET_PASSWORD = gql`
  mutation Mutation($email: String!, $otp: Float!) {
    checkOTPForForgetPass(email: $email, otp: $otp)
  }
`;
