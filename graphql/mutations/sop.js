import { gql } from "@apollo/client";

export const GET_SOP_TYPES = gql`
  query {
    sopTypes(sort: "createdAt:desc", pagination:{limit:100}){
      data {
        id
        attributes {
          name
          description
          createdAt
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
