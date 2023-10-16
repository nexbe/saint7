import { gql } from "@apollo/client";
export const GET_USERS = gql`
  query {
    usersPermissionsUsers {
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
