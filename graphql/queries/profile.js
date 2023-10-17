import { gql } from "@apollo/client";
export const GET_PROFILE_BY_ID = gql`
  query ($userId: ID!) {
    profiles(filters: { user: { id: { eq: $userId } } }) {
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

export const GET_USER_INFO = gql`
  query {
    me {
      id
      username
      email
      role {
        id
        name
        description
      }
    }
  }
`;
