import { create } from "zustand";
import { GET_PROFILE_BY_ID } from "../graphql/queries/profile";
import { sanitizeResults } from "../utils/sanitizer";

const profileStore = create((set, get) => ({
  getAllProfiles: async ({ apolloClient, where }) => {
    set({ loading: true });
    const { data, error, loading } = await apolloClient.query({
      query: GET_PROFILE_BY_ID,
      variables: where,
      fetchPolicy: "network-only",
    });
    if (data) {
      let profileInfo = sanitizeResults(data.profiles);
      set({ loading: false });
      set({ ProfileInfo: profileInfo });
      return new Promise((resolve) => {
        resolve(profileInfo);
      });
    }
  },
  createProfile: async ({ createProfileAction, data }) => {
    set({ loading: true });
    try {
      await createProfileAction({
        variables: {
          data: data,
        },
      }).then((value) => {
        set({ loading: false });
      });
    } catch (error) {}
  },

  updateProfile: async ({ updateProfileAction, id, profileData }) => {
    set({ loading: true });
    try {
      await updateProfileAction({
        variables: {
          data: profileData,
          id: id,
        },
      }).then((value) => {
        set({ loading: false });
      });
    } catch (error) {}
  },

  deleteProfile: async ({ deleteProfileAction, profileRow }) => {
    set({ loading: true });
    try {
      await deleteProfileAction({
        variables: {
          id: profileRow.id,
        },
      }).then((value) => {
        set({ loading: false });
      });
    } catch (error) {}
  },

  fetch: false,
  loading: true,
  ProfileInfo: [],
}));

export default profileStore;
