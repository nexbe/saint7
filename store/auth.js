import { create } from "zustand";
import { CREATE_USER, GET_USER } from "../graphql/mutations/user";
import client from "../graphql/apolloClient";

const useAuth = create((set, get) => ({
  user: {
    id: "",
    username: "",
    email: "",
    password: "",
    jwt: null,
    role: "",
  },
  register: async (data, router) => {
    try {
      const response = await client.mutate({
        mutation: CREATE_USER,
        variables: data,
      });
      if (!response.errors) {
        set((state) => ({
          ...state,
          user: {
            ...state.user,
            id: response.data.id,
            username: response.data.username,
            email: response.data.email,
            password: response.data.password,
          },
        }));
        router.push("/home");
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.log(error);
    }
  },
  login: async (data, router) => {
    try {
      const response = await client.mutate({
        mutation: GET_USER,
        variables: data,
      });
      console.log("=>", response);
      if (!response.errors) {
        set((state) => ({
          ...state,
          user: {
            ...state.user,
            id: response.data.login.user.id,
            username: response.data.login.user.username,
            email: response.data.login.user.email,
            jwt: response.data.login.jwt,
            role: response.data.login.user.role,
          },
        }));
        set({ user: response.data.login.user });
      }
      router.push("/home");
    } catch (err) {
      console.log(err);
    }
  },
  setUser: (user) => set({ user }),
}));

export default useAuth;
