import { create } from "zustand";

import {
  GET_USERS,
  GET_USER_BY_ID,
  GET_USER_BY_ROLE,
} from "../graphql/queries/user";
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
    set({ loading: true });
    const { data, error, loading } = await apolloClient.query({
      query: GET_USER_BY_ID,
      variables: where,
      fetchPolicy: "network-only",
    });

    if (data) {
      let userData = data.usersPermissionsUsers.data;
      set({ loading: false });
      set({ UserData: userData });
      return new Promise((resolve) => {
        resolve(userData);
      });
    }
  },

  getuserByRole: async ({ apolloClient, where }) => {
    set({ loading: true });
    const { data, error, loading } = await apolloClient.query({
      query: GET_USER_BY_ROLE,
      fetchPolicy: "network-only",
    });

    if (data) {
      let userData = data.usersPermissionsUsers.data;
      set({ loading: false });
      set({ roleUserData: userData });
      return new Promise((resolve) => {
        resolve(userData);
      });
    }
  },

  getAssignUsers: async ({ apolloClient, where }) => {
    set({ loading: true });
    const { data, error, loading } = await apolloClient.query({
      query: GET_ASSIGN_SHIFTS,
      variables: where,
      fetchPolicy: "network-only",
    });

    if (data) {
      let assignUsers = data.assigneeShifts.data;
      set({ loading: false });
      set({ AssignUsers: assignUsers });
      return new Promise((resolve) => {
        resolve(assignUsers);
      });
    }
  },

  updateUser: async ({ updateUserAction, id, userData }) => {
    set({ loading: true });
    try {
      await updateUserAction({
        variables: {
          data: userData,
          id: id,
        },
      }).then((value) => {
        set({ loading: false });
      });
    } catch (error) {}
  },

  getNotiData: async (data) => {
    try {
      if (data) {
        set({ notiData: data });
      }
    } catch (error) {}
  },

  getPaySlipData: async (data) => {
    try {
      if (data) {
        set({ payUserId: data });
      }
    } catch (error) {}
  },

  fetch: false,
  loading: true,
  UserInfo: [],
  UserData: [],
  AssignUsers: [],
  notiData: {},
  roleUserData: [],
  payUserId: null,
}));

export default userStore;
