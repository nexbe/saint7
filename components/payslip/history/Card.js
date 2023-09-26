/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { useRouter } from "next/navigation";

const Card = ({ data }) => {
  const router = useRouter();
  return (
    <div css={styles.wrapper}>
      <h3 css={styles.title}>{data}</h3>
      <div css={styles.info}>
        <ul>
          <li>
            <span> Total Earning</span>: <b>$550</b>
          </li>
          <li>
            <span>Total Deduction </span>: <b>$50</b>
          </li>
          <li style={{ fontWeight: "600", marginTop: "9px" }}>
            <span>Net Salary</span>: <b>$50</b>
          </li>
        </ul>
        <button css={styles.viewSlipBtn} onClick={() => router.push(`/payslip/${2}`)}>View Slip</button>
      </div>
    </div>
  );
};

export default Card;

const styles = {
  wrapper: css`
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.8);
    padding: 15px;
  `,
  title: css`
    font-weight: 700;
    color: #000;
    font-size: 16px;
  `,
  info: css`
    display: flex;
    flex-direction: row;
    gap: 20px;

    ul {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 5px;
    }
    li {
      color: var(--primary);
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      display: flex;
    }
    b {
      font-weight: 600;
      text-align: left;
      padding-left: 20px;
    }
    span {
      min-width: 125px;
      text-align: left;
      margin-right: 10px;
      display: inline-block;
    }
  `,
  viewSlipBtn: css`
    padding: 5px;
    border-radius: 4px;
    border: 2px solid #a0aec0;
    background: transparent;
    color: #a0aec0;
    font-weight: 700;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
    margin-top: 15px;
    height: 40px;
    max-width: 200px;
    min-width: 90px;
  `,
};