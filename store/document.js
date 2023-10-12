import { create } from "zustand";
import showDefaultNoti from "../utils/notifications";
import { GET_DOCUMENT_BY_ID } from "../graphql/queries/document";
import { sanitizeResults } from "../utils/sanitizer";

const documentstore = create((set, get) => ({
  getAllDocuments: async ({ apolloClient, where }) => {
    set({ loading: true });
    const { data, error, loading } = await apolloClient.query({
      query: GET_DOCUMENT_BY_ID,
      variables: where,
      fetchPolicy: "network-only",
    });
    if (data) {
      let documentInfo = sanitizeResults(data.documents);
      set({ loading: false });
      set({ DocumentInfo: documentInfo });
      return new Promise((resolve) => {
        resolve(documentInfo);
      });
    }
  },
  createDocument: async ({ createDocumentAction, data }) => {
    set({ loading: true });
    try {
      await createDocumentAction({
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

  updateDocument: async ({
    updateDocumentAction,
    selectedDocumentRow,
    documentData,
    status = "update",
  }) => {
    set({ loading: true });
    try {
      await updateDocumentAction({
        variables: {
          data: documentData,
          id: selectedDocumentRow.id,
        },
      }).then((value) => {
        set({ loading: false });
      });
    } catch (error) {
      showDefaultNoti(error.message, "error");
    }
  },

  deleteDocument: async ({ deleteDocumentAction, documentRow }) => {
    set({ loading: true });
    try {
      await deleteDocumentAction({
        variables: {
          id: documentRow.id,
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
  documentInfo: [],
}));

export default documentstore;
