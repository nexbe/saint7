const { gql } = require("@apollo/client");

export const GET_SHIFTS = gql`
  query {
    shifts {
      data {
        id
        attributes {
          title
          assignee_shifts {
            data {
              id
            }
          }
          repeatDays
          timeRange {
            id
            StartTime
            EndTime
          }
          site {
            data {
              id
              attributes {
                name
                description
                address
              }
            }
          }
        }
      }
    }
  }
`;
