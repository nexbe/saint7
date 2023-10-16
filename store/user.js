import { create } from "zustand";

import { GET_USERS } from "../graphql/queries/user";
import { sanitizeResults } from "../utils/sanitizer";

const userStore = create((set, get) => ({
  getAllUsers: async ({ apolloClient, where }) => {
    set({ loading: true });
    const { data, error, loading } = await apolloClient.query({
      query: GET_USERS,
      variables: where,
      fetchPolicy: "network-only",
    });

    if (data) {
      let userInfo = sanitizeResults(data.usersPermissionsUsers);
      set({ loading: false });
      set({ UserInfo: userInfo });
      return new Promise((resolve) => {
        resolve(userInfo);
      });
    }
  },

  fetch: false,
  loading: true,
  UserInfo: [],
}));

export default userStore;
