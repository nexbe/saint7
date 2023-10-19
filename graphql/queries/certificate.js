import { gql } from "@apollo/client";
export const GET_CERTIFICATE_BY_ID = gql`
  query ($userId: ID!) {
    certificates(
      filters: { users_permissions_user: { id: { eq: $userId } } }
      sort: ["createdAt:desc"]
    ) {
      data {
        id
        attributes {
          name
          expiryDate
          publishedAt
          createdAt
          updatedAt
          users_permissions_user {
            data {
              id
            }
          }
          attachement {
            data {
              id
              attributes {
                name
                url
              }
            }
          }
        }
      }
    }
  }
`;
