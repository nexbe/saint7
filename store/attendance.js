import { create } from "zustand";
// import { sanitizeResults } from "../utils/sanitizer";

const attendenceStore = create((set, get) => ({
  getLocationData: async (data) => {
    set({ loading: true });

    try {
      if (data) {
        set({ locationData: data });
      }
    } catch (error) {}
  },

  getAddressData: async (data) => {
    set({ loading: true });
    try {
      if (data) {
        set({ addressData: data });
      }
    } catch (error) {}
  },

  fetch: false,
  loading: true,
  locationData: {},
  addressData: "",
}));

export default attendenceStore;
