import { gql } from "@apollo/client";

export const CREATE_ANNOUNCEMENT = gql`
  mutation ($data: AnnouncementInput!) {
    createAnnouncement(data: $data) {
      data {
        id
      }
    }
  }
`;

export const UPDATE_ANNOUNCEMENT = gql`
  mutation ($data: AnnouncementInput!, $id: ID!) {
    updateAnnouncement(data: $data, id: $id) {
      data {
        id
      }
    }
  }
`;

export const DELETE_ANNOUNCEMENT = gql`
  mutation ($id: ID!) {
    deleteAnnouncement(id: $id) {
      data {
        id
      }
    }
  }
`;