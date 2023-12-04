import { create } from "zustand";
import { GET_NOTIFICATIONS_BY_USER } from "../graphql/queries/notification";

const notiStore = create((set, get) => ({
  getNotibyUser: async ({ apolloClient, where }) => {
    set({ loading: true });
    const { data, error, loading } = await apolloClient.query({
      query: GET_NOTIFICATIONS_BY_USER,
      variables: where,
      fetchPolicy: "network-only",
    });
    if (data) {
      set({ loading: false });
      set({ notiUser: data?.notifications.data });
    }
  },

  getNotiFetchData: async (data) => {
    set({ loading: true });

    try {
      set({ notiFetchData: data });
    } catch (error) {}
  },

  updateNoti: async ({ updateNotiAction, id, notiData }) => {
    set({ loading: true });
    try {
      await updateNotiAction({
        variables: {
          data: notiData,
          id: id,
        },
      }).then((value) => {
        set({ loading: false });
      });
    } catch (error) {}
  },

  fetch: false,
  loading: true,
  notiUser: [],
  notiFetchData: false,
}));

export default notiStore;
