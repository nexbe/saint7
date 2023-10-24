import { create } from "zustand";
import { GET_CLAIMS, GET_CLAIM_BY_ID } from "../graphql/queries/claim";
import { sanitizeResults } from "../utils/sanitizer";

const claimstore = create((set, get) => ({
  getAllClaims: async ({ apolloClient, where }) => {
    set({ loading: true });
    const { data, error, loading } = await apolloClient.query({
      query: GET_CLAIM_BY_ID,
      variables: where,
      fetchPolicy: "network-only",
    });
    if (data) {
      let claimInfo = sanitizeResults(data.claims);
      set({ loading: false });
      set({ ClaimInfo: claimInfo });
      return new Promise((resolve) => {
        resolve(claimInfo);
      });
    }
  },
  getClaims: async ({ apolloClient, where }) => {
    set({ loading: true });
    const { data, error, loading } = await apolloClient.query({
      query: GET_CLAIMS,
      variables: where,
      fetchPolicy: "network-only",
    });
    if (data) {
      let claimInfo = sanitizeResults(data.claims);
      set({ loading: false });
      set({ ClaimInfo: claimInfo });
      return new Promise((resolve) => {
        resolve(claimInfo);
      });
    }
  },
  createClaim: async ({ createClaimAction, data }) => {
    set({ loading: true });
    try {
      await createClaimAction({
        variables: {
          data: data,
        },
      }).then((value) => {
        set({ loading: false });
      });
    } catch (error) {}
  },

  updateClaim: async ({ updateClaimAction, id, claimData }) => {
    set({ loading: true });
    try {
      await updateClaimAction({
        variables: {
          data: claimData,
          id: id,
        },
      }).then((value) => {
        set({ loading: false });
      });
    } catch (error) {}
  },

  deleteClaim: async ({ deleteClaimAction, claimRow }) => {
    set({ loading: true });
    try {
      await deleteClaimAction({
        variables: {
          id: claimRow.id,
        },
      }).then((value) => {
        set({ loading: false });
      });
    } catch (error) {}
  },

  fetch: false,
  loading: true,
  claimInfo: [],
}));

export default claimstore;
