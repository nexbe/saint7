import { create } from "zustand";
import client from "../graphql/apolloClient";
import { CREATE_SOP_TYPE, GET_SOP_TYPES } from "../graphql/mutations/sop";

const sopStore = create((set) => ({
  sopTypes: [],
  fetchSopTypes: async (jwt) => {
    try {
      const response = await client.query({
        query: GET_SOP_TYPES,
        fetchPolicy: "network-only",
        context: {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      });
      //console.log(response);
      if (response) {
        set(() => ({
          sopTypes: response.data.sopTypes.data,
        }));
      }
    } catch (err) {
      console.log("fetching sop", err);
    }
  },
  createSopType: async (data, jwt) =>{
    try{
      await client.mutate({
        mutation:CREATE_SOP_TYPE,
        variables: data,
        context: {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      })
    }catch(err){
      console.log("creating", err);
    }
  }
}));

export default sopStore;
