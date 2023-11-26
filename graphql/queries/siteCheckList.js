import { gql } from "@apollo/client";

export const GET_SITE_CHECKLIST = gql`
  query {
    siteChecklists(pagination:{limit:200}){
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
                attributes{
                  url
                }
              }
            }
            sop_type {
              data {
                id
                attributes{
                  name
                }
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
