import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation (
    $username: String!
    $email: String!
    $password: String!
    $role: ID
    $confirmationToken: String
  ) {
    createUsersPermissionsUser(
      data: {
        username: $username
        email: $email
        password: $password
        confirmationToken: $confirmationToken
        role: $role
      }
    ) {
      data {
        id
        attributes {
          username
          email
        }
      }
    }
  }
`;

export const GET_USER = gql`
  mutation ($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
      user {
        id
        username
        email
        role{
          id
          name
        }
      }
    }
  }
`;
