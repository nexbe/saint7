/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { css } from "@emotion/react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

const Card = ({ title, count }) => {
  const [open, setOpen] = useState();

  return (
    <div css={styles.cardContainer}>
      <div className="secondary-text">
        {title} <span>{count}</span>
      </div>
      <div css={styles.expenseList} className="primary-text">
        <label>
          Telephone Expense
          <span className="expenseDetail">Communication</span>
        </label>
        <label>
          $ 500.00 <span className="expenseStatus">Approved</span>
        </label>
      </div>
      <div css={styles.expenseList} className="primary-text">
        <label>
          Telephone Expense
          <span className="expenseDetail">Communication</span>
        </label>
        <label>
          $ 500.00{" "}
          <span className="expenseStatus" style={{ color: "#E53E3E" }}>
            Rejected
          </span>
        </label>
      </div>
      <div css={styles.expenseList} className="primary-text">
        <label>
          Telephone Expense
          <label className="expenseDetail">Communication</label>
        </label>
        <label>
          $ 500.00 <label className="expenseStatus">Approved</label>
        </label>
      </div>
      <div style={{ display: open ? "block" : "none" }}>
        <div css={styles.expenseList} className="primary-text">
          <label>
            Telephone Expense
            <span className="expenseDetail">Communication</span>
          </label>
          <label>
            $ 500.00{" "}
            <span className="expenseStatus" style={{ color: "#E53E3E" }}>
              Rejected
            </span>
          </label>
        </div>
        <div css={styles.expenseList} className="primary-text">
          <label>
            Telephone Expense
            <span className="expenseDetail">Communication</span>
          </label>
          <label>
            $ 500.00 <span className="expenseStatus">Approved</span>
          </label>
        </div>
      </div>
      <button css={styles.viewMoreBtn} onClick={() => setOpen(!open)}>
        {open ? (
          <MdOutlineKeyboardArrowUp color="var(--white)" size={30} />
        ) : (
          <MdOutlineKeyboardArrowDown color="var(--white)" size={30} />
        )}{" "}
        View {open ? "Less" : "More"}
      </button>
    </div>
  );
};

export default Card;

const styles = {
  cardContainer: css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: var(--white);
    box-shadow: 0 4px 20px rgba(5, 14, 37, 0.05);
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 12px;
    .primary-text:nth-child(2n) {
      background: #f7f7f7;
    }
    .secondary-text {
      color: var(--primary);
      font-weight: 700;
      font-size: 16px;
      position: relative;
      span {
        position: absolute;
        color: var(--white);
        font-size: 10px;
        background: var(--primary);
        padding: 0 4px;
        justify-content: center;
        align-items: center;
        border-radius: 30px;
        margin-left: 5px;
      }
    }
  `,
  expenseList: css`
    display: flex;
    flex-direction: row;
    padding: 10px 12px;
    justify-content: space-between;
    border-bottom: 1px solid #e2e8f0;
    line-height: 20px;
    label {
      display: flex;
      flex-direction: column;
    }
    .expenseDetail {
      padding: 0 10px;
      font-size: 8px;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      background: #e0eeff;
      text-transform: uppercase;
      width: 65%;
    }
    .expenseStatus {
      font-size: 12px;
      color: #28bd41;
      text-transform: capitalize;
    }
  `,
  viewMoreBtn: css`
    background: none;
    border: none;
    color: #2d6db7;
    font-size: 14px;
    margin-top: 7px;
    svg {
      background: #2d6db7;
      border-radius: 50px;
      width: 18px;
      height: 18px;
      color: var(--white);
    }
  `,
};
