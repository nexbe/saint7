import { create } from "zustand";
import client from "../graphql/apolloClient";
import { GET_SITES } from "../graphql/queries/sites";

const siteStore = create((set, get) => ({
  sites: [],
  getSites: async () => {
    try {
      const response = await client.query({
        query: GET_SITES,
        fetchPolicy: "network-only",
      });
      if (response) {
        set(() => ({
          sites: response.data.sites.data,
        }));
      }
    } catch (err) {
      console.log(err);
    }
  },
}));
export default siteStore;
