/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { css } from "@emotion/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import DutyModal from "./DutyModal";

const Historty = () => {
  const [startDate, setStartDate] = useState(null);
  const [dutyModalOpen, setDutyModalOpen] = useState(false);

  const dutyModal = () => {
    setDutyModalOpen(!dutyModalOpen);
  };

  return (
    <div>
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
        <div css={styles.requestCard}>
          <div onClick={dutyModal}>
            <label className="primary-text">16th june ,2023</label>
            <div css={styles.eachCard}>
              <label>
                9:00 - 16:00
                <label>
                  <span className="address">
                    3891 Ranchview Dr. Richardson,
                  </span>
                  California 62639
                </label>
              </label>
              <span css={styles.expenseStatus}>Complete</span>
            </div>
            <hr
              style={{
                borderTop: " 1px solid var(--darker-gray)",
                margin: "15px -10px 0 -10px",
              }}
            />
          </div>
          <div onClick={dutyModal}>
            <label className="primary-text">15th June ,2023</label>
            <div
              css={styles.eachCard}
              style={{ background: "rgba(255, 219, 219, 1)" }}
            >
              <label>
                9:00 - 16:00
                <label>
                  <span className="address">
                    3891 Ranchview Dr. Richardson,
                  </span>
                  California 62639
                </label>
              </label>
              <span css={styles.expenseStatus} style={{ background: "red" }}>
                Incomplete
              </span>
            </div>
            <hr
              style={{
                borderTop: " 1px solid var(--darker-gray)",
                margin: "15px -10px 0 -10px",
              }}
            />
          </div>
          <div>
            <label className="primary-text">14th June ,2023</label>
            <div
              css={styles.eachCard}
              style={{
                background: "rgba(214, 214, 214, 0.4)",
                justifyContent: "center",
              }}
            >
              <label>
                No Attendance Recorded.
                <span css={styles.offDay}>Off Day</span>
              </label>
            </div>
            <hr
              style={{
                borderTop: " 1px solid var(--darker-gray)",
                margin: "15px -10px 0 -10px",
              }}
            />
          </div>
        </div>
      </div>
      {dutyModalOpen && (
        <DutyModal
          isOpen={dutyModalOpen}
          close={() => setDutyModalOpen(!dutyModalOpen)}
        />
      )}
    </div>
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
    .react-datepicker__day {
      :focus {
        background: var(--primary);
        width: 30px;
        height: 30px;
        border-radius: 50px;
        color: var(--white);
        border: none;
      }
    }
  `,
  requestCard: css`
    position: relative;
    margin-top: 15rem;
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
    background: #293991;
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
