import { gql } from "@apollo/client";

export const CREATE_LOGIN_HISTORY = gql`
  mutation ($data: LoginHistoryInput!) {
    createLoginHistory(data: $data) {
      data {
        id
      }
    }
  }
`;
