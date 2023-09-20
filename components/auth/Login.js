/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();

  return (
    <div css={styles.wrapper}>
      <button onClick={() => router.push("/home")} id="login" css={styles.loginBtn}>
        Login
      </button>
    </div>
  );
};

export default Login;

const styles = {
  wrapper: css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  `,
  loginBtn: css`
    background: #293991;
    color: #fff;
    width: 80%;
    padding: 20px;
    border-radius: 20px;
    font-weight: 700;
    font-size: 18px;
    cursor: pointer;

    @media (min-width: 440px) {
      width: 20%;
    }
  `,
};
