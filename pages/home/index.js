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
import ELeaveIcon from "/public/icons/eLeaveIcon";
import profileStore from "../../store/profile";
import userStore from "../../store/auth";
import userUserStore from "userUserStore"; // Use the alias here

import HomeMap from "../../components/Map/homeMap";
import attendenceStore from "../../store/attendance";
import { useState } from "react";
import HrmIcon from "../../public/icons/hrmIcon";
import OperationIcon from "../../public/icons/operationIcon";
import moment from "moment";
import HomeMap2 from "../../components/Map/homeMap2";
import siteStore from "../../store/sites";

const Home = () => {
  const router = useRouter();
  const apolloClient = useApolloClient();
  const {
    getAllProfiles,
    ProfileInfo: profileInfo,
    loading,
  } = profileStore((state) => state);
  const { sites, getSites } = siteStore();

  const today = new Date(); // Create a new Date object representing today

  const { user } = userStore((state) => state);
  const { getAssignUsers, AssignUsers, notiData } = userUserStore(
    (state) => state
  );

  const [userData, setUserData] = useState();
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    setUserData(user);
    if (user?.role?.name.toLowerCase() == "guard") {
      getAssignUsers({
        apolloClient,
        where: {
          userId: user.id,
          date: moment(new Date()).format("YYYY-MM-DD"),
        },
      });
    } else {
      getSites();
    }
  }, []);

  useEffect(() => {
    getAllProfiles({
      apolloClient,
      where: { userId: user.id },
    });
  }, [user]);

  useEffect(() => {
    if (user?.role?.name.toLowerCase() != "admin") {
      const filteredData =
        AssignUsers[0]?.attributes?.attendances?.data?.filter((item) => {
          const itemDate = item.attributes.date;

          return itemDate === moment().format("YYYY-MM-DD");
        });
      setAttendanceData(filteredData);
    }
  }, [AssignUsers]);

  const formatTime = (timeString) => {
    const timeParts = timeString?.split(":"); // Split the string by colon

    // Extract hours and minutes
    const hours = timeParts[0];
    const minutes = timeParts[1];
    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
  };
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
          {user?.role?.name.toLowerCase() == "guard" ? (
            <div css={styles.mapContainer}>
              <HomeMap
                lat={
                  AssignUsers[0]?.attributes?.site?.data?.attributes?.location
                    ?.Lat
                }
                lng={
                  AssignUsers[0]?.attributes?.site?.data?.attributes?.location
                    ?.Lng
                }
                AssignUsers={AssignUsers}
              />
            </div>
          ) : (
            <div css={styles.mapContainer2}>
              <HomeMap2 siteData={sites} />
            </div>
          )}

          {user?.role?.name.toLowerCase() == "guard" && (
            <div css={styles.mapLine}>
              <div css={styles.address}>
                <MapPineLineIcon />
                <label>
                  {AssignUsers[0]?.attributes?.site?.data?.attributes?.address}
                </label>
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
                  &#128342;
                  {attendanceData?.length
                    ? formatTime(attendanceData[0]?.attributes?.checkInTime)
                    : "00:00"}
                </span>
              </div>
              <div className="d-flex">
                <span className="lineDash"></span>
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
          )}
          <div css={styles.buttonContainer}>
            <div css={styles.formFlexDiv}>
              <div css={styles.formFlexChildDiv}>
                <button
                  onClick={() => {
                    router.push({
                      pathname: "/HRM",
                    });
                  }}
                >
                  <HrmIcon />
                  HRM
                </button>
              </div>
              <div css={styles.formFlexChildDiv}>
                <button onClick={() => router.push("/operation")}>
                  <OperationIcon />
                  Operations
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
      margin-top: 85px;
    }
  `,
  mapContainer2: css`
    display: flex;
    flex-direction: column;

    .leaflet-bottom {
      display: none;
    }
    .leaflet-touch .leaflet-bar {
      margin-top: 20px;
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
    gap: 3px;
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
    align-items: center;
    label {
      margin-top: -3px;
      line-height: normal;
    }
  `,
  checkIn: css`
    flex-direction: column;
    span {
      padding-left: 22px;
      margin-top: -8px;
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
    padding-top: 10px;
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
      height: 90px;
      gap: 10px;
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
      gap: 15px;
    }
    @media (min-width: 1400px) {
      gap: 30px;
    }
  `,
  formFlexChildDiv: css`
    width: 100%;
    display: flex;

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
