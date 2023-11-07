import { create } from "zustand";
import client from "../graphql/apolloClient";
import { GET_PAYSLIP, GET_PAYSLIP_BY_ID } from "../graphql/queries/payslip";

const payslipStore = create((set, get) => ({
  payslips: [],
  payslipDetails:[],
  getPayslip: async () => {
    try {
      const response = await client.query({
        query: GET_PAYSLIP,
        fetchPolicy: "network-only",
      });
      if (!response.error) {
        set((state) => ({
          ...state,
          payslips: response.data.payslips,
        }));
      }
    } catch (error) {
      throw error;
    }
  },
  getPayslipByID : async (data) => {
    try {
      const response = await client.query({
        query: GET_PAYSLIP_BY_ID,
        fetchPolicy: "network-only",
        variables: data
      });
      if (!response.error) {
        set((state) => ({
          ...state,
          payslipDetails: response.data?.payslips?.data[0],
        }));
      }
    } catch (error) {
      throw error;
    }
  }
}));

export default payslipStore;