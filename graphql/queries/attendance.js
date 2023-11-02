import { gql } from "@apollo/client";
export const GET_ATTENDANCE = gql`
  query ($id: ID!) {
    attendances(filters: { id: { eq: $id } }) {
      data {
        id
        attributes {
          checkInTime
          checkOutTIme
          address
          date
          assignee_shift {
            data {
              attributes {
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
                users_permissions_user {
                  data {
                    id
                    attributes {
                      username
                    }
                  }
                }
                site {
                  data {
                    attributes {
                      checkpoints {
                        Name
                        Location {
                          Name
                        }
                      }

                      name
                      location {
                        Lat
                        Lng
                        Name
                      }
                      description
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

export const GET_ALL_ATTENDANCE = gql`
  query ($startDate: Date, $endDate: Date) {
    attendances(
      pagination: { limit: 100 }
      sort: ["date:desc"]
      filters: {
        date: {
          between: [$startDate, $endDate] # Start and end dates
        }
      }
    ) {
      data {
        id
        attributes {
          checkInTime
          checkOutTIme
          address
          date
          status
          assignee_shift {
            data {
              attributes {
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
                users_permissions_user {
                  data {
                    id
                    attributes {
                      username
                      facialScanImage {
                        data {
                          attributes {
                            url
                          }
                        }
                      }
                    }
                  }
                }
                site {
                  data {
                    attributes {
                      checkpoints {
                        Name
                        Location {
                          Name
                        }
                      }

                      name
                      location {
                        Lat
                        Lng
                        Name
                      }
                      description
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
