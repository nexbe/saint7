import { create } from "zustand";
import showDefaultNoti from "../utils/notifications";
import { GET_CERTIFICATE_BY_ID } from "../graphql/queries/certificate";
import { sanitizeResults } from "../utils/sanitizer";

const certificatestore = create((set, get) => ({
  getAllCertificates: async ({ apolloClient, where }) => {
    set({ loading: true });
    const { data, error, loading } = await apolloClient.query({
      query: GET_CERTIFICATE_BY_ID,
      variables: where,
      fetchPolicy: "network-only",
    });
    if (data) {
      let certificateInfo = sanitizeResults(data.certificates);
      set({ loading: false });
      set({ CertificateInfo: certificateInfo });
      return new Promise((resolve) => {
        resolve(certificateInfo);
      });
    }
  },
  createCertificate: async ({ createCertificateAction, data }) => {
    set({ loading: true });
    try {
      await createCertificateAction({
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

  updateCertificate: async ({
    updateCertificateAction,
    selectedcertificateRow,
    certificateData,
    status = "update",
  }) => {
    set({ loading: true });
    try {
      await updateCertificateAction({
        variables: {
          data: certificateData,
          id: selectedcertificateRow.id,
        },
      }).then((value) => {
        set({ loading: false });
        showDefaultNoti("Certificate added successfully.", "success");
      });
    } catch (error) {
      showDefaultNoti(error.message, "error");
    }
  },

  deleteCertificate: async ({ deleteCertificateAction, certificateRow }) => {
    set({ loading: true });
    try {
      await deleteCertificateAction({
        variables: {
          id: certificateRow.id,
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
  certificateInfo: [],
}));

export default certificatestore;
