/** @jsxImportSource @emotion/react */
import React from "react";
import Layout from "../../../components/layout/Layout";
import { css } from "@emotion/react";
import HeaderNoti from "../../../components/layout/HeaderNoti";
import ConfirmationCard from "../../../components/documents/ConfirmationCard";

const Confirmation = () => {
  return (
    <Layout>
      <div css={styles.wrapper}>
        <HeaderNoti
          title={"Acceptance Confirmation"}
          href={"/documents/Manager"}
        />
        <div css={styles.bodyContainer}>
          <ConfirmationCard />
        </div>
      </div>
    </Layout>
  );
};

export default Confirmation;
const styles = {
  wrapper: css`
    flex: 1 1 auto;
    height: 0px;
    display: flex;
    flex-direction: column;
    margin: 0;
    background: var(--background);
    position: relative;
  `,
  bodyContainer: css`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    min-height: 200px;
    margin: 10px;
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
};
