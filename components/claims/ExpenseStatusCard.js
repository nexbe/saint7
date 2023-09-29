/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { css } from "@emotion/react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

const Card = ({ date, count, amount }) => {
  const [cardDetail, setCardDetail] = useState(false);

  return (
    <div css={styles.cardContainer}>
      <div
        css={styles.approvedCard}
        style={{
          color: cardDetail ? "var(--white)" : "",
          background: cardDetail ? "var(--primary)" : "",
          borderRadius: cardDetail ? "10px 10px 0 0" : "",
        }}
        className="primary-text"
      >
        <label>{date}</label>
        <label
          className="count"
          style={{
            border: cardDetail ? "1px solid var(--white)" : "",
          }}
        >
          {count}
        </label>
        <label>{amount}</label>
        <label onClick={() => setCardDetail(!cardDetail)}>
          {cardDetail ? (
            <MdOutlineKeyboardArrowUp color="var(--white)" size={30} />
          ) : (
            <MdOutlineKeyboardArrowDown color="var(--primary)" size={30} />
          )}
        </label>
      </div>
      <div
        style={{ display: cardDetail ? "block" : "none" }}
        className="detailWrapper"
      >
        <div css={styles.detailContainer} className="primary-text">
          <label>
            <label css={styles.expenseId}>#ER-00001</label>
            Telephone Expense
            <label css={styles.expenseDetail}>Communication</label>
          </label>
          <label>SGD 500.00</label>
        </div>
        <div css={styles.detailContainer} className="primary-text">
          <label>
            <label css={styles.expenseId}>#ER-00002</label>
            Telephone Expense
            <label css={styles.expenseDetail}>Communication</label>
          </label>
          <label>SGD 500.00</label>
        </div>
        <div css={styles.detailContainer} className="primary-text">
          <label>
            <label css={styles.expenseId}>#ER-00003</label>
            Telephone Expense
            <label css={styles.expenseDetail}>Communication</label>
          </label>
          <label>SGD 200.00</label>
        </div>
      </div>
    </div>
  );
};

export default Card;

const styles = {
  cardContainer: css`
    display: flex;
    flex-direction: column;
    gap: 8px;
    .detailWrapper {
      margin-top: -6px;
      .primary-text:last-child {
        border-radius: 0 0 10px 10px;
      }
    }
  `,
  approvedCard: css`
    display: flex;
    padding: 15px 12px;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    opacity: 0.8;
    background: #e3f3ff;
    color: var(--primary);
    box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.08);
    @media (max-width: 700px) {
      font-size: 13px;
    }
    .count {
      border: 1px solid var(--primary);
      border-radius: 50px;
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `,
  detailContainer: css`
    display: flex;
    flex-direction: row;
    line-height: 25px;
    padding: 5px 10px;
    justify-content: space-between;
    background: var(--white);
    box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.08);
    border-bottom: 1px solid #e2e8f0;
    label {
      display: flex;
      flex-direction: column;
    }
  `,
  eachCard: css`
    display: flex;
    flex-direction: row;
    line-height: 25px;
    padding: 7px 10px;
    justify-content: space-between;
    border-radius: 10px;
    background: var(--white);
    box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.08);
    label {
      display: flex;
      flex-direction: column;
    }
  `,
  expenseId: css`
    display: flex;
    font-size: 10px;
    font-weight: 400;
  `,
  expenseDetail: css`
    padding: 0px 10px;
    font-size: 8px;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    background: #e0eeff;
    text-transform: uppercase;
    width: 65%;
  `,
  expenseStatus: css`
    font-size: 10px;
    color: #28bd41;
    text-transform: uppercase;
    height: 18px;
    padding: 0px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    background: rgba(250, 126, 11, 0.2);
    color: #fa7e0b;
  `,
};
