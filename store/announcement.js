import { create } from "zustand";
import client from "../graphql/apolloClient";
import { GET_ANNOUNCEMENTS } from "../graphql/queries/announcement";
import {
  CREATE_ANNOUNCEMENT,
  DELETE_ANNOUNCEMENT,
  UPDATE_ANNOUNCEMENT,
} from "../graphql/mutations/announcement";

const useAnnouncement = create((set) => ({
  announcements: [],
  errorCreateAnnouncement:null,
  errorUpdateAnnouncement:null,
  fetchAnnouncements: async () => {
    try {
      const response = await client.query({
        query: GET_ANNOUNCEMENTS,
        fetchPolicy: "network-only",
      });
      if (!response.error) {
        const announcementsWithReadStatus =
          response.data?.announcements?.data?.map((announcements) => ({
            ...announcements,
            isRead: false,
          }));
        set(() => ({
          announcements: announcementsWithReadStatus,
        }));
      }
    } catch (err) {
      console.log(err);
    }
  },
  markAnnouncementAsRead: (id) => {
    set((state) => ({
      announcements: state.announcements?.map((announcement) =>
        announcement.id === id
          ? { ...announcement, isRead: true }
          : announcement
      ),
    }));
  },
  createAnnouncement: async (data) => {
    try {
      const response = await client.mutate({
        mutation: CREATE_ANNOUNCEMENT,
        variables: data,
      });
    } catch (err) {
        set((state) => ({
          ...state,
          errorCreateAnnouncement: err
        }))
      console.log("creating announcement", err);
    }
  },
  updateAnnouncement: async (data) => {
    try {
      const response = await client.mutate({
        mutation: UPDATE_ANNOUNCEMENT,
        variables: data,
      });
    } catch (err) {
      set((state) => ({
        ...state,
        errorUpdateAnnouncement: err
      }))
      console.log("update", err);
    }
  },
  deleteAnnouncement: async (id) => {
    try {
      const response = await client.mutate({
        mutation: DELETE_ANNOUNCEMENT,
        variables: {
          id: id,
        },
      });
    } catch (err) {
      console.log("delete", err);
    }
  },
}));

export default useAnnouncement;
