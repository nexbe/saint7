import { create } from "zustand";
import {
  GET_LEAVE_BY_ID,
  GET_LEAVES,
  GET_LEAVES_BY_CHOSEN_FIELDS,
  GET_LEAVES_BY_REQUEST,
} from "../graphql/queries/eLeave";
import { sanitizeResults } from "../utils/sanitizer";

const leavestore = create((set, get) => ({
  getAllLeaves: async ({ apolloClient, where }) => {
    set({ loading: true });
    const { data, error } = await apolloClient.query({
      query: GET_LEAVE_BY_ID,
      variables: where,
      fetchPolicy: "network-only",
    });
    if (data) {
      let leaveInfo = sanitizeResults(data.leaveInformations);
      set({ loading: false });
      set({ LeaveInfo: leaveInfo });
      return new Promise((resolve) => {
        resolve(leaveInfo);
      });
    }
  },
  getLeaves: async ({ apolloClient, where }) => {
    set({ loading: true });
    const { data, error } = await apolloClient.query({
      query: GET_LEAVES,
      variables: where,
      fetchPolicy: "network-only",
    });
    if (data) {
      let leaveInfo = sanitizeResults(data.leaveInformations);
      set({ loading: false });
      set({ LeaveInfo: leaveInfo });
      return new Promise((resolve) => {
        resolve(leaveInfo);
      });
    }
  },
  getLeavesByRequest: async ({ apolloClient, where }) => {
    set({ loading: true });
    const { data, error } = await apolloClient.query({
      query: GET_LEAVES_BY_REQUEST,
      variables: where,
      fetchPolicy: "network-only",
    });
    if (data) {
      let leaveInfo = sanitizeResults(data.leaveInformations);
      set({ loading: false });
      set({ LeaveInfo: leaveInfo });
      return new Promise((resolve) => {
        resolve(leaveInfo);
      });
    }
  },
  getLeavesByChosenFields: async ({ apolloClient, where }) => {
    set({ loading: true });
    const { data, error } = await apolloClient.query({
      query: GET_LEAVES_BY_CHOSEN_FIELDS,
      variables: where,
      fetchPolicy: "network-only",
    });
    if (data) {
      let leaveInfo = sanitizeResults(data.leaveInformations);
      set({ loading: false });
      set({ LeaveInfo: leaveInfo });
      return new Promise((resolve) => {
        resolve(leaveInfo);
      });
    }
  },
  createLeave: async ({ createLeaveAction, data }) => {
    set({ loading: true });
    try {
      await createLeaveAction({
        variables: {
          data: data,
        },
      }).then((value) => {
        set({ loading: false });
      });
    } catch (error) {}
  },

  updateLeave: async ({ updateLeaveAction, id, leaveData }) => {
    try {
      await updateLeaveAction({
        variables: {
          data: leaveData,
          id: id,
        },
      }).then((value) => {});
    } catch (error) {}
  },

  deleteLeave: async ({ deleteLeaveAction, leaveRow }) => {
    try {
      await deleteLeaveAction({
        variables: {
          id: leaveRow.id,
        },
      }).then((value) => {});
    } catch (error) {}
  },

  fetch: false,
  leaveInfo: [],
  loading: true,
}));

export default leavestore;
