import { create } from "zustand";
import { GET_LEAVE_BY_ID, GET_LEAVES } from "../graphql/queries/eLeave";
import { sanitizeResults } from "../utils/sanitizer";

const leavestore = create((set, get) => ({
  getAllLeaves: async ({ apolloClient, where }) => {
    const { data, error } = await apolloClient.query({
      query: GET_LEAVE_BY_ID,
      variables: where,
      fetchPolicy: "network-only",
    });
    if (data) {
      let leaveInfo = sanitizeResults(data.leaveInformations);
      set({ LeaveInfo: leaveInfo });
      return new Promise((resolve) => {
        resolve(leaveInfo);
      });
    }
  },
  getLeaves: async ({ apolloClient, where }) => {
    const { data, error } = await apolloClient.query({
      query: GET_LEAVES,
      variables: where,
      fetchPolicy: "network-only",
    });
    if (data) {
      let leaveInfo = sanitizeResults(data.leaveInformations);
      set({ LeaveInfo: leaveInfo });
      return new Promise((resolve) => {
        resolve(leaveInfo);
      });
    }
  },
  createLeave: async ({ createLeaveAction, data }) => {
    try {
      await createLeaveAction({
        variables: {
          data: data,
        },
      }).then((value) => {});
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
}));

export default leavestore;
