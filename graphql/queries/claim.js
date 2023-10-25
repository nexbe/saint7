import { gql } from "@apollo/client";
export const GET_CLAIM_BY_ID = gql`
  query ($userId: ID!) {
    claims(
      filters: { users_permissions_user: { id: { eq: $userId } } }
      sort: ["createdAt:desc"]
      pagination: { limit: 100 }
    ) {
      data {
        id
        attributes {
          category
          expenseDate
          amount
          status
          purpose
          createdAt
          updatedAt
          publishedAt
          actionBy {
            data {
              id
              attributes {
                username
              }
            }
          }
          attachment {
            data {
              id
              attributes {
                name
                url
              }
            }
          }
          users_permissions_user {
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

export const GET_CLAIMS = gql`
  query ($userId: ID!) {
    claims(
      filters: { users_permissions_user: { id: { ne: $userId } } }
      sort: ["createdAt:desc"]
      pagination: { limit: 100 }
    ) {
      data {
        id
        attributes {
          category
          expenseDate
          amount
          status
          purpose
          createdAt
          updatedAt
          publishedAt
          actionBy {
            data {
              id
              attributes {
                username
              }
            }
          }
          attachment {
            data {
              id
              attributes {
                name
                url
              }
            }
          }
          users_permissions_user {
            data {
              id
              attributes {
                username
                profile {
                  data {
                    id
                    attributes {
                      photo {
                        data {
                          id
                          attributes {
                            url
                          }
                        }
                      }
                    }
                  }
                }
                role {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
