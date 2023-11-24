import { gql } from "@apollo/client";

export const GET_PAYSLIP = gql`
  query{
    payslips(sort: "payDate:desc",pagination:{limit:200}) {
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

export const GET_PAYSLIPS_BY_USER = gql`
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
