/** @jsxImportSource @emotion/react */
import { Modal } from "reactstrap";
import { useRef, useEffect, useState } from "react";
import { css } from "@emotion/react";

const FilterModal = ({ isOpen = false, close = () => {} }) => {
  const [check, setCheck] = useState({});
  const toggleCheck = (id) => {
    setCheck((prevState) => ({
      ...prevState,
      [id]: !prevState[id] || false,
    }));
  };
  return (
    <Modal size="md" isOpen={isOpen} toggle={close} css={styles.modal}>
      <div css={styles.amountContent}>
        <label>
          <input type={"number"} placeholder="Minimum" />
        </label>
        <span></span>
        <label>
          <input type={"number"} placeholder="Maximum" />
        </label>
      </div>
      <div css={styles.categoryContent}>
        <label style={{ color: "#4D4D4D" }}>Category</label>
        <div className="categoryGroup">
          <div className="categoryValue">
            <label
              onClick={() => toggleCheck("check1")}
              style={{
                border: check.check1 ? "1px solid var(--primary)" : "",
                color: check.check1 ? "var(--primary)" : "",
              }}
            >
              Advance Tax
            </label>
            <label
              onClick={() => toggleCheck("check2")}
              style={{
                border: check.check2 ? "1px solid var(--primary)" : "",
                color: check.check2 ? "var(--primary)" : "",
              }}
            >
              Air Travel Expense
            </label>
            <label
              onClick={() => toggleCheck("check3")}
              style={{
                border: check.check3 ? "1px solid var(--primary)" : "",
                color: check.check3 ? "var(--primary)" : "",
              }}
            >
              Automobile Expense
            </label>
          </div>
          <div className="categoryValue">
            <label
              onClick={() => toggleCheck("check4")}
              style={{
                border: check.check4 ? "1px solid var(--primary)" : "",
                color: check.check4 ? "var(--primary)" : "",
              }}
            >
              Employee Advance
            </label>
            <label
              onClick={() => toggleCheck("check5")}
              style={{
                border: check.check5 ? "1px solid var(--primary)" : "",
                color: check.check5 ? "var(--primary)" : "",
              }}
            >
              Fuel/Mileage Expense
            </label>
            <label
              onClick={() => toggleCheck("check6")}
              style={{
                border: check.check6 ? "1px solid var(--primary)" : "",
                color: check.check6 ? "var(--primary)" : "",
              }}
            >
              Furniture and Equipment
            </label>
          </div>
          <div className="categoryValue">
            <label
              onClick={() => toggleCheck("check7")}
              style={{
                border: check.check7 ? "1px solid var(--primary)" : "",
                color: check.check7 ? "var(--primary)" : "",
              }}
            >
              IT and Internet Expense
            </label>
            <label
              onClick={() => toggleCheck("check8")}
              style={{
                border: check.check8 ? "1px solid var(--primary)" : "",
                color: check.check8 ? "var(--primary)" : "",
              }}
            >
              Lodging
            </label>
            <label
              onClick={() => toggleCheck("check9")}
              style={{
                border: check.check9 ? "1px solid var(--primary)" : "",
                color: check.check9 ? "var(--primary)" : "",
              }}
            >
              Meals and Entertainment
            </label>
          </div>
          <div className="categoryValue">
            <label
              onClick={() => toggleCheck("check10")}
              style={{
                border: check.check10 ? "1px solid var(--primary)" : "",
                color: check.check10 ? "var(--primary)" : "",
              }}
            >
              Office Supplies
            </label>
            <label
              onClick={() => toggleCheck("check11")}
              style={{
                border: check.check11 ? "1px solid var(--primary)" : "",
                color: check.check11 ? "var(--primary)" : "",
              }}
            >
              Air Travel Expense
            </label>
            <label
              onClick={() => toggleCheck("check12")}
              style={{
                border: check.check12 ? "1px solid var(--primary)" : "",
                color: check.check12 ? "var(--primary)" : "",
              }}
            >
              Employee Advance
            </label>
          </div>
          <div className="categoryValue">
            <label
              onClick={() => toggleCheck("check13")}
              style={{
                border: check.check13 ? "1px solid var(--primary)" : "",
                color: check.check13 ? "var(--primary)" : "",
              }}
            >
              Parking
            </label>
            <label
              onClick={() => toggleCheck("check14")}
              style={{
                border: check.check14 ? "1px solid var(--primary)" : "",
                color: check.check14 ? "var(--primary)" : "",
              }}
            >
              Telephone Expense
            </label>
            <label
              onClick={() => toggleCheck("check15")}
              style={{
                border: check.check15 ? "1px solid var(--primary)" : "",
                color: check.check15 ? "var(--primary)" : "",
              }}
            >
              Other Expenses
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
      </div>
    </Modal>
  );
};

export default FilterModal;

const styles = {
  modal: css`
    .modal-content {
      border-radius: 0px 0px 10px 10px;
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
};
