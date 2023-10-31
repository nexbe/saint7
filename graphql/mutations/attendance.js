import { gql } from "@apollo/client";
export const CREATE_ATTENDANCE = gql`
  mutation ($data: AttendanceInput!) {
    createAttendance(data: $data) {
      data {
        id
      }
    }
  }
`;

export const UPDATE_ATTENDANCE = gql`
  mutation UpdateAttendance($data: AttendanceInput!, $id: ID!) {
    updateAttendance(data: $data, id: $id) {
      data {
        id
      }
    }
  }
`;
