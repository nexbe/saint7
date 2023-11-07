/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import Layout from "../../../../components/layout/Layout";
import HeaderNoti from "../../../../components/layout/HeaderNoti";
import EmailIcon from "../../../../public/icons/emailIcon";
import payslipStore from "../../../../store/payslip";

const index = () => {
  const { getPayInfo, payInfo } = payslipStore((state) => state);

  console.log(payInfo);

  return (
    <Layout>
      <HeaderNoti title={"Payslip"} href={"/payslip"} />
      <div css={styles.wrapper}>
        <div css={styles.card}>
          <h3 css={styles.title}>August 2023</h3>
          <ul css={styles.info}>
            <li>
              <span>Payment ID </span>: <b>AUG22-FT-0001</b>
            </li>
            <li>
              <span>Date of Payment </span>: <b>3 Aug 2023</b>
            </li>
          </ul>
        </div>
        <div css={styles.emailContainer}>
          <EmailIcon />
          <span>Sent Payslip To My Mail</span>
        </div>
        <div css={styles.card}>
          <div>
            <h3 css={styles.tableTitle}>Earning</h3>
            <table css={styles.table}>
              <tr>
                <td className="label">Basic Salary</td>
                <td className="value">$ 500</td>
              </tr>
              <tr>
                <td className="label">Allowance</td>
                <td className="value">$ 50</td>
              </tr>
              <tr>
                <td className="label">Total Earnings</td>
                <td className="value">$ 500</td>
              </tr>
            </table>
          </div>
          <div>
            <h3 css={styles.tableTitle}>Deduction</h3>
            <table css={styles.table}>
              <tr>
                <td className="label">Leave</td>
                <td className="value">$ 30</td>
              </tr>
              <tr>
                <td className="label">Tax</td>
                <td className="value">$ 20</td>
              </tr>
              <tr>
                <td className="label">Total Deductions</td>
                <td className="value">$ 50</td>
              </tr>
            </table>
          </div>
          <div>
            <span>Net Salary: $500</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default index;

const styles = {
  wrapper: css`
    display: flex;
    margin: 20px;
    flex-direction: column;
    gap: 9px;

    @media (min-width: 440px) {
      margin: 30px;
    }
  `,
  card: css`
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.8);
    padding: 15px;

    div {
      margin-top: 10px;
      margin-bottom: 9px;
    }

    span {
      font-size: 16px;
      font-weight: 700;
      color: #37474f;
    }
  `,
  title: css`
    font-weight: 700;
    color: #000;
    font-size: 16px;
  `,
  tableTitle: css`
    font-weight: 700;
    color: #37474f;
    font-size: 16px;
  `,
  info: css`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 5px;
    padding-left: 0rem;

    li {
      font-weight: 600;
      display: flex;
      align-items: center;
    }
    b {
      text-align: left;
      padding-left: 20px;
      font-size: 12px;
      margin-bottom: -5px;
    }
    span {
      min-width: 125px;
      text-align: left;
      font-size: 14px;
      margin-right: 10px;
      display: inline-block;
      margin-bottom: -5px;
    }
  `,
  emailContainer: css`
    margin-left: auto;
    span {
      color: var(--blue);
      font-size: 16px;
      font-weight: 600;
      margin-left: 9px;
      cursor: pointer;
      text-decoration: underline;
    }
  `,
  table: css`
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    padding: 20px;
    width: 100%;
    color: #000;
    font-size: 14px;
    font-weight: 400;

    tr {
      border-radius: 10px;
      border: 1px solid #e2e8f0;
    }

    td {
      border: 1px solid #e2e8f0;
      padding: 10px;
    }
    .label {
      text-align: left;
    }

    .value {
      text-align: right;
    }
  `,
};
