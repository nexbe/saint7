import { gql } from "@apollo/client";
export const GET_DOCUMENTS = gql`
  query ($isGuard: Boolean!) {
    documents(
      filters: { isGuard: { eq: $isGuard } }
      sort: ["createdAt:desc"]
    ) {
      data {
        id
        attributes {
          title
          description
          createdAt
          isGuard
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
