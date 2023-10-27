import { create } from "zustand";
import { GET_ATTENDANCE } from "../graphql/queries/attendance";
// import { sanitizeResults } from "../utils/sanitizer";

const attendenceStore = create((set, get) => ({
  getLocationData: async (data) => {
    set({ loading: true });

    try {
      if (data) {
        set({ locationData: data });
      }
    } catch (error) {}
  },

  getAddressData: async (data) => {
    set({ loading: true });
    try {
      if (data) {
        set({ addressData: data });
      }
    } catch (error) {}
  },

  getAttendanceData: async (data, date) => {
    set({ loading: true });
    try {
      const response = await fetch(
        `https://saint7-office.singaporetestlab.com/api/attendances/get-attendances`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: data,
            date: date,
          }),
        }
      );

      const resData = await response.json();

      if (resData) {
        set({ attendanceData: resData });
      }
    } catch (error) {}
  },

  createAttendance: async ({ createAttendanceAction, data }) => {
    set({ loading: true });
    try {
      await createAttendanceAction({
        variables: {
          data: data,
        },
      }).then((value) => {
        // console.log("here", value?.data?.createAttendance?.data?.id);
        set({ checkInData: value?.data?.createAttendance?.data?.id });
        set({ loading: false });
      });
    } catch (error) {}
  },

  updateAttendance: async ({ updateAttendanceAction, id, attendanceData }) => {
    set({ loading: true });
    console.log(updateAttendanceAction);
    try {
      await updateAttendanceAction({
        variables: {
          id: id,
          data: attendanceData,
        },
      }).then((value) => {
        console.log("here", value);

        set({ loading: false });
      });
    } catch (error) {}
  },

  getAttendanceUser: async ({ apolloClient, where }) => {
    set({ loading: true });
    const { data, error, loading } = await apolloClient.query({
      query: GET_ATTENDANCE,
      variables: where,
      fetchPolicy: "network-only",
    });

    if (data) {
      let attendanceUser = data.attendances.data[0];

      set({ loading: false });
      set({ AttendanceUser: attendanceUser });
      return new Promise((resolve) => {
        resolve(attendanceUser);
      });
    }
  },

  fetch: false,
  loading: true,
  locationData: {},
  addressData: "",
  attendanceData: [],
  checkInData: "",
  AttendanceUser: {},
}));

export default attendenceStore;
