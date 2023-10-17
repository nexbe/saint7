import { gql } from "@apollo/client";

export const GET_OTP = gql`
  mutation ($email: String!) {
    forgotPassword(email: $email)
  }
`;

export const VERIFY_OTP = gql`
  mutation ($input: VerifyOtpInput!) {
    verifyOtp(input: $input)
  }
`;

export const RESET_PASSWORD = gql`
  mutation (
    $password: String!
    $passwordConfirmation: String!
    $code: String!
  ) {
    resetPassword(
      password: $password
      passwordConfirmation: $passwordConfirmation
      code: $code
    )
  }
`;

export const RESEND_OTP = gql`
  mutation ($input: ResendOTPInput!) {
    resendOtp(input: $input)
  }
`;
