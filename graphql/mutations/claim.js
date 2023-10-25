import { gql } from "@apollo/client";
export const CREATE_CLAIM = gql`
  mutation Mutation($data: ClaimInput!) {
    createClaim(data: $data) {
      data {
        id
      }
    }
  }
`;
export const UPDATE_CLAIM = gql`
  mutation UpdateClaim($data: ClaimInput!, $id: ID!) {
    updateClaim(data: $data, id: $id) {
      data {
        id
      }
    }
  }
`;
export const DELETE_CLAIM = gql`
  mutation ($id: ID!) {
    deleteClaim(id: $id) {
      data {
        id
      }
    }
  }
`;
