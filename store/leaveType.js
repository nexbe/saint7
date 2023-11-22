import { create } from "zustand";
import { GET_LEAVE_TYPES } from "../graphql/queries/leaveType";
import { sanitizeResults } from "../utils/sanitizer";

const leaveTypestore = create((set, get) => ({
  getAllLeaveTypes: async ({ apolloClient, where }) => {
    const { data, error } = await apolloClient.query({
      query: GET_LEAVE_TYPES,
      fetchPolicy: "network-only",
    });
    if (data) {
      let leaveTypeInfo = sanitizeResults(data.leaveTypes);
      set({ LeaveTypeInfo: leaveTypeInfo });
      return new Promise((resolve) => {
        resolve(leaveTypeInfo);
      });
    }
  },
  createLeaveType: async ({ createLeaveTypeAction, data }) => {
    try {
      await createLeaveTypeAction({
        variables: {
          data: data,
        },
      }).then((value) => {});
    } catch (error) {}
  },

  fetch: false,
  leaveTypeInfo: [],
}));

export default leaveTypestore;
