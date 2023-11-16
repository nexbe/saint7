/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import Layout from "../../../components/layout/Layout";
import HeaderNoti from "../../../components/layout/HeaderNoti";
import PayUser from "../../../components/payslip/payUser";
import { css } from "@emotion/react";
import CreatePayslip from "../../../components/payslip/CreatePayslip";

const Payslip = () => {
  const [activeComponent, setActiveComponent] = useState("view");
  return (
    <Layout>
      <HeaderNoti title={"Payslip"} href={"/home"} />
      <div css={styles.tabComponent}>
        <div
          css={activeComponent === "view" ? styles.activeTab : styles.tabpane}
          onClick={() => setActiveComponent("view")}>
          View Payslips
        </div>
        <div
          css={activeComponent === "create" ? styles.activeTab : styles.tabpane}
          onClick={() => setActiveComponent("create")}>
          Create New Payslip
        </div>
      </div>
      <div css={styles.container}>
        {activeComponent === "view" ? <PayUser /> : <CreatePayslip />}
      </div>
    </Layout>
  );
};

export default Payslip;
const styles = {
  tabpane: css`
    display: flex;
    margin: 10px;
    flex-direction: row;
    color: var(--darker-gray);
    gap: 40px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
  `,
  tabComponent: css`
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    border-bottom: 0.4px solid rgba(160, 174, 192, 0.8);
    background: #e3f3ff;
    padding: 5px;
  `,
  activeTab: css`
    border-radius: 5px;
    color: #fff;
    padding: 9px 28px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    background: var(--primary);
  `,
  container: css`
    max-height: 30vh;
  `,
};
