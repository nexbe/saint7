/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import Card from "./Card";

const History = () => {
  return (
    <div css={styles.wrapper}>
      <Card data={"August"} />
      <Card data={"July"} />
      <Card data={"June"} />
      <Card data={"May"} />
    </div>
  );
};

export default History;

const styles = {
  wrapper: css`
    display: flex;
    flex-direction: column;
    gap: 9px;
    max-height: 70vh;
    overflow-y: scroll;

    @media (min-width: 440px) {
      margin: 30px;
    }
  `,
};
