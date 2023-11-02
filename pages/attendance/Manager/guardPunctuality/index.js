/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Layout from "../../../../components/layout/Layout";
import HeaderNoti from "../../../../components/layout/HeaderNoti";
import Card from "../../../../components/attendence/GuardPunctuality/Card";

const GuardPunctuality = () => {
  return (
    <Layout>
      <HeaderNoti title={"Check Guard Punctuality"} href={"/attendance/Manager"} />
      <div css={styles.bodyWrapper}>
        <div>
          <h4>Today</h4>
          <Card state={false}/>
          <Card state={true}/>
        </div>
        <div>
          <h4>16th June ,2023</h4>
          <Card state={false}/>
          <Card state={true}/>
        </div>
      </div>
    </Layout>
  );
};

export default GuardPunctuality;

const styles = {
  bodyWrapper: css`
    h4 {
      margin: 20px;
      font-size: 20px;
      font-weight: 600;
      color: var(--primary-font);
    }
    max-height: 82vh;
    overflow-y: scroll;
  `,
};
