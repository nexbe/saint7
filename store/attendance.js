import { create } from "zustand";
// import { sanitizeResults } from "../utils/sanitizer";

const attendenceStore = create((set, get) => ({
  getLocationData: async (data) => {
    set({ loading: true });
    console.log(data);
    try {
      if (data) {
        set({ locationData: data });
      }
    } catch (error) {}
  },

  fetch: false,
  loading: true,
  locationData: {},
}));

export default attendenceStore;
