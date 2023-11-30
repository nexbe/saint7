import { gql } from "@apollo/client";

export const GET_ALL_USERS_HISTORY = gql`
  query{
    loginHistories(sort: "createdAt:desc",pagination:{limit:100}) {
      data {
        id
        attributes {
          user {
            data {
              id
              attributes {
                email
              }
            }
          }
          loginAt
          logoutAt
        }
      }
    }
  }
`;

export const GET_HISTORY_BY_ID = gql`
  query ($id: ID) {
    loginHistories(filters: { user: { id: { eq: $id } } }) {
      data {
        id
        attributes {
          user {
            data {
              id
              attributes {
                email
              }
            }
          }
          loginAt
          logoutAt
        }
      }
    }
  }
`;
