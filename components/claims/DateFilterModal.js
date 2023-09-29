/** @jsxImportSource @emotion/react */
import { Modal } from "reactstrap";
import { useRef, useEffect, useState } from "react";
import { css } from "@emotion/react";
import DatePicker from "react-datepicker";
require("react-datepicker/dist/react-datepicker.css");
import { BiCalendarAlt } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";

const DateFilterModal = ({ isOpen = false, close = () => {} }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };
  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  return (
    <Modal size="md" isOpen={isOpen} toggle={close} css={styles.modal}>
      <div css={styles.dateContent}>
        <div>
          Start Date
          <label className="d-flex">
            <BiCalendarAlt size={20} />
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              dateFormat="MMM / dd / yy"
            />
          </label>
        </div>
        <span>
          <BsArrowRight />
        </span>
        <div>
          End Date
          <label className="d-flex">
            <BiCalendarAlt size={20} />
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              dateFormat="MMM / dd / yy"
            />
          </label>
        </div>
      </div>
      <div css={styles.actionButton}>
        <button css={styles.cancelBtn} onClick={() => close()}>
          Cancel
        </button>
        <button css={styles.addBtn} onClick={() => close()}>
          Confirm
        </button>
      </div>
    </Modal>
  );
};

export default DateFilterModal;

const styles = {
  modal: css`
    .modal-content {
      border-radius: 16px;
      margin-top: 12rem;
      width: 100%;
      background: #f5f5f5;
      padding: 20px;
      padding-bottom: 20px;
      @media (max-width: 360px) {
        padding: 4px;
        padding-bottom: 20px;
      }
      @media (min-width: 450px) {
        padding-left: 40px;
        padding-bottom: 20px;
      }
    }
  `,
  amountContent: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 50px;
    span {
      border-bottom: 1px solid var(--darker-gray);
      width: 20px;
      position: relative;
      top: -12px;
    }
    label {
      border-bottom: 1px solid var(--darker-gray);
      width: 65px;
      color: var(--darker-gray);
    }
    input {
      border: none;
      background: none;
      :focus {
        outline: none;
        border: none;
      }
      ::placeholder {
        color: var(--darker-gray);
        font-size: 13px;
        font-weight: 400;
        line-height: normal;
      }
    }
  `,
  categoryContent: css`
    .categoryGroup {
      display: flex;
      gap: 10px;
      flex-direction: column;
      justify-content: center;
    }
    .categoryValue {
      display: flex;
      gap: 10px;
      label {
        cursor: pointer;
        border: 1px solid var(--darker-gray);
        padding: 2px 10px;
        width: 30%;
        font-size: 12px;
        font-weight: 400;
        line-height: normal;
        color: var(--darker-gray);
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  `,
  actionButton: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 15px;
    button {
      border-radius: 10px;
      padding: 3px 20px;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.08),
        0px 4px 6px 0px rgba(50, 50, 93, 0.11);
    }
  `,
  cancelBtn: css`
    border: 1px solid rgba(160, 174, 192, 1);
    color: var(--dark-gray);
  `,
  addBtn: css`
    border: none;
    color: var(--white);
    background: var(--primary);
  `,
  dateContent: css`
    display: flex;
     justify-content: space-between;
    padding; 10px;
    gap: 3px;
    @media (max-width: 345px) {
        background: red;
        flex-direction: column;
      }
    span {
        display: flex;
    justify-content: center;
      align-items: center;
      margin-top: 30px;
    }
    label {
      justify-content: center;
      align-items: center;
      cursor: pointer;
      border-radius: 8px;
      background: var(--white);
      box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.2);
      padding: 5px 10px;
      gap: 7px;
      width: 100%;
    }
    div {
      color: #37474f;
      font-size: 16px;
      font-weight: 600;
      line-height: 30px;
      font-family: Open Sans;
    }
    input {
      border: none;
      background: none;
      width: 95px;
      :focus {
        outline: none;
        border: none;
      }
      ::placeholder {
        color: var(--darker-gray);
        font-size: 13px;
        font-weight: 400;
        line-height: normal;
      }
    }
  `,
};
