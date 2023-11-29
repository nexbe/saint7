/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import Card from "../../../../components/payslip/history/Card";
import Layout from "../../../../components/layout/Layout";
import HeaderNoti from "../../../../components/layout/HeaderNoti";
import userStore from "../../../../store/user";
import payslipStore from "../../../../store/payslip";
import NoDataIcon from "../../../../public/icons/noDataIcon";
import { useEffect } from "react";
import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";

const History = () => {
  const router = useRouter();
  const { id } = router.query;
  const { payUserId, getPaySlipData } = userStore((state) => state);
  const apolloClient = useApolloClient();
  const { getPayslipById, PayData } = payslipStore((state) => state);

  useEffect(() => {
    if (id) {
      getPaySlipData(id);
    }
  }, [id]);

  useEffect(() => {
    if (payUserId) {
      getPayslipById({
        apolloClient,
        where: { userId: payUserId },
      });
    }
  }, [payUserId]);

  return (
    <Layout>
      <HeaderNoti title={"Payslip"} href={"/home"} />
      <div style={{ height: 0 }}>
        <div css={styles.wrapper}>
          {PayData.length ? (
            PayData.map((data, index) => (
              <div key={index}>
                <Card data={data} />
              </div>
            ))
          ) : (
            <div css={styles.noDataContainer} className="primary-text">
              <NoDataIcon />
              <label>Nothing Here to show</label>
              <label>You don’t have any data.</label>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default History;

const styles = {
  wrapper: css`
    display: flex;
    flex-direction: column;
    gap: 9px;
    margin: 20px;
    max-height: 80vh;
    overflow-y: scroll;
    color: #000;
    ::-webkit-scrollbar {
      width: 2px;
      background-color: transparent;
    }
    .bodyContainer::-webkit-scrollbar-thumb {
      border-radius: 2px;
      background-color: var(--font-gray);
    }
    b {
      text-align: center;
    }
  `,
  noDataContainer: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
};
