import { gql } from "@apollo/client";
export const CREATE_DOCUMENT = gql`
  mutation Mutation($data: DocumentInput!) {
    createDocument(data: $data) {
      data {
        id
      }
    }
  }
`;
export const UPDATE_DOCUMENT = gql`
  mutation UpdateDocument($data: DocumentInput!, $id: ID!) {
    updateDocument(data: $data, id: $id) {
      data {
        id
      }
    }
  }
`;
export const DELETE_DOCUMENT = gql`
  mutation ($id: ID!) {
    deleteDocument(id: $id) {
      data {
        id
      }
    }
  }
`;
