/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import ActiveIcon from "../../public/icons/activeIcon";
import ProfileIcon from "../../public/icons/profileIcon";

const Card = ({ isActive, state }) => {
  return (
    <div css={styles.wrapper(isActive)}>
      <div css={styles.header(isActive)}>
        {isActive && <ActiveIcon />}
        <div css={styles.info}>
          <div style={{ marginTop: "-9px", marginLeft: "9px" }}>
            <ProfileIcon />
            <span style={{ marginLeft: "9px" }}>Jonah Johnson</span>
          </div>
          <div css={styles.stateStyle(state)}>{state ? "IN" : "Out"}</div>
        </div>
      </div>
      <p css={styles.paragraph}>
        I am checked in and I am ready to take on any duties.
      </p>
      <div css={styles.checkInStyle}>
        <span>Check-in time: 10:00 AM</span>
        <span>Location: Main Entrance </span>
      </div>
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
      margin-top: 9px;
    }
  `,
  header: (isActive) => css`
    display: flex;
    flex-direction: row;
    span {
      font-size: 14px;
      font-weight: 700;
      margin-left: ${isActive ? "20px" : ""};
      margin-top: -8px;
      text-transform: capitalize;
    }
  `,
  paragraph: css`
    font-size: 14px;
    font-weight: 400;
    line-height:20px;
  `,
  info: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    span {
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
    }
  `,
  stateStyle: (state) => css`
    border-radius: 6px;
    background: ${state ? "#1fa6b8" : "#EB5656"};
    padding: 2px 20px;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 600;
    color: var(--white);
  `,
  checkInStyle: css`
    display: flex;
    flex-direction: column;
    font-size: 14px;
    font-weight: 400;
  `,
};
