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
                checkpoints {
                  UUID
                  Name
                }
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

export const GET_ALL_ASSIGN_SHIFTS = gql`
  query ($startDate: Date, $endDate: Date) {
    assigneeShifts(
      pagination: { limit: 100 }
      sort: ["dutyDate:desc"]
      filters: { dutyDate: { between: [$startDate, $endDate] } }
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
          attendances {
            data {
              attributes {
                status
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
