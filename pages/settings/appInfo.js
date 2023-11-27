/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";

import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";
import LoginLogo from "/public/icons/LoginLogo";

const AppInfo = () => {
  const [appUpdate, setAppUpdate] = useState(false);

  const handleUpdateCheck = () => {
    setAppUpdate(true);

    setTimeout(() => {
      setAppUpdate(false);
    }, 3000);
  };

  return (
    <Layout>
      <div css={styles.wrapper}>
        <HeaderNoti title={"App Info"} href={"/settings"} />
        <div css={styles.bodyContainer}>
          <div css={styles.infoBox}>
            <label className="header-text">Saint 7 Security Mobile App</label>
            <label className="secondary-text">Version 1.02</label>
            <LoginLogo />
            <button
              id="login"
              type="submit"
              css={styles.checkBtn}
              onClick={handleUpdateCheck}
            >
              Check for update
            </button>
            {!!appUpdate && (
              <div css={styles.updateStatus}>
                Your app is the latest version !
              </div>
            )}
            <div css={styles.copyRight}>
              <span>Copyright © 2023 .Saint 7 Security Mobile App.</span>
              <span>All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AppInfo;

const styles = {
  wrapper: css`
    flex: 1 1 auto;
    height: 0px;
    display: flex;
    flex-direction: column;
    margin: 0;
    background: var(--background);
  `,
  bodyContainer: css`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    min-height: 200px;
    margin: 12px;
    gap: 16px;
    ::-webkit-scrollbar {
      width: 2px;
      background-color: transparent;
    }
    .bodyContainer::-webkit-scrollbar-thumb {
      border-radius: 2px;
      background-color: var(--font-gray);
    }
  `,
  infoBox: css`
    background: var(--white);
    border-radius: 10px;
    height: 100vh;
    justify-content: center;
    align-items: center;
    box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.08);
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    line-height: 30px;
    gap: 5px;
    label {
      color: #2f4858;
    }
  `,
  checkBtn: css`
    background: var(--primary);
    color: var(--white);
    width: 100%;
    height: 40px;
    padding: 9px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    font-weight: 700;
    font-size: 18px;
    cursor: pointer;
    border: 1px solid transparent;
  `,
  updateStatus: css`
    background: rgba(38, 50, 56, 0.88);
    color: var(--white);
    width: auto;
    height: 35px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    font-weight: 300;
    font-size: 16px;
  `,
  copyRight: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10%;
    color: #a0aec0;
    font-size: 12px;
    font-weight: 300;
    line-height: 18px;
  `,
};
