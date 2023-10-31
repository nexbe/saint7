import { gql } from "@apollo/client";
export const GET_DOCUMENTS = gql`
  query {
    documents(sort: ["createdAt:desc"]) {
      data {
        id
        attributes {
          title
          description
          createdAt
          attachment {
            data {
              id
              attributes {
                name
                url
              }
            }
          }
          users_permissions_users {
            data {
              id
            }
          }
        }
      }
    }
  }
`;
