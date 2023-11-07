/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import { css } from "@emotion/react";
import Card from "./Card";
import payslipStore from "../../../store/payslip";

const History = () => {
  const { getPayslip ,payslips } = payslipStore();
  useEffect(() => {
    getPayslip();
  },[])
  return (
    <div css={styles.wrapper}>
      {payslips && payslips.data?.map((payslip) => {
        return (
          <Card data={payslip} key={payslip?.id} />
        )
      })}
    </div>
  );
};

export default History;

const styles = {
  wrapper: css`
    display: flex;
    flex-direction: column;
    gap: 9px;
    margin:20px;
    max-height: 72vh;
    overflow-y: scroll;
    color: #000;
    @media (min-width: 440px) {
      margin: 30px;
    }
  `,
};
