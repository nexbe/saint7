/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import DutyModal from "./DutyModal";
import attendenceStore from "../../store/attendance";

const ScheduleCard = ({ state, attendanceData }) => {
  const [modal, setModal] = useState(false);
  const { AttendanceSchedule, getHistroyData } = attendenceStore(
    (state) => state
  );
  const formatTime = (timeString) => {
    const timeParts = timeString?.split(":"); // Split the string by colon

    // Extract hours and minutes
    const hours = timeParts[0];
    const minutes = timeParts[1];
    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
  };

  const handleClick = () => {
    getHistroyData(attendanceData);
    setModal(true);
  };

  return (
    <div onClick={() => handleClick()}>
      <div css={styles.wrapper(state)}>
        <div css={styles.container}>
          <div>
            <img
              src={
                attendanceData?.attributes?.assignee_shift?.data
                  ? `${process.env.NEXT_PUBLIC_APP_URL}${attendanceData?.attributes?.assignee_shift?.data?.attributes?.users_permissions_user?.data?.attributes?.facialScanImage?.data?.attributes?.url}`
                  : `${process.env.NEXT_PUBLIC_APP_URL}/uploads/default_Image_49ed37eb5a.jpg`
              }
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
              }}
            />
            <span>
              {
                attendanceData?.attributes?.assignee_shift?.data?.attributes
                  ?.users_permissions_user?.data?.attributes?.username
              }
            </span>
          </div>

          <span
            css={[
              styles.expenseStatus,
              {
                background: state ? "#293991" : "#EC1C24",
              },
            ]}
          >
            {state ? "Complete" : "Incomplete"}
          </span>
        </div>
        <div css={styles.info}>
          <p>
            {attendanceData?.attributes?.checkInTime
              ? formatTime(attendanceData?.attributes?.checkInTime)
              : "00:00"}{" "}
            -{" "}
            {attendanceData?.attributes?.checkOutTime
              ? formatTime(attendanceData?.attributes?.checkOutTime)
              : "00:00"}
          </p>
          <p>{attendanceData?.attributes?.address}</p>
        </div>
      </div>
      <DutyModal isOpen={modal} close={() => setModal(!modal)} />
    </div>
  );
};

export default ScheduleCard;

const styles = {
  container: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 500;
    span {
      color: #2f4858;
      margin-left: 9px;
    }
    div {
      color: var(--primary);
    }
  `,
  box: (state) => css`
    border-radius: 5px;
    background: ${state ? "#293991" : "#EB5656"};
    padding: 0px 12px;
    height: 30px;
    text-align: center;
    font-size: 12px;
    font-weight: 600;
  `,
  info: css`
    display: flex;
    flex-direction: column;
    p {
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 0px;
    }
    span {
      font-size: 12px;
      font-weight: 600;
    }
  `,
  wrapper: (state) => css`
    padding: 15px;
    margin-top: 5px;
    color: #2f4858;
    border-radius: 9px;
    background: ${!state ? "#FFDBDB" : "#E3F3FF"};
  `,
  expenseStatus: css`
    font-size: 12px;
    text-transform: capitalize;
    height: 25px;
    padding: 5px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;

    color: #ffffff !important;
  `,
};
