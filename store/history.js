import { create } from "zustand";
import client from "../graphql/apolloClient";
import { GET_ALL_USERS_HISTORY } from "../graphql/queries/loginHistory";

const historyStore = create((get, set) => ({
  getAllUsersHistory: async (jwt) => {
    try {
      const response = await client.query({
        query: GET_ALL_USERS_HISTORY,
        fetchPolicy: "network-only",
        context: {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      });
      return response.data.loginHistories.data
    } catch (err) {
      console.log(err);
    }
  },
}));

export default historyStore;
