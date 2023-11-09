import { create } from "zustand";
import client from "../graphql/apolloClient";
import {
  GET_PAYSLIP,
  GET_PAYSLIP_BY_ID,
  GET_PAYSLIPS_BY_USER,
} from "../graphql/queries/payslip";
import axios from "axios";

const payslipStore = create((set, get) => ({
  payslips: [],
  payslipDetails: [],

  fetch: false,
  loading: true,
  PayData: [],
  payInfo: {},

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
  getPayslipByID: async (data) => {
    try {
      const response = await client.query({
        query: GET_PAYSLIP_BY_ID,
        fetchPolicy: "network-only",
        variables: data,
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
  },

  getPayslipById: async ({ apolloClient, where }) => {
    const { data, error, loading } = await apolloClient.query({
      query: GET_PAYSLIPS_BY_USER,
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
  getPayslipByEmail: async (id) => {
    try{
      const response = await axios.get(`https://saint7-office.singaporetestlab.com/api/payslip-mail/${id}`)
      return response.data;
    }catch(error){
      throw error;
    }
  } 
}));

export default payslipStore;
