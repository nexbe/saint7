/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useApolloClient } from "@apollo/client";

import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";
import Card from "../../components/eLeave/Card";
import NoDataIcon from "/public/icons/noDataIcon";
import authStore from "../../store/auth";
import leavestore from "../../store/eLeave";
import NotificationBox from "../../components/notification/NotiBox";
import Loading from "../../components/Loading";

const LeaveHistory = () => {
  const router = useRouter();
  const apolloClient = useApolloClient();
  const { user } = authStore((state) => state);
  const {
    getAllLeaves,
    LeaveInfo: leaveInfo,
    loading,
  } = leavestore((state) => state);

  const [activeTab, setActiveTab] = useState(1);
  const [pendingData, setPendingData] = useState(leaveInfo);
  const [approvedData, setApprovedData] = useState(leaveInfo);
  const [rejectedData, setRejectedData] = useState(leaveInfo);

  useEffect(() => {
    if (!!user?.id) {
      getAllLeaves({
        apolloClient,
        where: { userId: user.id },
      });
    }
  }, [user]);

  useMemo(() => {
    if (!!leaveInfo) {
      const pendingList = leaveInfo.filter(
        (item) => item && item.status && item.status.toLowerCase() === "pending"
      );
      setPendingData(pendingList);
      const approvedList = leaveInfo.filter(
        (item) =>
          item && item.status && item.status.toLowerCase() === "approved"
      );
      setApprovedData(approvedList);
      const rejectedList = leaveInfo.filter(
        (item) =>
          item && item.status && item.status.toLowerCase() === "rejected"
      );
      setRejectedData(rejectedList);
    }
  }, [leaveInfo]);

  return (
    <Layout>
      <div css={styles.wrapper}>
        <HeaderNoti title={"Leave History"} href={"/eLeave"} />
        <div style={{ position: "relative", margin: "2px 10px" }}>
          <NotificationBox
            message={router.query.message}
            timeout={3000}
            label={router?.query?.label}
          />
        </div>
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
              <>
                {pendingData && pendingData.length > 0 && (
                  <div css={styles.cardWrapper}>
                    {pendingData.map((eachLeave, index) => (
                      <div key={index}>
                        <Card eachLeave={eachLeave} />
                      </div>
                    ))}
                  </div>
                )}
                {pendingData && pendingData.length == 0 && (
                  <div css={styles.noDataContainer} className="primary-text">
                    <NoDataIcon />
                    <label>Nothing Here to show</label>
                    <label>You don’t have any report request</label>
                  </div>
                )}
              </>
            )}
            {activeTab == 2 && (
              <>
                {approvedData && approvedData.length > 0 && (
                  <div css={styles.cardWrapper}>
                    {approvedData.map((eachLeave, index) => (
                      <div key={index}>
                        <Card eachLeave={eachLeave} />
                      </div>
                    ))}
                  </div>
                )}
                {approvedData && approvedData.length == 0 && (
                  <div css={styles.noDataContainer} className="primary-text">
                    <NoDataIcon />
                    <label>Nothing Here to show</label>
                    <label>You don’t have any report request</label>
                  </div>
                )}
              </>
            )}
            {activeTab == 3 && (
              <>
                {rejectedData && rejectedData.length > 0 && (
                  <div css={styles.cardWrapper}>
                    {rejectedData.map((eachLeave, index) => (
                      <div key={index}>
                        <Card eachLeave={eachLeave} />
                      </div>
                    ))}
                  </div>
                )}
                {rejectedData && rejectedData.length == 0 && (
                  <div css={styles.noDataContainer} className="primary-text">
                    <NoDataIcon />
                    <label>Nothing Here to show</label>
                    <label>You don’t have any report request</label>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {loading && <Loading isOpen={loading} />}
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
  noDataContainer: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
};
