import { create } from "zustand";
import { GET_NOTIFICATIONS_BY_USER } from "../graphql/queries/notification";

const notiStore = create((set, get) => ({
  getNotibyUser: async ({ apolloClient, where }) => {
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

  fetch: false,
  loading: true,
  notiUser: [],
}));

export default notiStore;
