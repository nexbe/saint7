import { gql } from "@apollo/client";

export const CREATE_SITE_CHECKLIST = gql`
  mutation ($data: SiteChecklistInput!) {
    createSiteChecklist(data: $data) {
      data {
        id
      }
    }
  }
`;

export const DELETE_SITE_CHECKLIST = gql`
  mutation ($id: ID!) {
    deleteSiteChecklist(id: $id) {
      data {
        id
      }
    }
  }
`;
