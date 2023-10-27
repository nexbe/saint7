import { gql } from "@apollo/client";
export const GET_ASSIGN_SHIFTS = gql`
  query ($userId: ID!, $date: Date) {
    assigneeShifts(
      filters: {
        users_permissions_user: { id: { eq: $userId } }
        dutyDate: { eq: $date }
      }
    ) {
      data {
        id

        attributes {
          dutyDate
          remark
          shift {
            data {
              attributes {
                timeRange {
                  StartTime
                  EndTime
                }
              }
            }
          }
          site {
            data {
              id
              attributes {
                name
                address
              }
            }
          }
          users_permissions_user {
            data {
              id
              attributes {
                username
                facialScanImage {
                  data {
                    attributes {
                      name
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
