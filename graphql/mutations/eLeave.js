import { gql } from "@apollo/client";
export const CREATE_LEAVE = gql`
  mutation Mutation($data: LeaveInformationInput!) {
    createLeaveInformation(data: $data) {
      data {
        id
      }
    }
  }
`;
export const UPDATE_LEAVE = gql`
  mutation UpdateLeave($data: LeaveInformationInput!, $id: ID!) {
    updateLeaveInformation(data: $data, id: $id) {
      data {
        id
      }
    }
  }
`;
export const DELETE_LEAVE = gql`
  mutation ($id: ID!) {
    deleteLeaveInformation(id: $id) {
      data {
        id
      }
    }
  }
`;
