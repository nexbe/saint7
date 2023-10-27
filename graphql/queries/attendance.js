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
