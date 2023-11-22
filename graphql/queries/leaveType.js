const { gql } = require("@apollo/client");

export const GET_LEAVE_TYPES = gql`
  query {
    leaveTypes(sort: ["createdAt:desc"], pagination: { limit: 100 }) {
      data {
        id
        attributes {
          name
          description
          createdAt
          updatedAt
          leaveInformations {
            data {
              id
            }
          }
        }
      }
    }
  }
`;
