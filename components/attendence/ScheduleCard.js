/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import DutyModal from "./DutyModal";

const ScheduleCard = ({ state }) => {
  const [modal, setModal] = useState(false);
  return (
    <div onClick={() => setModal(true)}>
      <div css={styles.wrapper(state)}>
        <div css={styles.container}>
          <div>
            <img
              src={"images/defaultImage.jpg"}
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
              }}
            />
            <span>Christopher Young</span>
          </div>
          <div css={styles.box(state)}>
            <span style={{ color: "#fff" }}>
              {state ? "Complete" : "Incomplete"}
            </span>
          </div>
        </div>
        <div css={styles.info}>
          <p>9:05 - 16:10</p>
          <p>
            3891 Ranchview Dr. Richardson, <br />
            <span>California 62639</span>
          </p>
        </div>
      </div>
      <DutyModal isOpen={modal} close={() => setModal(!modal)} />
    </div>
  );
};

export default ScheduleCard;

const styles = {
  container: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 500;
    span {
      color: #2f4858;
      margin-left: 9px;
    }
    div {
      color: var(--primary);
    }
  `,
  box: (state) => css`
    border-radius: 5px;
    background: ${state ? "#293991" : "#EB5656"};
    padding: 0px 12px;
    height: 30px;
    text-align: center;
    font-size: 12px;
    font-weight: 600;
  `,
  info: css`
    display: flex;
    flex-direction: column;
    p {
      font-size: 14px;
      font-weight: 700;
    }
    span {
      font-size: 12px;
      font-weight: 600;
    }
  `,
  wrapper: (state) => css`
    padding: 20px;
    margin-top: 5px;
    color: #2f4858;
    border-radius: 9px;
    background: ${!state ? "#FFDBDB" : "#E3F3FF"};
  `,
};
