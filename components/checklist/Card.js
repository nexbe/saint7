/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";

const Card = () => {
  return (
    <div css={styles.wrapper}>
      Initiate evacuation procedure.    
    </div>
  );
};

export default Card;

const styles = {
  wrapper: css`
    border-radius: 4px;
    background: #fff;
    padding: 20px;
    color: var(--primary-font);
    box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.08);
  `,
};
