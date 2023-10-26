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
