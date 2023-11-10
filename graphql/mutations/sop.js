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

export const CREATE_SOP_TYPE = gql`
  mutation ($data: SopTypeInput!) {
    createSopType(data: $data) {
      data {
        id
      }
    }
  }
`;
