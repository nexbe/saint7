/** @jsxImportSource @emotion/react */
import Layout from "../../components/layout/Layout";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useApolloClient } from "@apollo/client";
import dayjs from "dayjs";

import NotiIcon from "/public/icons/notiIcon";
import AttendanceIcon from "/public/icons/attendanceIcon";
import ELeaveIcon from "/public/icons/eLeaveIcon";
import AnnouncementIcon from "/public/icons/announcementIcon";
import PayslipIcon from "/public/icons/payslipIcon";
import ClaimsIcon from "/public/icons/claimsIcon";
import UserIcon from "/public/icons/userIcon";
import DocumentIcon from "/public/icons/documentIcon";
import profileStore from "../../store/profile";
import userStore from "../../store/auth";
import Map from "../../components/Map";
import attendenceStore from "../../store/attendance";
import { useState } from "react";
import HRMuserIcon from "../../public/icons/hrmUserIcon";

const Home = () => {
  const router = useRouter();
  const apolloClient = useApolloClient();
  const {
    getAllProfiles,
    ProfileInfo: profileInfo,
    loading,
  } = profileStore((state) => state);

  const { user } = userStore((state) => state);

  const [userData, setUserData] = useState();

  useEffect(() => {
    setUserData(user);
  }, []);

  useEffect(() => {
    getAllProfiles({
      apolloClient,
      where: { userId: user.id },
    });
  }, [user]);

  return (
    <Layout>
      <div css={styles.wrapper}>
        <div css={styles.headerContainer}>
          <div>
            <div className="d-flex" css={styles.profileInfo}>
              <label>
                <img
                  src={
                    profileInfo[0]?.photo?.url
                      ? `${process.env.NEXT_PUBLIC_APP_URL}${profileInfo[0]?.photo.url}`
                      : "images/defaultImage.jpg"
                  }
                />
              </label>
              <div className="d-flex" style={{ flexDirection: "column" }}>
                <span css={styles.welcomeText}>Welcome !</span>
                <span className="header-text">{userData?.username}</span>
              </div>
            </div>
            <div css={styles.timeText}>
              {dayjs(new Date()).format(" dddd, DD MMMM YYYY")}
            </div>
          </div>
          <div
            onClick={() => router.push("/notifications")}
            style={{ cursor: "pointer" }}
          >
            <NotiIcon />
          </div>
        </div>

        <div css={styles.bodyContainer}>
          <h1 css={styles.headerHrm}>HRM</h1>
          <div css={styles.buttonContainer}>
            <div css={styles.formFlexDiv}>
              <div css={styles.formFlexChildDiv}>
                <button
                  onClick={() => {
                    router.push({
                      pathname:
                        user?.role?.name === "Admin" ||
                        user?.role?.name === "Manager"
                          ? "/attendance/Manager"
                          : "/attendance",
                    });
                  }}
                >
                  <AttendanceIcon />
                  Attendance
                </button>
              </div>

              <div css={styles.formFlexChildDiv}>
                <button
                  onClick={() => {
                    router.push({
                      pathname:
                      user?.role?.name === "Admin"
                      ? "/payslip/Admin"
                      : user?.role?.name === "Manager"
                        ? "/payslip/Manager"
                        : "/payslip"           
                    });
                  }}
                >
                  <PayslipIcon />
                  Payslip
                </button>
              </div>
              <div css={styles.formFlexChildDiv}>
                <button onClick={() => router.push("/documents")}>
                  <DocumentIcon />
                  Documents
                </button>
              </div>

              {user?.role?.name.toLowerCase() != "guard" && (
                <div css={styles.formFlexChildDiv}>
                  <button onClick={() => router.push("/team")}>
                    <HRMuserIcon />
                    Team
                  </button>
                </div>
              )}
            </div>
            <div css={styles.formFlexDiv}>
              <div css={styles.formFlexChildDiv}>
                <button onClick={() => router.push("/eLeave")}>
                  <ELeaveIcon />
                  e-Leave
                </button>
              </div>
              <div css={styles.formFlexChildDiv}>
                <button
                  onClick={() =>
                    router.push(
                      user?.role?.name === "Admin"
                        ? "/claims/claimApproval"
                        : user?.role?.name === "Manager"
                        ? "/claims/Manager"
                        : "/claims"
                    )
                  }
                >
                  <ClaimsIcon />
                  Claims
                </button>
              </div>
              <div css={styles.formFlexChildDiv}>
                <button
                  onClick={() => {
                    router.push({
                      pathname: "/announcement",
                    });
                  }}
                >
                  <AnnouncementIcon />
                  Annoucement
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

const styles = {
  wrapper: css`
    flex: 1 1 auto;
    height: 0px;
    display: flex;
    flex-direction: column;
    margin: 0;
    background: var(--background);
  `,
  headerContainer: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    font-size: 20px;
    font-weight: 700;
    padding: 20px;
    color: var(--white);
    background: var(--primary);
    line-height: 20px;
    height: 90px;
  `,
  profileInfo: css`
    padding-top: 5px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 40px;
    }
    span {
      padding-left: 15px;
    }
  `,
  welcomeText: css`
    font-size: 12px;
    font-weight: 500;
  `,
  timeText: css`
    font-size: 14px;
    padding-top: 5px;
  `,

  headerHrm: css`
    color: var(-primary);
    font-family: Inter;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  `,

  bodyContainer: css`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    min-height: 200px;
    justify-content: center;
    margin: 10px;
    font-family: Inter;
    font-style: normal;

    ::-webkit-scrollbar {
      width: 2px;
      background-color: transparent;
    }
    .bodyContainer::-webkit-scrollbar-thumb {
      border-radius: 2px;
      background-color: var(--font-gray);
    }
    @media (max-width: 1400px) {
      margin: 20px;
    }
    @media (min-width: 1400px) {
      margin: 30px;
    }
  `,

  buttonContainer: css`
    width: 100%;
    height: 100%;
    padding: 10px 0;
    display: flex;
    flex-direction: row;
    flex: 1 1 auto;
    button {
      color: var(--primary);
      text-align: center;
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      padding: 15px;
      border-radius: 10px;
      border: none;
      background: var(--white);
      display: flex;
      flex-direction: row;

      align-items: center;
      height: 70px;
      gap: 5px;
      box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.08);
      @media (max-width: 1400px) {
        width: 100%;
      }
      @media (min-width: 1400px) {
        width: 100%;
      }
    }
  `,
  formFlexDiv: css`
    display: flex;
    justify-content: fit-content;
    width: 100%;
    flex-direction: column;
    margin: 0 5px;
    @media (max-width: 1400px) {
      gap: 13px;
    }
    @media (min-width: 1400px) {
      gap: 30px;
    }
  `,
  formFlexChildDiv: css`
    width: 100%;
    display: flex;
    margin-bottom: 10px;
    flex-direction: row;
    @media (max-width: 1400px) {
      width: 100%;
    }
    @media (max-width: 1200px) {
      width: 100%;
    }
    @media (max-width: 992px) {
      width: 100%;
    }
  `,
};
