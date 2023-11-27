const { gql } = require("@apollo/client");

export const GET_NOTIFICATIONS_BY_USER = gql`
  query ($userId: ID!) {
    notifications(filters: { user: { id: { eq: $userId } } }) {
      data {
        id
        attributes {
          time
          status
          location

          attendance {
            data {
              id
              attributes {
                checkInTime
                address
                date
                checkOutTIme
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
                    }
                  }
                }
              }
            }
          }
          user {
            data {
              id
              attributes {
                username
                profile {
                  data {
                    attributes {
                      photo {
                        data {
                          id
                          attributes {
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
      }
    }
  }
`;
