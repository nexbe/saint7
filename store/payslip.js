import { create } from "zustand";
import { sanitizeResults } from "../utils/sanitizer";
import { GET_PAYSLIPS_BY_ID } from "../graphql/queries/paySlip";

const payslipStore = create((set, get) => ({
  getPayslipById: async ({ apolloClient, where }) => {
    const { data, error, loading } = await apolloClient.query({
      query: GET_PAYSLIPS_BY_ID,
      variables: where,
      fetchPolicy: "network-only",
    });

    if (data) {
      let payData = data.payslips.data;
      set({ PayData: payData });
      return new Promise((resolve) => {
        resolve(payData);
      });
    }
  },

  getPayInfo: async (data) => {
    try {
      if (data) {
        set({ payInfo: data });
      }
    } catch (error) {}
  },

  fetch: false,
  loading: true,
  PayData: [],
  payInfo: {},
}));

export default payslipStore;
