/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import { css } from "@emotion/react";
import Card from "./Card";
import payslipStore from "../../../store/payslip";
import NoDataIcon from "/public/icons/noDataIcon";

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
      {payslips && payslips.data?.length == 0 && (
        <div css={styles.noDataContainer} className="primary-text">
          <NoDataIcon />
          <label>Nothing Here to show</label>
          <label>You don’t have any report request</label>
        </div>
      )}
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
    max-height: 72vh;
    overflow-y: scroll;
    color: #000;
  `,
  noDataContainer: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
};
