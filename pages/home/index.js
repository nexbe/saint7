/** @jsxImportSource @emotion/react */
import Layout from "../../components/layout/Layout";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useApolloClient } from "@apollo/client";
import dayjs from "dayjs";

import NotiIcon from "/public/icons/notiIcon";
import MapPineLineIcon from "/public/icons/mapPineLineIcon";
import CheckInIcon from "/public/icons/checkInIcon";
import ProgressIcon from "/public/icons/progressIcon";
import AttendanceIcon from "/public/icons/attendanceIcon";
import ELeaveIcon from "/public/icons/eLeaveIcon";
import PayslipIcon from "/public/icons/payslipIcon";
import ClaimsIcon from "/public/icons/claimsIcon";
import UserIcon from "/public/icons/userIcon";
import DocumentIcon from "/public/icons/documentIcon";
import profileStore from "../../store/profile";
import userStore from "../../store/auth";
import Map from "../../components/Map";

const Home = () => {
  const router = useRouter();
  const apolloClient = useApolloClient();
  const {
    getAllProfiles,
    ProfileInfo: profileInfo,
    loading,
  } = profileStore((state) => state);
  const { user } = userStore((state) => state);

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
                <span className="header-text">
                  {profileInfo[0]?.firstName} {profileInfo[0]?.lastName}
                </span>
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
          <div css={styles.mapContainer}>
            <Map />
            <div css={styles.mapLine}>
              <div css={styles.address}>
                <MapPineLineIcon />
                <label>123 Sample Street, NewYork</label>
              </div>
              <hr
                style={{
                  borderTop: " 3px solid var(--darker-gray)",
                  margin: "0 -30px 0 -30px",
                }}
              />
              <div css={styles.checkIn}>
                <div>
                  <CheckInIcon />
                  <label>CheckIn </label>
                </div>
                <span>
                  &#128342; {dayjs(new Date().toISOString()).format("HH:MM")}
                </span>
              </div>
              <div className="d-flex">
                <sapn className="lineDash"></sapn>
              </div>
              <div css={styles.taskProgress}>
                <div className="progressLabel">
                  <ProgressIcon />
                  <label>Task Progress</label>
                </div>
                <div css={styles.progressContent}>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: `20%` }}></div>
                  </div>{" "}
                  20%
                </div>
              </div>
            </div>
          </div>

          <div css={styles.buttonContainer}>
            <div css={styles.formFlexDiv}>
              <div css={styles.formFlexChildDiv}>
                <button
                  onClick={() => {
                    router.push({
                      pathname: "/attendance"
                    });
                  }}
                >
                  <AttendanceIcon />
                  Attendance
                </button>
              </div>
              <div css={styles.formFlexChildDiv}>
                <button onClick={() => router.push("/eLeave")}>
                  <ELeaveIcon />
                  e-Leave
                </button>
              </div>
              <div css={styles.formFlexChildDiv}>
                <button onClick={() => router.push("/payslip")}>
                  <PayslipIcon />
                  Payslip
                </button>
              </div>
            </div>
            <div css={styles.formFlexDiv}>
              <div css={styles.formFlexChildDiv}>
                <button onClick={() => router.push("/documents")}>
                  <DocumentIcon />
                  Documents
                </button>
              </div>
              <div css={styles.formFlexChildDiv}>
                <button onClick={() => router.push("/claims")}>
                  <ClaimsIcon />
                  Claims
                </button>
              </div>
              <div css={styles.formFlexChildDiv}>
                <button onClick={() => router.push("/profile")}>
                  <UserIcon />
                  Profile
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
  notiIcon: css`
    cursor: pointer;
  `,
  welcomeText: css`
    font-size: 12px;
    font-weight: 500;
  `,
  timeText: css`
    font-size: 14px;
    padding-top: 5px;
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
  mapContainer: css`
    display: flex;
    flex-direction: column;
    .leaflet-bottom {
      display: none;
    }
    .leaflet-touch .leaflet-bar {
    }
  `,
  mapIcon: css`
    display: flex;
    img {
      width: 100%;
    }
  `,
  mapLine: css`
    display: flex;
    flex-direction: column;
    width: 100%;
    color: var(--primary-font);
    font-size: 14px;
    font-weight: 600;
    gap: 5px;
    border-radius: 10px;
    background: #eff8ff;
    padding: 10px 20px;
    border: 1px solid var(--primary);

    div {
      display: flex;
    }
    label {
      padding-left: 5px;
    }
    .lineDash {
      border: 1px dashed var(--darker-gray);
      height: 40px;
      margin-top: -37px;
      margin-left: 8px;
    }
  `,
  address: css`
    display: flex;
    color: var(--font-gray);
    font-size: 16px;
    font-weight: 600;
    label {
      margin-top: -3px;
    }
  `,
  checkIn: css`
    flex-direction: column;
    span {
      padding-left: 25px;
    }
    div {
      align-items: center;
    }
  `,
  taskProgress: css`
    flex-direction: column;
    margin-top: -10px;
    .progressLabel {
      align-items: center;
    }
  `,
  progressContent: css`
    padding-left: 25px;
    justify-content: center;
    align-items: center;

    .progress-bar {
      display: flex;
      width: 100%;
      height: 10px;
      background-color: #d9d9d9;
      border-radius: 20px;
      overflow: hidden;
      margin-right: 5px;
    }
    .progress {
      height: 100%;
      text-align: center;
      color: #fff;
      background-color: #5fa452;
      transition: width 0.3s ease;
    }
  `,
  buttonContainer: css`
    width: 100%;
    height: 100%;
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    button {
      color: var(--primary);
      text-align: center;
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      padding: 7px;
      border-radius: 10px;
      border: 1px solid var(--primary);
      background: var(--white);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 80px;
      gap: 5px;
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
    flex-direction: row;
    @media (max-width: 1400px) {
      gap: 20px;
    }
    @media (min-width: 1400px) {
      gap: 50px;
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
