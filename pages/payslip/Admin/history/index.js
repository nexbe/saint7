/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import Card from "../../../../components/payslip/history/Card";
import Layout from "../../../../components/layout/Layout";
import HeaderNoti from "../../../../components/layout/HeaderNoti";
import userStore from "../../../../store/user";
import payslipStore from "../../../../store/payslip";
import { useEffect } from "react";
import { useApolloClient } from "@apollo/client";

const History = () => {
  const { payUserId } = userStore((state) => state);
  const apolloClient = useApolloClient();
  const { getPayslipById, PayData } = payslipStore((state) => state);

  useEffect(() => {
    getPayslipById({
      apolloClient,
      where: { userId: payUserId },
    });
  }, [payUserId]);

  return (
    <Layout>
      <HeaderNoti title={"Payslip"} href={"/home"} />
      <div style={{ height: 0 }}>
        <div css={styles.wrapper}>
          {PayData.length
            ? PayData.map((data, index) => (
                <div key={index}>
                  <Card data={data} />
                </div>
              ))
            : null}
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
  `,
};