/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";

const TermsAndConditions = () => {
  return (
    <Layout>
      <div css={styles.wrapper}>
        <HeaderNoti title={"Terms and Conditions"} href={"/settings"} />
        <div css={styles.bodyContainer}>
          <div css={styles.termBox}>
            <label className="primary-text">Terms and Conditions</label>
            <span>Last updated November 24, 2023</span>
            <p className="secondary-text">
              I have checked the edited by salary detail and it is correct. This
              will be a contract between me and the company. <br />I understand
              the company policy that I need to check in and out my attendance
              digitally and if I am unable to check in or out due to app error,
              I need to immediately inform my Operations Executive (OE) of the
              occurrence. Failing to check in and out digital will cause delay
              in my payment for that day. I will have to submit an appeal and
              give evidence of my attendance for that day. The company policy is
              an admin fee $20 per day will charged if its due to my failing to
              check in and out without a valid reason.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsAndConditions;

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
    ::-webkit-scrollbar {
      width: 2px;
      background-color: transparent;
    }
    .bodyContainer::-webkit-scrollbar-thumb {
      border-radius: 2px;
      background-color: var(--font-gray);
    }
  `,
  termBox: css`
    background: var(--white);
    border-radius: 10px;
    border: 0.2px solid #ededed;
    box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.08);
    padding: 15px 20px;
    display: flex;
    flex-direction: column;
    line-height: 25px;
    gap: 5px;
    span {
      color: #68cef4;
      font-size: 12px;
      font-weight: 3000;
    }
  `,
};
