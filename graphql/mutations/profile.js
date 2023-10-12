import { gql } from "@apollo/client";
export const CREATE_PROFILE = gql`
  mutation Mutation($data: ProfileInput!) {
    createProfile(data: $data) {
      data {
        id
      }
    }
  }
`;
export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($data: ProfileInput!, $id: ID!) {
    updateProfile(data: $data, id: $id) {
      data {
        id
      }
    }
  }
`;
export const DELETE_PROFILE = gql`
  mutation ($id: ID!) {
    deleteProfile(id: $id) {
      data {
        id
      }
    }
  }
`;
