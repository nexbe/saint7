import { gql } from "@apollo/client";
export const CREATE_CERTIFICATE = gql`
  mutation Mutation($data: CertificateInput!) {
    createCertificate(data: $data) {
      data {
        id
      }
    }
  }
`;
export const UPDATE_CERTIFICATE = gql`
  mutation UpdateCertificate($data: CertificateInput!, $id: ID!) {
    updateCertificate(data: $data, id: $id) {
      data {
        id
      }
    }
  }
`;
export const DELETE_CERTIFICATE = gql`
  mutation ($id: ID!) {
    deleteCertificate(id: $id) {
      data {
        id
      }
    }
  }
`;
