/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { useRouter } from "next/router";

import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";
import Card from "../../components/eLeave/Card";

const LeaveHistory = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(1);
  const [count, setCount] = useState(2023);
  const [modalOpen, setModalOpen] = useState(false);
  const [dateModalOpen, setDateModalOpen] = useState(false);

  const filterModal = () => {
    setModalOpen(!modalOpen);
  };
  const dateModal = () => {
    setDateModalOpen(!dateModalOpen);
  };

  // Increment function
  const increment = () => {
    setCount(count + 1);
  };

  // Decrement function
  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <Layout>
      <div css={styles.wrapper}>
        <HeaderNoti title={"Leave History"} href={"/eLeave"} />
        <div css={styles.bodyContainer}>
          <div css={styles.statusContainer} className="primary-text">
            <div css={styles.statusHeader}>
              <label
                css={activeTab == 1 ? styles.activeColor : ""}
                onClick={() => setActiveTab(1)}
              >
                Pending
              </label>
              <label
                css={activeTab == 2 ? styles.activeColor : ""}
                onClick={() => setActiveTab(2)}
              >
                Approved
              </label>
              <label
                css={activeTab == 3 ? styles.activeColor : ""}
                onClick={() => setActiveTab(3)}
              >
                Rejected
              </label>
            </div>
            {activeTab == 1 && (
              <div css={styles.cardWrapper}>
                <Card
                  leaveDay={2}
                  requestTo={"Ken Ling (Admin)"}
                  leaveReason={"Going to Hospital"}
                  approvedBy={"Ken Ling (Admin)"}
                  startDate={"Aug / 04 / 22"}
                  endDate={"Aug / 05 / 22"}
                  leaveStatus={"Pending"}
                />
                <Card
                  leaveDay={1}
                  requestTo={"Ken Ling (Admin)"}
                  leaveReason={"Going to Hospital"}
                  approvedBy={"Ken Ling (Admin)"}
                  startDate={"Aug / 10 / 22"}
                  endDate={"Aug / 10 / 22"}
                  leaveStatus={"Pending"}
                />
                <Card
                  leaveDay={3}
                  requestTo={"Ken Ling (Admin)"}
                  leaveReason={"Going to Hospital"}
                  approvedBy={"Ken Ling (Admin)"}
                  startDate={"Aug / 29 / 22"}
                  endDate={"Aug / 31 / 22"}
                  leaveStatus={"Pending"}
                />
              </div>
            )}
            {activeTab == 2 && (
              <div css={styles.cardWrapper}>
                <Card
                  leaveDay={2}
                  requestTo={"Ken Ling (Admin)"}
                  leaveReason={"Going to Hospital"}
                  approvedBy={"Ken Ling (Admin)"}
                  startDate={"Aug / 04 / 22"}
                  endDate={"Aug / 05 / 22"}
                  leaveStatus={"Approved"}
                />
                <Card
                  leaveDay={1}
                  requestTo={"Ken Ling (Admin)"}
                  leaveReason={"Going to Hospital"}
                  approvedBy={"Ken Ling (Admin)"}
                  startDate={"Aug / 10 / 22"}
                  endDate={"Aug / 10 / 22"}
                  leaveStatus={"Approved"}
                />
                <Card
                  leaveDay={3}
                  requestTo={"Ken Ling (Admin)"}
                  leaveReason={"Going to Hospital"}
                  approvedBy={"Ken Ling (Admin)"}
                  startDate={"Aug / 29 / 22"}
                  endDate={"Aug / 31 / 22"}
                  leaveStatus={"Approved"}
                />
              </div>
            )}
            {activeTab == 3 && (
              <div css={styles.cardWrapper}>
                <Card
                  leaveDay={2}
                  requestTo={"Ken Ling (Admin)"}
                  leaveReason={"Going to Hospital"}
                  approvedBy={"Ken Ling (Admin)"}
                  startDate={"Aug / 04 / 22"}
                  endDate={"Aug / 05 / 22"}
                  leaveStatus={"Rejected"}
                />
                <Card
                  leaveDay={1}
                  requestTo={"Ken Ling (Admin)"}
                  leaveReason={"Going to Hospital"}
                  approvedBy={"Ken Ling (Admin)"}
                  startDate={"Aug / 10 / 22"}
                  endDate={"Aug / 10 / 22"}
                  leaveStatus={"Rejected"}
                />
                <Card
                  leaveDay={3}
                  requestTo={"Ken Ling (Admin)"}
                  leaveReason={"Going to Hospital"}
                  approvedBy={"Ken Ling (Admin)"}
                  startDate={"Aug / 29 / 22"}
                  endDate={"Aug / 31 / 22"}
                  leaveStatus={"Rejected"}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LeaveHistory;

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
    margin: 10px 15px;
    gap: 12px;
    font-family: Inter;
    font-style: normal;
    ::-webkit-scrollbar {
      width: 2px;
      background-color: transparent;
    }
    .bodyContainer::-webkit-scrollbar-thumb {
      border-radius: 2px;
      background-color: var(--font-gray);
    }
  `,
  statusContainer: css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
  `,
  statusHeader: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: #a0aec0;
    border-bottom: 1px solid rgba(196, 196, 196, 0.3);
  `,
  activeColor: css`
    color: var(--primary);
    border-bottom: 1px solid var(--primary);
  `,
  cardWrapper: css`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,
};
