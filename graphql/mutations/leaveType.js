import { gql } from "@apollo/client";
export const CREATE_LEAVE_TYPE = gql`
  mutation Mutation($data: LeaveTypeInput!) {
    createLeaveType(data: $data) {
      data {
        id
      }
    }
  }
`;
