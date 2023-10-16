import { create } from "zustand";
import { CREATE_USER, GET_USER } from "../graphql/mutations/user";
import client from "../graphql/apolloClient";
import { setCookie, parseCookies } from "nookies";
import { GET_USER_INFO } from "../graphql/queries/profile";

const cookies = parseCookies();

const useAuth = create((set, get) => ({
  user: {
    id: "",
    username: "",
    email: "",
    password: "",
    jwt: cookies.jwt || null,
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
      
        const roleRes = await client.query({
          query: GET_USER_INFO,
          fetchPolicy: "network-only",
          context:{
            headers:{
              Authorization : `Bearer ${response.data.login.jwt}`
            }
          }
        });
        // console.log("=>", roleRes);
    
      if (!response.errors && roleRes) {
        set((state) => ({
          ...state,
          user: {
            ...state.user,
            id: response.data.login.user.id,
            username: response.data.login.user.username,
            email: response.data.login.user.email,
            jwt: response.data.login.jwt,
            role: roleRes.data?.me.role,
          },
        }));
        set({ user: response.data.login.user });
        setCookie(null, "jwt", response.data.login.jwt, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
      }
      router.push("/home");
    } catch (err) {
      console.log(err);
    }
  },
  setUser: (user) => set({ user }),
}));

export default useAuth;
