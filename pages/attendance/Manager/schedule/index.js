/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Schedule = () => {
  const [startDate, setStartDate] = useState();
  return (
    <div>
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
    </div>
  );
};

export default Schedule;

const styles = {
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
};
