/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";
import { BiCalendar } from "react-icons/bi";

const LeaveCalendar = () => {
  const router = useRouter();
  const [startDate, setStartDate] = useState(null);
  return (
    <Layout>
      <div css={styles.wrapper}>
        <HeaderNoti title={"Leave Calendar"} href={"/eLeave"} />
        <div css={styles.bodyContainer}>
          <div css={styles.caledarContainer}>
            <div css={styles.calendarCard}>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
                open
                formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 3)}
              />
            </div>
          </div>
          <div style={{ height: "50%" }}>
            <div css={styles.requestCard}>
              <label className="primary-text">9th October ,2023</label>
              <div css={styles.eachCard} className="primary-text">
                <label>
                  Request Leave
                  <span className="requestDate">
                    <span css={styles.circleStyle}></span>
                    <span css={styles.lineStyle}></span>{" "}
                    <BiCalendar color="var(--dark-gray)" size={15} /> Friday 7
                    October
                  </span>
                  <span className="requestDate" style={{ marginTop: "-18px" }}>
                    <span
                      css={styles.circleStyle}
                      style={{ marginRight: "6px" }}
                    ></span>
                    <BiCalendar color="var(--dark-gray)" size={15} />
                    Friday 7 October
                  </span>
                  <label style={{ fontSize: "14px" }}>1 Day off</label>
                </label>
                <span css={styles.expenseStatus}>Pending</span>
              </div>
            </div>
            <div css={styles.requestCard}>
              <label className="primary-text">9th October ,2023</label>
              <div css={styles.eachCard} className="primary-text">
                <label>
                  Request Leave
                  <span className="requestDate">
                    <span css={styles.circleStyle}></span>
                    <span css={styles.lineStyle}></span>{" "}
                    <BiCalendar color="var(--dark-gray)" size={15} /> Friday 7
                    October
                  </span>
                  <span className="requestDate" style={{ marginTop: "-18px" }}>
                    <span
                      css={styles.circleStyle}
                      style={{ marginRight: "6px" }}
                    ></span>
                    <BiCalendar color="var(--dark-gray)" size={15} />
                    Friday 7 October
                  </span>
                  <label style={{ fontSize: "14px" }}>1 Day off</label>
                </label>
                <span css={styles.expenseStatus}>Pending</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LeaveCalendar;

const styles = {
  wrapper: css`
    flex: 1 1 auto;
    height: 0px;
    display: flex;
    flex-direction: column;
    margin: 0;
    background: var(--white);
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
    height: 50%;
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
   
    }
  `,
  requestCard: css`
    position: relative;
    border-radius: 10px;
    background: var(--white);
    box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.08);
    padding: 8px 20px;
  `,
  eachCard: css`
    display: flex;
    flex-direction: row;
    line-height: 25px;
    padding: 7px 10px;
    justify-content: space-between;
    border-radius: 16px;
    background: rgba(250, 126, 11, 0.2);
    box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.08);
    label {
      display: flex;
      flex-direction: column;
      gap: 5px;
      color: #000;
    }
    .requestDate {
      font-size: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 15px;
      margin-top: -15px;
      svg {
        margin-right: 5px;
      }
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
    background: rgba(251, 122, 3, 0.5);
    color: #d06c0f;
  `,
  lineStyle: css`
    background-color: var(--light-gray);
    height: 30px;
    width: 2px;
    margin-left: -6px;
    margin-top: 20px;
    margin-right: 10px;
  `,
  circleStyle: css`
    width: 10px;
    height: 10px;
    background: var(--light-gray);
    border-radius: 50px;
  `,
};
