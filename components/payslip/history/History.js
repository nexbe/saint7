/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import Card from "./Card";

const History = () => {
  return (
    <div style={{ height: 0 }}>
      <div css={styles.wrapper}>
        <Card data={"August"} />
        <Card data={"July"} />
        <Card data={"June"} />
        <Card data={"May"} />
      </div>
    </div>
  );
};

export default History;

const styles = {
  wrapper: css`
    display: flex;
    flex-direction: column;
    gap: 9px;
    margin: 20px;
    max-height: 80 vh;
    overflow-y: scroll;
    color: #000;
  `,
};
