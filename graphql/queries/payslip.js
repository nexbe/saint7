import { gql } from "@apollo/client";

export const GET_PAYSLIP = gql`
  query {
    payslips {
      data {
        id
        attributes {
          month
          year
          payDate
          allowance
          netSalary
          basicSalary
          additionalTransactions {
            id
            value
            key
            options
          }
          user {
            data {
              id
              attributes {
                username
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_PAYSLIP_BY_ID = gql`
  query ($id: ID) {
    payslips(filters: { id: { eq: $id } }) {
      data {
        id
        attributes {
          month
          year
          payDate
          allowance
          netSalary
          basicSalary
          additionalTransactions {
            id
            value
            key
            options
          }
          user {
            data {
              id
              attributes {
                username
              }
            }
          }
        }
      }
    }
  }
`;
