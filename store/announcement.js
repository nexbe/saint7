import { create } from "zustand";
import client from "../graphql/apolloClient";
import { GET_ANNOUNCEMENTS } from "../graphql/queries/announcement";

const useAnnouncement = create((set) => ({
  announcements: [],
  fetchAnnouncements: async () => {
    try {
      const response = await client.query({
        query: GET_ANNOUNCEMENTS,
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
}));

export default useAnnouncement;
