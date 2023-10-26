import { create } from "zustand";
import client from "../graphql/apolloClient";
import { CREATE_SITE_CHECKLIST } from "../graphql/mutations/siteCheckList";
import { GET_SITE_CHECKLIST } from "../graphql/queries/siteCheckList";

const siteCheckListStore = create((set) => ({
  siteCheckLists: [],
  errorCreateCheckList: null,
  createCheckList: async (data) => {
    try {
      await client.mutate({
        mutation: CREATE_SITE_CHECKLIST,
        variables: data,
      });
    } catch (err) {
      console.log(err);
    }
  },
  fetchCheckList: async (jwt) => {
    try {
      const response = await client.query({
        query: GET_SITE_CHECKLIST,
        fetchPolicy: "network-only",
        context:{
          headers: {
            Authorization : `Bearer ${jwt}`
          }
        }
      });
      if (response) {
        set(() => ({
          siteCheckLists: response.data.siteChecklists.data,
        }));
      }
    } catch (err) {
      console.log(err);
    }
  },
}));

export default siteCheckListStore;
