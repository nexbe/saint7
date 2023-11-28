import { gql } from "@apollo/client";

export const UPDATE_NOTI = gql`
  mutation updateNoti($data: NotificationInput!, $id: ID!) {
    updateNotification(data: $data, id: $id) {
      data {
        id
      }
    }
  }
`;
