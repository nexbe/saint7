import { create } from "zustand";
import showDefaultNoti from "../utils/notifications";
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
    } catch (error) {
      showDefaultNoti(error.message, "error");
    }
  },

  updateProfile: async ({
    updateProfileAction,
    selectedProfileRow,
    profileData,
    status = "update",
  }) => {
    set({ loading: true });
    try {
      await updateProfileAction({
        variables: {
          data: profileData,
          id: selectedProfileRow.id,
        },
      }).then((value) => {
        set({ loading: false });
      });
    } catch (error) {
      showDefaultNoti(error.message, "error");
    }
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
    } catch (error) {
      showDefaultNoti(error.message, "error");
    }
  },

  fetch: false,
  loading: true,
  ProfileInfo: [],
}));

export default profileStore;
