/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";
import { css } from "@emotion/react";
import DatePicker from "react-datepicker";
require("react-datepicker/dist/react-datepicker.css");
import { BiCalendarAlt } from "react-icons/bi";
import ClockIcon from "../../public/icons/clockIcon";

const CreateCheckList = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  return (
    <Layout>
      <HeaderNoti title={"Site Checklist"} href={"/checklist"} />
      <form css={styles.bodyContainer}>
        <div css={styles.formStyle}>
          <div>
            <label>
              Tilte <span>*</span>
            </label>
            <input type="text" name="title" id="title" required />
          </div>
          <div>
            <label>
              Location <span>*</span>
            </label>
            <textarea name="location" id="location" required />
          </div>
        </div>
        <div css={styles.formContent}>
          <div className="formFlex" style={{ border: "none" }}>
            <div css={styles.dateContent}>
              <div className="secondary-text">
                Date Visited <span>*</span>
                <label className="d-flex">
                  <BiCalendarAlt size={20} />
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="MMM / dd / yy"
                  />
                </label>
              </div>
              <div className="secondary-text">
                Time Visited <span>*</span>
                <label className="d-flex">
                  <ClockIcon size={20} />
                  <DatePicker
                    selected={time}
                    onChange={(date) => setTime(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    dateFormat="h:mm:ss"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div css={styles.formStyle}>
          <div>
            <label>
              Visited By <span>*</span>
            </label>
            <input type="text" name="visited" id="visited" required />
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default CreateCheckList;

const styles = {
  wrapper: css`
    display: flex;
    flex-direction: column;
    gap: 9px;
    margin: 20px;
    max-height: 78vh;
    overflow-y: scroll;
    color: #000;
    @media (min-width: 440px) {
      margin: 30px;
    }
  `,
  formStyle: css`
    div {
      display: flex;
      flex-direction: column;
      margin: 0px 20px 0px 20px;
    }

    span {
      color: #ec1c24;
    }

    input,
    textarea {
      border-radius: 5px;
      border: 1px solid #718096;
      background: var(--white);
      padding: 9px;
    }
  `,
  bodyContainer: css`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    min-height: 200px;
    gap: 12px;
  `,
  formContent: css`
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    padding: 9px 20px 30px;
    line-height: 20px;

    .formFlex {
      display: flex;
      flex-direction: column;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      span {
        color: #ec1c24;
      }
      input {
        border: none;
        outline: none;
      }
    }
  `,
  dateContent: css`
    display: flex;
    justify-content: space-between;
    gap: 3px;

    @media (max-width: 345px) {
      background: red;
      flex-direction: column;
    }
    label {
      justify-content: center;
      align-items: center;
      cursor: pointer;
      border-radius: 8px;
      background: var(--white);
      border: 1px solid #718096;
      padding: 3px 10px;
      gap: 7px;
      height: 50px;
      width: 200px;
    }
  `,
};
