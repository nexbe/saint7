/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { GoQuestion, GoInfo } from "react-icons/go";
import { PiFileTextLight, PiShieldCheck } from "react-icons/pi";
import { MdLogout } from "react-icons/md";

import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";
import ConfirmModal from "../../components/Modal/LogoutModal";
import authStore from "../../store/auth";

const Settings = () => {
  const { user } = authStore((state) => state);
  const router = useRouter();
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const cusotmerSupportHandler = (e) => {
    const email = "saint_customersupport.com";
    e.preventDefault();
    window.location.href = `mailto:${email}`;
  };
  return (
    <Layout>
      <div css={styles.wrapper}>
        <HeaderNoti title={"Setting"} onClick={() => router.back()} />
        <div css={styles.bodyContainer}>
          {user?.role?.name.toLowerCase() != "admin" && (
            <div className="primary-text" onClick={cusotmerSupportHandler}>
              <GoQuestion color="rgba(47, 72, 88, 1)" size={20} /> Support
            </div>
          )}
          <div
            className="primary-text"
            onClick={() => router.push("/settings/termAndCondition")}
          >
            <PiFileTextLight color="rgba(47, 72, 88, 1)" size={20} /> Terms and
            Conditions
          </div>
          <div
            className="primary-text"
            onClick={() => router.push("/settings/privacyAndPolicy")}
          >
            <PiShieldCheck color="rgba(47, 72, 88, 1)" size={20} /> Privacy
            Policy
          </div>
          <div
            className="primary-text"
            onClick={() => router.push("/settings/appInfo")}
          >
            <GoInfo color="rgba(47, 72, 88, 1)" size={20} /> App Info
          </div>
          <div
            className="primary-text"
            onClick={() => {
              setOpenLogoutModal(!openLogoutModal);
            }}
          >
            <MdLogout color="rgba(47, 72, 88, 1)" size={20} /> Log Out
          </div>
        </div>
      </div>
      {openLogoutModal && (
        <ConfirmModal modal={openLogoutModal} setModal={setOpenLogoutModal} />
      )}
    </Layout>
  );
};

export default Settings;

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
    margin: 20px;
    gap: 16px;
    div {
      cursor: pointer;
      padding: 10px 16px;
      display: flex;
      gap: 14px;
      justify-content: flex-start;
      align-items: center;
      border-radius: 10px;
      border: 0.2px solid #ededed;
      background: var(--white);
      box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.08);
    }
    ::-webkit-scrollbar {
      width: 2px;
      background-color: transparent;
    }
    .bodyContainer::-webkit-scrollbar-thumb {
      border-radius: 2px;
      background-color: var(--font-gray);
    }
  `,
};
