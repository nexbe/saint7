import { gql } from "@apollo/client";
export const GET_DOCUMENT_BY_ID = gql`
  query ($userId: ID!) {
    documents(filters: { users_permissions_users: { id: { eq: $userId } } }) {
      data {
        id
        attributes {
          title
          description
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
