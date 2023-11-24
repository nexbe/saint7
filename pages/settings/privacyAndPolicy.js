/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";

const PrivacyAndPolicy = () => {
  return (
    <Layout>
      <div css={styles.wrapper}>
        <HeaderNoti title={"Privacy Policy"} href={"/settings"} />
        <div css={styles.bodyContainer}>
          <div css={styles.termBox}>
            <label className="primary-text">Privacy Policy</label>
            <span>Last updated November 24, 2023</span>
            <p className="secondary-text">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, to Sed ut perspiciatis unde
              omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, tonatus error sit voluptatem accusantium doloremque
              laudantium, to Sed ut perspiciatis unde omnis iste natus error sit
              voluptatem accusantium doloremque laudantium, to <br />
              <br />
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, tonatus error sit voluptatem
              accusantium doloremque laudantium, to Sed ut perspiciatis unde
              omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, to Sed ut perspiciatis unde omnis iste natus error sit
              voluptatem accusantium doloremque laudantium, tonatus error sit
              voluptatem accusantium doloremque laudantium, to
              <br />
              <br />
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, to Sed ut perspiciatis unde
              omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, tonatus error sit voluptatem accusantium doloremque
              laudantium, to Sed ut perspiciatis unde omnis iste natus error sit
              voluptatem accusantium doloremque laudantium, to <br />
              <br />
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, tonatus error sit voluptatem
              accusantium doloremque laudantium, to
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyAndPolicy;

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
