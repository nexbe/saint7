import { create } from "zustand";

import { GET_USERS, GET_USER_BY_ID } from "../graphql/queries/user";
import { sanitizeResults } from "../utils/sanitizer";
import { GET_ASSIGN_SHIFTS } from "../graphql/queries/assignShift";

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

  getUserById: async ({ apolloClient, where }) => {
    const { data, error, loading } = await apolloClient.query({
      query: GET_USER_BY_ID,
      variables: where,
      fetchPolicy: "network-only",
    });

    if (data) {
      let userData = data.usersPermissionsUsers.data;
      set({ UserData: userData });
      return new Promise((resolve) => {
        resolve(userData);
      });
    }
  },

  getAssignUsers: async ({ apolloClient, where }) => {
    const { data, error, loading } = await apolloClient.query({
      query: GET_ASSIGN_SHIFTS,
      variables: where,
      fetchPolicy: "network-only",
    });

    if (data) {
      let assignUsers = data.assigneeShifts.data;
      set({ AssignUsers: assignUsers });
      return new Promise((resolve) => {
        resolve(assignUsers);
      });
    }
  },

  updateUser: async ({ updateUserAction, id, userData }) => {
    try {
      await updateUserAction({
        variables: {
          data: userData,
          id: id,
        },
      }).then((value) => {});
    } catch (error) {}
  },

  getNotiData: async (data) => {
    try {
      if (data) {
        set({ notiData: data });
      }
    } catch (error) {}
  },

  fetch: false,
  loading: true,
  UserInfo: [],
  UserData: [],
  AssignUsers: [],
  notiData: {},
}));

export default userStore;
