/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { useRouter } from "next/navigation";
import userStore from "../../../store/auth";
import payslipStore from "../../../store/payslip";

const Card = ({ data, payData }) => {
  const router = useRouter();
  const { user } = userStore((state) => state);
  const { getPayInfo } = payslipStore((state) => state);

  const handleClick = () => {
    getPayInfo(payData);
    router.push({
      pathname:
        user?.role?.name === "Admin" || user?.role?.name === "Manager"
          ? `/payslip/Manager/${2}`
          : `/payslip/${2}`,
    });
  };

  return (
    <div css={styles.wrapper}>
      <h3 css={styles.title}>{data}</h3>
      <div css={styles.info}>
        <ul>
          <li>
            <span> Basic Salary</span>:{" "}
            <b>${payData?.attributes?.basicSalary ?? 0}</b>
          </li>
          <li>
            <span>Total Deduction </span>:{" "}
            <b>${payData?.attributes?.totalDeduction ?? 0}</b>
          </li>
          <li>
            <span>Allowance</span>:{" "}
            <b>${payData?.attributes?.allowance ?? 0}</b>
          </li>
          <li style={{ fontWeight: "600", marginTop: "9px" }}>
            <span>Net Salary</span>:{" "}
            <b>${payData?.attributes?.netSalary ?? 0}</b>
          </li>
        </ul>
        <button
          css={styles.viewSlipBtn}
          onClick={() => {
            handleClick();
          }}
        >
          View Slip
        </button>
      </div>
    </div>
  );
};

export default Card;

const styles = {
  wrapper: css`
    border-radius: 8px;
    background: #fff;
    padding: 15px;
    color: #000;
  `,
  title: css`
    font-weight: 700;
    color: #000;
    font-size: 16px;
  `,
  info: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 20px;

    ul {
      display: flex;
      flex-direction: column;
      gap: 9px;
      padding-left: 0rem;
      margin-top: 5px;
    }
    li {
      color: #000;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      display: flex;
    }
    b {
      font-weight: 600;
      text-align: left;
      padding-left: 20px;
    }
    span {
      min-width: 110px;
      text-align: left;
      margin-right: 10px;
      display: inline-block;
    }
  `,
  viewSlipBtn: css`
    border-radius: 4px;
    border: 2px solid #a0aec0;
    background: transparent;
    color: #a0aec0;
    font-weight: 700;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
    margin-top: 15px;
    height: 30px;
    max-width: 200px;
    min-width: 90px;
  `,
};
