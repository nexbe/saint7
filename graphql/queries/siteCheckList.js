import { gql } from "@apollo/client";

export const GET_SITE_CHECKLIST = gql`
  query {
    siteChecklists{
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