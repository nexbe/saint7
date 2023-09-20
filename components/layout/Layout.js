/** @jsxImportSource @emotion/react */
import React from "react";
import Navbar from "./Navbar";
import { css } from "@emotion/react";

const Layout = ({ children }) => {
  return (
    <div css={styles.wrapper}>
      <div css={styles.content}>{children}</div>
      <Navbar />
    </div>
  );
};

export default Layout;

const styles = {
  wrapper: css`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  `,
};
