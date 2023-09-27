/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import ActiveIcon from "../../public/icons/activeIcon";
import ProfileIcon from "../../public/icons/profileIcon";
import ViewModal from "./ViewModal";

const Card = ({ isActive }) => {
  const [modal, setModal] = useState(false);
  return (
    <div css={styles.wrapper(isActive)}>
      <div css={styles.header}>
        {isActive && <ActiveIcon />}
        <span>A Continually Unfolding History</span>
      </div>
      <p css={styles.paragraph}>
        A single building occupies the hillside at Hillview,a historic
        240-hectare former sheep farm on Tasmania'sBruny Island...{" "}
        <b style={{ color: "#386FFF" }} onClick={() => setModal(true)}>
          View More
        </b>
      </p>
      <div css={styles.info}>
        <div>
          <ProfileIcon />
          <span style={{ marginLeft: "9px" }}>Jonah Johnson</span>
        </div>
        <span>1 hour ago</span>
      </div>
      <ViewModal modal={modal} setModal={setModal} />
    </div>
  );
};

export default Card;

const styles = {
  wrapper: (isActive) => css`
    border-radius: 4px;
    background: ${isActive ? "#eef8ff" : "#fff"};
    padding: 20px;
    color: var(--primary-font);
    box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.08);

    p {
      margin: 20px;
    }
  `,
  header: (isActive) => css`
    display: flex;
    flex-direction: row;
    span {
      font-size: 18px;
      font-weight: 600;
      line-height: 25px;
      margin-left: ${isActive ? "20px" : ""};
      margin-top: -8px;
      text-transform: capitalize;
    }
  `,
  paragraph: css`
    font-size: 16px;
    font-weight: 400;
    b {
      cursor: pointer;
    }
  `,
  info: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    span {
      font-size: 12px;
      font-weight: 400;
    }
  `,
};
