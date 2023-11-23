import { create } from "zustand";
import { CREATE_USER, GET_USER } from "../graphql/mutations/user";
import client from "../graphql/apolloClient";
import { setCookie, parseCookies } from "nookies";
import { GET_USER_INFO } from "../graphql/queries/profile";
import {
  GET_OTP,
  RESEND_OTP,
  RESET_PASSWORD,
  VERIFY_OTP,
} from "../graphql/mutations/password";
import { CREATE_LOGIN_HISTORY } from "../graphql/mutations/history";

const cookies = parseCookies();
const userData = cookies.user ? JSON.parse(cookies.user) : null;

const useAuth = create((set, get) => ({
  user: {
    id: userData ? userData.id : null,
    username: userData ? userData.username : null,
    email: userData ? userData.email : null,
    password: userData ? userData.password : null,
    jwt: cookies.jwt || null,
    role: userData ? userData.role : null,
  },
  otpEmail: {
    email: "",
  },
  verifiedOtpUserData: null,
  resetPasswordData: null,
  errorLogin: null,
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
  login: async (data) => {
    try {
      const response = await client.mutate({
        mutation: GET_USER,
        variables: data,
      });

      const roleRes = await client.query({
        query: GET_USER_INFO,
        fetchPolicy: "network-only",
        context: {
          headers: {
            Authorization: `Bearer ${response.data.login.jwt}`,
          },
        },
      });
      if (!response.errors) {
        await client.mutate({
          mutation: CREATE_LOGIN_HISTORY,
          variables: {
            data: {
              user: response.data.login.user.id,
              loginAt: new Date().toISOString(),
              logoutAt: null,
            },
          },
          context: {
            headers: {
              Authorization: `Bearer ${response.data.login.jwt}`,
            },
          },
        });
      }

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
        const userData = JSON.stringify(get().user);
        setCookie(null, "jwt", response.data.login.jwt, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        setCookie(null, "user", userData, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
      }
      return response; 
    } catch (err) {
      set((state) => ({
        ...state,
        errorLogin: err,
      }));
    }
  },
  setUser: (user) => set({ user }),
  getOTP: async (email, router) => {
    try {
      const response = await client.mutate({
        mutation: GET_OTP,
        variables: email,
      });
      if (!response.errors) {
        set((state) => ({
          ...state,
          otpEmail: {
            email: email,
          },
        }));
        // console.log(response.data.forgotPassword.data?.message)
        router.push("/auth/verification");
      }
    } catch (err) {
      throw new Error("Sending OTP failed");
    }
  },
  verifyOTP: async (data) => {
    try {
      const response = await client.mutate({
        mutation: VERIFY_OTP,
        variables: data,
      });
      console.log(response)
      if (!response.errors) {
        set((state) => ({
          ...state,
          verifiedOtpUserData: response.data.verifyOtp,
        }));
      }
      return response.data
    } catch (err) {}
  },
  resendOTP: async (data, router) => {
    try {
      const response = await client.mutate({
        mutation: RESEND_OTP,
        variables: data,
      });
      if (!response.errors) {
        set((state) => ({
          ...state,
          verifiedOtpUserData: response.data.verifyOtp,
        }));
        console.log("Resent OTP");
        // console.log(response.data)
        router.push("/auth/verification");
      }
    } catch (err) {
      console.log(err);
      throw new Error("resending the OTP code failed");
    }
  },
  createNewPassword: async (data) => {
    try {
      const response = await client.mutate({
        mutation: RESET_PASSWORD,
        variables: data,
      });
      if (!response.errors) {
        set((state) => ({
          ...state,
          resetPasswordData: response.data.resetPassword,
        }));
        console.log("created new Password");
        // console.log(response.data)
      }
    } catch (err) {
      console.log(err);
      throw new Error("created new password failed");
    }
  },
}));

export default useAuth;
