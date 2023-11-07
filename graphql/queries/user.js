import { gql } from "@apollo/client";
export const GET_USERS = gql`
  query {
    usersPermissionsUsers(pagination: { limit: 100 }) {
      data {
        id
        attributes {
          username
          email
          role {
            data {
              id
              attributes {
                name
              }
            }
          }
          profile {
            data {
              id
              attributes {
                firstName
                lastName
                photo {
                  data {
                    id
                    attributes {
                      url
                    }
                  }
                }
                favoriteUsers {
                  data {
                    id
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

export const GET_USER_BY_ID = gql`
  query ($userId: ID!) {
    usersPermissionsUsers(filters: { id: { eq: $userId } }) {
      data {
        id
        attributes {
          username
          email
          facialScanImage {
            data {
              attributes {
                name

                url
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
          profile {
            data {
              id
              attributes {
                firstName
                lastName
                gender
                photo {
                  data {
                    id
                    attributes {
                      name
                      url
                    }
                  }
                }
                contactNumber
                joinDate
                status
                position
                address {
                  id
                  AddressLine1
                  AddressLine2
                  City
                  State
                  PostalCode
                  Country
                }
                user {
                  data {
                    id
                    attributes {
                      username
                      email
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
