import { gql } from "@apollo/client";

export const GET_SOP_TYPES = gql`
  query {
    sopTypes {
      data {
        id
        attributes {
          name
          description
        }
      }
    }
  }
`;
