import { create } from "zustand";
import client from "../graphql/apolloClient";
import { GET_SHIFTS } from "../graphql/queries/shift";

const shiftStore = create((set, get) => ({
  shifts: [],
  getShifts: async () => {
    try {
      const response = await client.query({
        query: GET_SHIFTS,
        fetchPolicy: "network-only",
      });
      if (response) {
        set(() => ({
          shifts: response.data.shifts.data,
        }));
      }
    } catch (err) {
      console.log(err);
    }
  },
}));
export default shiftStore;