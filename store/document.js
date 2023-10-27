import { create } from "zustand";
import { GET_DOCUMENTS } from "../graphql/queries/document";
import { sanitizeResults } from "../utils/sanitizer";

const documentstore = create((set, get) => ({
  getAllDocuments: async ({ apolloClient, where }) => {
    set({ loading: true });
    const { data, error, loading } = await apolloClient.query({
      query: GET_DOCUMENTS,
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
    } catch (error) {}
  },

  updateDocument: async ({ updateDocumentAction, id, documentData }) => {
    set({ loading: true });
    try {
      await updateDocumentAction({
        variables: {
          data: documentData,
          id: id,
        },
      }).then((value) => {
        set({ loading: false });
      });
    } catch (error) {}
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
    } catch (error) {}
  },

  fetch: false,
  loading: true,
  documentInfo: [],
}));

export default documentstore;
