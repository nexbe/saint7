/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import { css } from "@emotion/react";
import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";
import EmailIcon from "../../public/icons/emailIcon";
import payslipStore from "../../store/payslip";
import { useRouter } from "next/router";
import dayjs from "dayjs";

const PayslipDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const { getPayslipByID, payslipDetails } = payslipStore();
  useEffect(() => {
    if (id) {
      getPayslipByID({
        id: id,
      });
    }
  }, []);

  const calculateTotalEarning = () => {
    let total = 0;
    if (
      payslipDetails?.attributes?.additionalTransactions &&
      payslipDetails?.attributes?.additionalTransactions.length !== 0
    ) {
      const totalAdditation =
        payslipDetails?.attributes?.additionalTransactions.reduce(
          (accumulator, current) => {
            if (current.options === "add") {
              return accumulator + current?.value;
            }
            return accumulator;
          },
          0
        );
      total =
        payslipDetails?.attributes?.basicSalary +
        (payslipDetails?.attributes?.allowance || 0) +
        totalAdditation;
    } else {
      total =
        payslipDetails?.attributes?.basicSalary +
        (payslipDetails?.attributes?.allowance || 0);
    }
    return total;
  };

  const calculateTotalDeduction = () => {
    const totalDeduction =
      payslipDetails?.attributes?.additionalTransactions.reduce(
        (accumulator, current) => {
          if (current.options === "deduct") {
            return accumulator + current.value;
          }
          return accumulator;
        },
        0
      );

    return totalDeduction;
  };

  return (
    <Layout>
      <HeaderNoti title={"Payslip"} href={"/payslip"} />
      <div css={styles.wrapper}>
        <div css={styles.card}>
          <h3 css={styles.title}>
            {payslipDetails?.attributes?.month}{" "}
            {payslipDetails?.attributes?.year}
          </h3>
          <ul css={styles.info}>
            <li>
              <span>Payment ID </span>: <b>AUG22-FT-0001</b>
            </li>
            <li>
              <span>Date of Payment </span>:{" "}
              <b>
                {dayjs(payslipDetails?.attributes?.payDate, {
                  format: "YYYY-MM-DD",
                }).format("D MMM YYYY")}
              </b>
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
                <td className="value">
                  $ {payslipDetails?.attributes?.basicSalary}
                </td>
              </tr>
              <tr>
                <td className="label">Allowance</td>
                <td className="value">
                  $ {payslipDetails?.attributes?.allowance || 0}
                </td>
              </tr>
              {payslipDetails?.attributes?.additionalTransactions &&
                payslipDetails?.attributes?.additionalTransactions.length > 0 &&
                payslipDetails?.attributes?.additionalTransactions.map(
                  (data) => {
                    if (data.options === "add") {
                      return (
                        <tr key={data?.id}>
                          <td className="label">{data.key}</td>
                          <td className="value">$ {data.value}</td>
                        </tr>
                      );
                    }
                  }
                )}
              <tr>
                <td className="label">Total Earnings</td>
                <td className="value">$ {calculateTotalEarning()}</td>
              </tr>
            </table>
          </div>
          <div>
            <h3 css={styles.tableTitle}>Deduction</h3>
            <table css={styles.table}>
              {payslipDetails?.attributes?.additionalTransactions &&
                payslipDetails?.attributes?.additionalTransactions.length > 0 &&
                payslipDetails?.attributes?.additionalTransactions.map(
                  (data) => {
                    if (data.options === "deduct") {
                      return (
                        <tr key={data?.id}>
                          <td className="label">{data.key}</td>
                          <td className="value">$ {data.value}</td>
                        </tr>
                      );
                    }
                  }
                )}
              <tr>
                <td className="label">Total Deductions</td>
                <td className="value">${calculateTotalDeduction()}</td>
              </tr>
            </table>
          </div>
          <div>
            <span>
              Net Salary: ${calculateTotalEarning() - calculateTotalDeduction()}
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PayslipDetails;

const styles = {
  wrapper: css`
    display: flex;
    margin: 20px;
    flex-direction: column;
    gap: 9px;
    max-height: 72vh;
    overflow-y: scroll;

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
    }
    span {
      min-width: 125px;
      text-align: left;
      font-size: 14px;
      margin-right: 10px;
      display: inline-block;
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
