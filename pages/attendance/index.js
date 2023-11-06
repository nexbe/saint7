/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";
import { css } from "@emotion/react";
import CheckInOut from "../../components/attendence/CheckInOut";
import History from "../../components/attendence/History";
import attendenceStore from "../../store/attendance";
import { setCookie, parseCookies } from "nookies";
import Profile from "../../components/attendence/Profile";
import userStore from "../../store/user";
import { useApolloClient } from "@apollo/client";
import moment from "moment";
import GlobalNotiBox from "../../components/notification/GlobalNotiBox";

const Index = () => {
  const {
    locationData: locationData,

    getAttendanceData,
  } = attendenceStore((state) => state);
  const { getAssignUsers, AssignUsers, notiData } = userStore((state) => state);
  const apolloClient = useApolloClient();

  const cookies = parseCookies();
  const attendanceId = cookies.attendance
    ? JSON.parse(cookies.attendance)
    : null;
  const userData = cookies.user ? JSON.parse(cookies.user) : null;

  const [activeComponent, setActiveComponent] = useState("check");

  useEffect(() => {
    getAttendanceData(userData?.id, moment().format("YYYY-MM-DD"));
  }, []);

  useEffect(() => {
    getAssignUsers({
      apolloClient,
      where: {
        userId: userData.id,
        date: moment(new Date()).format("YYYY-MM-DD"),
      },
    });
  }, []);

  return (
    <Layout className="container ">
      <HeaderNoti title={"Attendance"} href={"/home"} />
      <div style={{ position: "relative", margin: "2px 10px" }}>
        <GlobalNotiBox
          message={notiData?.message}
          belongTo={notiData?.belongTo}
          timeout={5000}
          action={notiData?.action}
          label={notiData?.label}
        />
      </div>
      <div css={styles.tabComponent}>
        <div
          css={activeComponent === "check" ? styles.activeTab : styles.tabpane}
          onClick={() => setActiveComponent("check")}
        >
          Check In/Out
        </div>
        <div
          css={
            activeComponent === "history" ? styles.activeTab : styles.tabpane
          }
          onClick={() => setActiveComponent("history")}
        >
          Attendance History
        </div>
      </div>
      <div css={styles.container}>
        {activeComponent === "check" ? (
          attendanceId ? (
            <Profile />
          ) : (
            <CheckInOut />
          )
        ) : (
          <History />
        )}
      </div>
    </Layout>
  );
};

export default Index;

const styles = {
  tabpane: css`
    display: flex;
    margin: 10px;
    flex-direction: row;
    color: var(--darker-gray);
    gap: 40px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
  `,
  tabComponent: css`
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    border-bottom: 0.4px solid #2f4858;
    background: #e3f3ff;
    padding: 9px;
  `,
  activeTab: css`
    border-radius: 5px;
    color: #fff;
    padding: 9px 28px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    background: var(--primary);
  `,
  container: css`
    max-height: 70vh;
    overflow-y: scroll;
  `,
};
