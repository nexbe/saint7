/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import DutyModal from "./DutyModal";
import moment from "moment";
import attendenceStore from "../../store/attendance";
import { setCookie, parseCookies } from "nookies";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Historty = () => {
  const cookies = parseCookies();

  const { attendanceData, getAttendanceData, getHistroyData } = attendenceStore(
    (state) => state
  );

  const userData = cookies.user ? JSON.parse(cookies.user) : null;

  const [startDate, setStartDate] = useState(null);
  const [dutyModalOpen, setDutyModalOpen] = useState(false);
  const [attendData, setAttendData] = useState(null);

  useEffect(() => {
    setStartDate(new Date());
  }, []);

  useEffect(() => {
    getAttendanceData(userData?.id, moment(startDate).format("YYYY-MM-DD"));
  }, [startDate]);

  const dutyModal = (data) => {
    getHistroyData(data);
    setDutyModalOpen(!dutyModalOpen);
  };

  const formatTime = (timeString) => {
    const timeParts = timeString?.split(":"); // Split the string by colon

    // Extract hours and minutes
    const hours = timeParts[0];
    const minutes = timeParts[1];
    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
  };

  return (
    <>
      <div css={styles.bodyContainer}>
        <Calendar
          onChange={setStartDate}
          value={startDate}
          css={styles.calendar}
        />
        <div css={styles.requestCard}>
          {attendanceData?.attendanceData?.map((data, index) => (
            <div onClick={() => dutyModal(data)} key={index}>
              <label className="primary-text">
                {moment(data?.date).format("Do MMMM YYYY")}
              </label>
              <div css={styles.eachCard}>
                <label>
                  {data?.check_in_time
                    ? formatTime(data?.check_in_time)
                    : "00:00"}{" "}
                  -{" "}
                  {data?.check_out_t_ime
                    ? formatTime(data?.check_out_t_ime)
                    : "00:00"}
                  <label>
                    <span className="address">{data?.address}</span>
                  </label>
                </label>
                <span
                  css={[
                    styles.expenseStatus,
                    {
                      background:
                        data?.status == "Complete" ? "#293991" : "#EC1C24",
                    },
                  ]}
                >
                  {data?.status == "Complete" ? "Complete" : "Incomplete"}
                </span>
              </div>
              <hr
                style={{
                  borderTop: " 1px solid var(--darker-gray)",
                  margin: "15px -10px 0 -10px",
                }}
              />
            </div>
          ))}
        </div>
      </div>
      {dutyModalOpen && (
        <DutyModal
          isOpen={dutyModalOpen}
          close={() => setDutyModalOpen(!dutyModalOpen)}
        />
      )}
    </>
  );
};

export default Historty;

const styles = {
  wrapper: css`
    flex: 1 1 auto;
    height: 0px;
    display: flex;
    flex-direction: column;
    margin: 0;
    background: var(--white);
  `,
  calendar: css`
    width: 100%;
    border: none;
    border-radius: 0px 0px 16px 16px;
    .react-calendar__tile--active:enabled:hover,
    .react-calendar__tile--active:enabled:focus,
    .react-calendar__tile--active {
      background: #386fff;
      border-radius: 9px;
    }
    .react-calendar__tile--now {
      border-radius: 9px;
    }
  `,
  bodyContainer: css`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    min-height: 200px;
    ::-webkit-scrollbar {
      width: 2px;
      background-color: transparent;
    }
    .bodyContainer::-webkit-scrollbar-thumb {
      border-radius: 2px;
      background-color: var(--font-gray);
    }
  `,
  caledarContainer: css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
  `,
  calendarCard: css`
    display: flex;
    flex-direction: row;
    line-height: 25px;
    justify-content: center;
    align-items: center;
    width: 100%;
    .react-datepicker__tab-loop {
      div {
        inset: none;
        transform: none;
        padding: 0;
      }
    }
    label {
      display: flex;
      flex-direction: column;
    }
    .react-datepicker-wrapper {
      input {
        display: none;
      }
    }
    .react-datepicker__triangle {
      display: none;
    }
    .react-datepicker {
      border-radius: 0px 0px 16px 16px;
      background: var(--white);
      box-shadow: 0px 4px 8px 0px rgba(21, 21, 21, 0.15);
      border: none;
      margin-top: -25px;
      padding-left: 10px;
      @media (max-width: 450px) {
        width: 100vw;
      }
      @media (min-width: 450px) {
        width: 100%;
        justify-content: center;
      }
    }
    .react-datepicker__header {
      background: var(--white);
      border: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;
      align-items: center;
      @media (min-width: 390px) {
        margin-left: 10px;
      }
    }
    .react-datepicker__week,
    .react-datepicker__day-names {
      white-space: nowrap;
      display: flex;
      gap: 20px;
      text-transform: uppercase;
      align-items: center;
      @media (min-width: 390px) {
        margin-left: 10px;
      }
    }
    .react-datepicker__current-month {
      color: var(--primary);
      font-family: Inter;
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      margin-top: 15px;
    }
    .react-datepicker__navigation-icon--next {
      top: 11px;
      left: -10px;
      font-size: 16px;
    }
    .react-datepicker__navigation-icon--previous {
      top: 11px;
      left: 5px;
      font-size: 16px;
    }
  `,
  requestCard: css`
    position: relative;
    border-radius: 10px;
    background: var(--white);
    box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.08);
    padding: 20px;
  `,
  eachCard: css`
    display: flex;
    flex-direction: row;
    line-height: 25px;
    padding: 7px 10px;
    justify-content: space-between;
    border-radius: 16px;
    background: rgba(227, 243, 255, 1);
    box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.08);
    label {
      display: flex;
      flex-direction: column;
      gap: 5px;
      font-weight: 700;
      color: #383838;
    }
    .address {
      font-weight: 700;
      color: #383838;
    }
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

    color: #ffffff;
  `,
  offDay: css`
    font-size: 16px;
    height: 35px;
    padding: 5px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background: rgba(89, 109, 121, 0.5);
    color: #fff;
  `,
};
