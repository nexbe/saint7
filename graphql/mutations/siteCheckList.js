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

export const UPDATE_SITE_CHECKLIST = gql`
  mutation ($data: SiteChecklistInput!, $id: ID!) {
    updateSiteChecklist(data: $data, id: $id) {
      data {
        id
      }
    }
  }
`;

export const FILTER_CHECKLIST = gql`
  query ($input: IDFilterInput) {
    siteChecklists(filters: { id: $input }) {
      data {
        id
        attributes {
          title
          location
          dateVisited
          timeVisited
          visitedBy
          sop {
            id
            Name
            Attachments {
              data {
                id
              }
            }
            sop_type {
              data {
                id
              }
            }
          }
          equipment {
            id
            Name
            Remarks
            Attachments {
              data {
                id
              }
            }
          }
          suggestions
          guardOnDuty
          remarks
          reasonForProperUniform
          actionTakenForWelfare
          actionTakenForProperUniform
          createdUser {
            data {
              id
              attributes {
                username
              }
            }
          }
          createdAt
        }
      }
    }
  }
`;
