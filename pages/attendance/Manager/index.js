/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import Layout from "../../../components/layout/Layout";
import HeaderNoti from "../../../components/layout/HeaderNoti";

const Attendance = () => {
  const router = useRouter();
  return (
    <Layout>
      <HeaderNoti title={"Attendance"} href={"/home"} />
      <div css={styles.bodyContainer}>
        <div className="header-text" onClick={() => router.push("/attendance/Manager/guardPunctuality")}>
          Check Guard Punctuality
        </div>
        <div className="header-text" onClick={() => router.push("/attendance/Manager/assignUser")}>
          Assign User
        </div>
        <div className="header-text" onClick={() => router.push("/attendance/Manager/schedule")}>
          Schedule
        </div>
      </div>
    </Layout>
  );
};

export default Attendance;
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
    gap: 30px;
    div {
      font-size: 18px;
      cursor: pointer;
      padding: 20px 30px;
      border-radius: 8px;
      background: var(--primary);
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0px 10px 60px 0px rgba(0, 0, 0, 0.08);
    }
  `,
};
