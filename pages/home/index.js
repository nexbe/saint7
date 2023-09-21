/** @jsxImportSource @emotion/react */
import Layout from "../../components/layout/Layout";
import { css } from "@emotion/react";
import ProfileIcon from "/public/icons/profileIcon";
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

const index = () => {
  return (
    <Layout>
      <div css={styles.wrapper}>
        <div css={styles.headerContainer}>
          <div>
            <div css={styles.profileInfo}>
              <ProfileIcon />
              <div>
                <span css={styles.welcomeText}>Welcome !</span>
                <span css={styles.nameText}>John Smith</span>
              </div>
            </div>
            <div css={styles.timeText}>Friday, 26th May 2023</div>
          </div>
          <div css={styles.notiIcon}>
            {" "}
            <NotiIcon />
          </div>
        </div>
        <div css={styles.bodyContainer}>
          <div css={styles.mapContainer}>
            <div css={styles.mapIcon}>
              <img src="images/map.jpg" />
            </div>
            <div css={styles.mapLine}>
              <div css={styles.address}>
                {" "}
                <MapPineLineIcon />
                <label>3891 Ranchview Dr. Richardson, California 62639</label>
              </div>

              <hr
                style={{
                  borderTop: " 2px solid #D9D9D9",
                  margin: "0 -30px 0 -30px",
                }}
              />
              <div css={styles.checkIn}>
                <div>
                  <CheckInIcon />
                  <label>CheckIn </label>
                </div>
                <span>&#128342; 09:05</span>
              </div>
              <div css={styles.taskProgress}>
                <div>
                  <ProgressIcon />
                  <label>Task Progress</label>
                </div>
                <div css={styles.progressContent}>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: `20%` }}></div>
                  </div>
                  20%
                </div>
              </div>
            </div>
          </div>

          <div css={styles.buttonContainer}>
            <div css={styles.formFlexDiv}>
              <div css={styles.formFlexChildDiv}>
                <button>
                  <AttendanceIcon />
                  Attendance
                </button>
              </div>
              <div css={styles.formFlexChildDiv}>
                <button>
                  <ELeaveIcon />
                  e-Leave
                </button>
              </div>
              <div css={styles.formFlexChildDiv}>
                <button>
                  <PayslipIcon />
                  Payslip
                </button>
              </div>
            </div>
            <div css={styles.formFlexDiv}>
              <div css={styles.formFlexChildDiv}>
                <button>
                  <DocumentIcon />
                  Documents
                </button>
              </div>
              <div css={styles.formFlexChildDiv}>
                <button>
                  <ClaimsIcon />
                  Claims
                </button>
              </div>
              <div css={styles.formFlexChildDiv}>
                <button>
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

export default index;

const styles = {
  wrapper: css`
    flex: 1 1 auto;
    height: 0px;
    display: flex;
    flex-direction: column;
  `,
  headerContainer: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 20px;
    background: #293991;
    min-height: 85px;
    color: #fff;
    font-family: Inter;
    font-style: normal;
    border-radius: 20px 20px 0 0;
  `,
  profileInfo: css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 15px;
    span {
      display: flex;
      flex-direction: column;
    }
  `,
  notiIcon: css`
    cursor: pointer;
  `,
  welcomeText: css`
    font-size: 12px;
    font-weight: 500;
  `,
  nameText: css`
    font-size: 20px;
    font-weight: 600;
  `,
  timeText: css`
    font-size: 14px;
    font-weight: 700;
    padding-top: 7px;
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
      background-color: gray;
    }
  `,
  mapContainer: css`
    display: flex;
    flex-direction: column;
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
    color: #2f4858;
    font-size: 14px;
    font-weight: 600;
    gap: 5px;
    border-radius: 10px;
    background: #eff8ff;
    padding: 10px 20px;
    div {
      display: flex;
    }
    label {
      padding-left: 5px;
    }
  `,
  address: css`
    color: #383838;
    font-size: 16px;
    font-weight: 600;
  `,
  checkIn: css`
    flex-direction: column;
    span {
      padding-left: 25px;
    }
  `,
  taskProgress: css`
    flex-direction: column;
  `,
  progressContent: css`
    padding-left: 25px;
    justify-content: center;
    .progress-bar {
      display: flex;
      width: 100%;
      height: 10px;
      background-color: #d9d9d9;
      border-radius: 20px;
      overflow: hidden;
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
      color: #293991;
      text-align: center;
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      padding: 7px;
      border-radius: 10px;
      border: 1px solid #293991;
      background: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 80px;
      gap: 5px;
      @media (max-width: 1400px) {
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
