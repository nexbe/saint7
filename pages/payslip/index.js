/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { css } from "@emotion/react";
import HeaderNoti from "../../components/layout/HeaderNoti";
import Payment from "../../components/payslip/payment/Payment";
import History from "../../components/payslip/history/History";

const Payslip = () => {
  const [activeComponent, setActiveComponent] = useState("payment");
  return (
    <Layout>
      <HeaderNoti title={"Payslip"} href={"/home"} />
      <ul css={styles.tabpane}>
        <li
          onClick={() => setActiveComponent("payment")}
          css={activeComponent === "payment" ? styles.activeTab : ""}>
          Payment
        </li>
        <li
          onClick={() => setActiveComponent("history")}
          css={activeComponent === "history" ? styles.activeTab : ""}>
          History
        </li>
      </ul>
      <div css={styles.tabComponent}>
        {activeComponent === "payment" ? <Payment /> : <History />}
      </div>

    </Layout>
  );
};


export default Payslip;

const styles = {
  activeTab: css`
    color: var(--primary);
    border-bottom: 2px solid var(--primary);
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
  `,
  tabpane: css`
    display: flex;
    margin: 20px;
    flex-direction: row;
    color: var(--darker-gray);
    gap: 40px;
    border-bottom: 1px solid rgba(196, 196, 196, 0.3);
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    list-style: none;
  `,
  tabComponent: css`
    margin: 0px 10px 0px 10px;

  `,
};
