/** @jsxImportSource @emotion/react */
import { Modal } from "reactstrap";
import { useState } from "react";
import { css } from "@emotion/react";

import CloseIcon from "../../public/icons/closeIcon";
import CheckInIcon from "../../public/icons/checkInIcon";
import CheckOutIcon from "../../public/icons/CheckOutIcon";
import attendenceStore from "../../store/attendance";
import { useEffect } from "react";
import { useApolloClient } from "@apollo/client";
import moment from "moment";

const DutyModal = ({ isOpen = false, close = () => {} }) => {
  const apolloClient = useApolloClient();
  const {
    AttendanceUser: AttendanceUser,
    getAttendanceUser,
    historyData,
    updateAttendance,
  } = attendenceStore((state) => state);

  const [workedHours, setWorkHours] = useState();

  useEffect(() => {
    if (historyData?.id) {
      getAttendanceUser({
        apolloClient,
        where: { id: historyData?.id },
      });
    }
  }, [historyData]);

  console.log(AttendanceUser);

  useEffect(() => {
    if (AttendanceUser?.attributes?.checkOutTIme) {
      const checkInDateTime = new Date(
        `2000-01-01T${AttendanceUser?.attributes?.checkInTime}`
      );
      const checkOutDateTime = new Date(
        `2000-01-01T${AttendanceUser?.attributes?.checkOutTIme}`
      );

      // Calculate the difference in milliseconds between check-in and check-out times
      const timeDifferenceMs = checkOutDateTime - checkInDateTime;

      // Convert milliseconds to hours and minutes
      const hours = Math.floor(timeDifferenceMs / (1000 * 60 * 60)); // Get total hours
      const minutes = Math.floor(
        (timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60)
      ); // Get remaining minutes

      // Format the hours and minutes into a readable string
      const formattedTimeDifference = `${hours
        .toString()
        .padStart(2, "0")}:${minutes.toString().padStart(2, "0")} Hrs`;

      console.log(`Time difference: ${formattedTimeDifference}`);
      setWorkHours(formattedTimeDifference);
    }
  }, [AttendanceUser]);

  const formatTime = (timeString) => {
    const timeParts = timeString?.split(":"); // Split the string by colon

    // Extract hours and minutes
    const hours = timeParts[0];
    const minutes = timeParts[1];
    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
  };

  return (
    <Modal isOpen={isOpen} toggle={close} css={styles.wrapper}>
      <div css={styles.actions}>
        <h3>Duty In Progress...</h3>
        <div onClick={() => close()}>
          <CloseIcon />
        </div>
      </div>
      <div css={styles.dutyDetails}>
        <div className="timeBox">
          <div style={{ fontSize: "16px" }}>
            {moment(AttendanceUser?.attributes?.date).format("dddd")}
            <label className="d-flex">
              {moment(AttendanceUser?.attributes?.date).format("Do MMMM YYYY")}
            </label>
          </div>
          <div>
            Time of Duty (Planned)
            <label className="d-flex" css={styles.boldText}>
              {AttendanceUser?.attributes?.assignee_shift?.data?.attributes
                ?.shift?.data?.attributes?.timeRange?.StartTime
                ? formatTime(
                    AttendanceUser?.attributes?.assignee_shift?.data?.attributes
                      ?.shift?.data?.attributes?.timeRange?.StartTime
                  )
                : "00:00:00"}{" "}
              to{" "}
              {AttendanceUser?.attributes?.assignee_shift?.data?.attributes
                ?.shift?.data?.attributes?.timeRange?.EndTime
                ? formatTime(
                    AttendanceUser?.attributes?.assignee_shift?.data?.attributes
                      ?.shift?.data?.attributes?.timeRange?.EndTime
                  )
                : "00:00:00"}
            </label>
          </div>
          <div>
            {
              AttendanceUser?.attributes?.assignee_shift?.data?.attributes?.site
                ?.data?.attributes?.name
            }
          </div>
        </div>
        <div className="checkInBox">
          <div className="d-flex" style={{ gap: "10px" }}>
            <CheckInIcon />{" "}
            <label>
              Actual Check-in Time{" "}
              <label className="d-flex" css={styles.boldText}>
                {AttendanceUser?.attributes?.checkInTime
                  ? formatTime(AttendanceUser?.attributes?.checkInTime)
                  : "00:00"}
              </label>
            </label>
          </div>
          <div className="d-flex" style={{ gap: "10px", marginTop: "15px" }}>
            <CheckOutIcon />{" "}
            <label>
              Actual Check-out Time{" "}
              <label className="d-flex" css={styles.boldText}>
                {AttendanceUser?.attributes?.status == "Complete" &&
                AttendanceUser?.attributes?.checkOutTIme
                  ? formatTime(AttendanceUser?.attributes?.checkOutTIme)
                  : "N.A"}
              </label>
            </label>
          </div>
          <div className="d-flex">
            <span className="lineDash"></span>
          </div>
          <button>
            {AttendanceUser?.attributes?.checkOutTIme
              ? workedHours
              : "00:00 Hr"}
          </button>
        </div>
      </div>
      <div css={styles.repotText}>
        If you have any issue , send us an email to <label>Report</label>
      </div>
    </Modal>
  );
};

export default DutyModal;

const styles = {
  wrapper: css`
    margin-top: 50%;
    padding: 20px;
    border-radius: 16px;
    background: #fff;
    color: var(--primary-font);
    box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.08);
    p {
      margin: 20px;
    }
    .modal-content {
      border: none;
    }
    @media (min-width: 440px) {
      margin-top: 5%;
    }
  `,
  actions: css`
    color: #2f4858;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    h4 {
      font-size: 18px;
      font-weight: 600;
    }
    div {
      cursor: pointer;
    }
  `,
  dutyDetails: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 25px;
    padding: 20px 0;
    gap: 5px;
    position: relative;
    .timeBox {
      display: flex;
      flex-direction: column;
      gap: 25px;
      width: 50%;
    }
    .checkInBox {
      background: rgba(227, 243, 255, 1);

      padding: 15px;
      width: 50%;
    }
    .lineDash {
      border: 1px dashed var(--darker-gray);
      height: 66px;
      position: absolute;
      margin-top: -8rem;
      margin-left: 10px;
    }
    svg {
      width: 30px;
      height: 30px;
    }
    button {
      display: flex;
      height: 40px;
      padding: 12px 20px;
      justify-content: center;
      align-items: center;
      gap: 2px;
      border-radius: 8px;
      background: var(--primary);
      border: none;
      color: #fff;
      font-size: 16px;
      font-weight: 600;
      margin-top: 20px;
    }
  `,
  repotText: css`
    label {
      color: #386fff;
      font-size: 16px;
      font-weight: 700;
      line-height: 125%;
      text-decoration: underline;
    }
  `,
  boldText: css`
    color: #2f4858;
    font-size: 16px;
    font-weight: 600;
    line-height: 125%;
  `,
};
