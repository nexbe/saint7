/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";
import { css } from "@emotion/react";
import CheckInOut from "../../components/attendence/CheckInOut";

const Index = () => {
  const [activeComponent, setActiveComponent] = useState("check");
  return (
    <Layout className="container ">
      <HeaderNoti title={"Attendance"} href={"/home"} />
      <div css={styles.tabComponent}>
        <div
          css={activeComponent === "check" ? styles.activeTab : styles.tabpane}
          onClick={() => setActiveComponent("check")}>
          Check In/Out
        </div>
        <div
          css={
            activeComponent === "history" ? styles.activeTab : styles.tabpane
          }
          onClick={() => setActiveComponent("history")}>
          Attendance History
        </div>
      </div>
      {activeComponent === "check" ? <CheckInOut /> : "History"}
    </Layout>
  );
};

export default Index;

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
    justify-content:space-around;
    flex-direction: row;
    border-bottom: 0.4px solid #2f4858;
    background: #e3f3ff;
    padding: 9px;
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
};
