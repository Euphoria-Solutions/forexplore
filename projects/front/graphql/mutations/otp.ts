import { gql } from '@apollo/client';

export const SEND_OTP = gql`
  mutation Mutation($id: String!) {
    sendOTP(_id: $id)
  }
`;

export const CHECK_OTP = gql`
  mutation CheckOTP($id: String!, $otp: Float!) {
    checkOTP(_id: $id, otp: $otp)
  }
`;
