/** @jsxImportSource @emotion/react */
import React from "react";
import Navbar from "./Navbar";
import { css } from "@emotion/react";

const Layout = ({ children }) => {
  return (
    <div css={styles.wrapper}>
      <div css={styles.bodyContainer}>
        <main css={styles.main}>{children}</main>
      </div>
      <Navbar />
    </div>
  );
};

export default Layout;

const styles = {
  main: css`
    flex: 2;
    display: flex;
    flex-direction: column;
    width: 100%;
    background: var(--background);
    overflow-x: hidden;
  `,
  wrapper: css`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: var(--background-color);
    overflow: hidden;
  `,
  bodyContainer: css`
    display: flex;
    flex: 2;
  `,
};
