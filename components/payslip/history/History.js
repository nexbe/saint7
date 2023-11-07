/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import { css } from "@emotion/react";
import Card from "./Card";
import payslipStore from "../../../store/payslip";

const History = () => {
  const { getPayslip, payslips } = payslipStore();
  useEffect(() => {
    getPayslip();
  }, []);
  return (
    <div css={styles.wrapper}>
      {payslips &&
        payslips.data?.map((payslip) => {
          return (
            <div key={payslip?.id}>
              <Card data={payslip} />
            </div>
          );
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
    margin: 20px;
<<<<<<< HEAD
    max-height: 80 vh;
=======
    max-height: 72vh;
>>>>>>> 636baeef7f1dc12b1f1c82079ab30f367e7e0e24
    overflow-y: scroll;
    color: #000;
  `,
};
