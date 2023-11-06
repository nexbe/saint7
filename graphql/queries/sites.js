import { gql } from "@apollo/client";

export const GET_SITES = gql`
  query {
    sites {
      data {
        id
        attributes {
          name
          address
          description
          deleted
          location {
            id
            Name
            Area
            Lat
            Lng
          }
          checkpoints {
            id
            Name
            Location {
              id
            }
            QRcode {
              data {
                id
              }
            }
            UUID
          }
          shifts {
            data {
              id
              attributes {
                title
              }
            }
          }
        }
      }
    }
  }
`;
