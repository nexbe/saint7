import { gql } from "@apollo/client";

export const GET_PAYSLIPS = gql`
  query {
    payslips {
      data {
        id
        attributes {
          month
          year
          payDate
          netSalary
          allowance

          basicSalary
        }
      }
    }
  }
`;

export const GET_PAYSLIPS_BY_ID = gql`
  query ($userId: ID!) {
    payslips(filters: { user: { id: { eq: $userId } } }) {
      data {
        id
        attributes {
          month
          year
          payDate
          netSalary
          allowance

          basicSalary
        }
      }
    }
  }
`;
