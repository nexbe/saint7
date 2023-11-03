/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import Layout from "../../../../components/layout/Layout";
import HeaderNoti from "../../../../components/layout/HeaderNoti";
import ScheduleCard from "../../../../components/attendence/ScheduleCard";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import attendenceStore from "../../../../store/attendance";
import { parseCookies } from "nookies";
import { useApolloClient } from "@apollo/client";
import moment from "moment";

const Schedule = () => {
  const cookies = parseCookies();
  const apolloClient = useApolloClient();
  const { AttendanceSchedule, getAttendanceSchedule } = attendenceStore(
    (state) => state
  );
  const [dates, setDates] = useState(new Date());

  useEffect(() => {
    getAttendanceSchedule({
      apolloClient,
      where: { date: moment(dates).format("YYYY-MM-DD") },
    });
  }, [dates]);

  console.log(AttendanceSchedule);

  return (
    <Layout>
      <HeaderNoti title={"Schedule"} href={"/attendance/Manager"} />
      <div style={{ height: 0 }}>
        <Calendar onChange={setDates} value={dates} css={styles.calendar} />
        <div css={styles.container}>
          <h5>{moment(dates).format("Do MMMM YYYY")}</h5>
          {AttendanceSchedule?.map((attendances, index) => (
            <div key={index}>
              <ScheduleCard
                state={
                  attendances?.attributes?.status == "Complete" ? true : false
                }
                attendanceData={attendances}
              />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Schedule;

const styles = {
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
  container: css`
    background: #fff;
    border-radius: 10px;
    margin-top: 10px;
    padding: 20px;

    h5 {
      color: #2f4858;
      font-size: 16px;
      font-weight: 600;
    }
    @media (max-width: 375px) {
      max-height: 30vh;
    }
    @media (max-width: 375px) {
      max-height: 35vh;
    }
  `,
  bodyContainer: css`
    display: flex;
    flex-direction: column;
    flex: 1;

    overflow-x: hidden;
    min-height: 200px;
  `,
};
