const { gql } = require("@apollo/client");

export const GET_ANNOUNCEMENTS = gql`
  query {
    announcements {
      data {
        id
        attributes {
          title
          description
          createdAt
          users_permissions_users {
            data {
              id
              attributes {
                username
                profile {
                  data {
                    attributes {
                      photo {
                        data {
                          attributes {
                            url
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
      }
    }
  }
`;
