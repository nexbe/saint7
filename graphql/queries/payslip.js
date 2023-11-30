import { gql } from "@apollo/client";

export const GET_PAYSLIP = gql`
  query{
    payslips(sort: "createdAt:desc",pagination:{limit:200}) {
      data {
        id
        attributes {
          month
          year
          payDate
          allowance
          netSalary
          basicSalary
          createdAt
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
    payslips(sort: "createdAt:desc",pagination:{limit:200}, filters: { id: { eq: $id } }) {
      data {
        id
        attributes {
          month
          year
          payDate
          allowance
          netSalary
          basicSalary
          createdAt
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
    payslips(sort: "createdAt:desc",pagination:{limit:200},filters: { user: { id: { eq: $userId } } }) {
      data {
        id
        attributes {
          month
          year
          payDate
          netSalary
          allowance
          createdAt
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
