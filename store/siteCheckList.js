import { create } from "zustand";
import client from "../graphql/apolloClient";
import { CREATE_SITE_CHECKLIST, DELETE_SITE_CHECKLIST, FILTER_CHECKLIST, UPDATE_SITE_CHECKLIST } from "../graphql/mutations/siteCheckList";
import { GET_SITE_CHECKLIST } from "../graphql/queries/siteCheckList";

const siteCheckListStore = create((set) => ({
  siteCheckLists: [],
  filterCheckList:null,
  errorCreateCheckList: null,
  errorDeleteCheckLists: null,
  createCheckList: async (data,jwt) => {
    try {
      await client.mutate({
        mutation: CREATE_SITE_CHECKLIST,
        variables: data,
        context:{
          headers: {
            Authorization : `Bearer ${jwt}`
          }
        },
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
  deleteCheckLists: async(id,jwt) => {
    try {
      const response = await client.mutate({
        mutation: DELETE_SITE_CHECKLIST,
        context:{
          headers: {
            Authorization : `Bearer ${jwt}`
          }
        },
        variables: {
          id: id,
        },
      });
      console.log(response)
    } catch (err) {
      set((state) => ({
        ...state,
        errorDeleteCheckLists: err
      }))
      console.log("delete", err);
    }
  },
  updateCheckLists : async (data, jwt) =>{
    try { 
      await client.mutate({
        mutation: UPDATE_SITE_CHECKLIST,
        variables: data,
        context:{
          headers: {
            Authorization : `Bearer ${jwt}`
          }
        },
      });
    } catch (err) {
      console.log(err);
    }
  },
  fetchFilteredCheckList : async (data, jwt) => {
    try {
      const response = await client.query({
        query: FILTER_CHECKLIST,
        fetchPolicy: "network-only",
        variables:data,
        context:{
          headers: {
            Authorization : `Bearer ${jwt}`
          }
        }
      });
      if (response) {
        set(() => ({
          filterCheckList: response.data.siteChecklists.data,
        }));
      }
    } catch (err) {
      console.log(err);
    }
  }
}));

export default siteCheckListStore;
