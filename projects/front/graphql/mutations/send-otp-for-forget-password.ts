import { gql } from '@apollo/client';

export const SEND_OTP_FOR_FORGET_PASSWORD = gql`
  mutation Mutation($email: String!) {
    sendOTPForForgetPass(email: $email)
  }
`;
