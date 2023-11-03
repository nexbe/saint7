/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import Layout from "../../../../components/layout/Layout";
import HeaderNoti from "../../../../components/layout/HeaderNoti";
import ScheduleCard from "../../../../components/attendence/ScheduleCard";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Schedule = () => {
  const [dates, setDates] = useState(new Date());
  console.log(dates);
  return (
    <Layout>
      <HeaderNoti title={"Schedule"} href={"/attendance/Manager"} />
      <div>
        <Calendar onChange={setDates} value={dates} css={styles.calendar} />
        <div css={styles.container}>
          <h5>16th june ,2023</h5>
          <ScheduleCard state={true} />
          <ScheduleCard state={false} />
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
    max-height: 46vh;
    overflow-y: scroll;
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
