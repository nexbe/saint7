/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import LoginLogo from "../../public/icons/LoginLogo";
import CloseEyeSlashIcon from "../../public/icons/CloseEyeSlashIcon";
import OpenEyeIcon from "../../public/icons/OpenEyeIcon";

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div css={styles.wrapper}>
      <div css={styles.header}>
        <LoginLogo />
        <h3>Welcome back!</h3>
        <span>Login to your account</span>
      </div>

      <form css={styles.loginFormStyle}>
        <div>
          <label htmlFor="email">Your email</label>
          <input
            type="email"
            id="email"
            name="email"
            aria-label="email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <div css={styles.passwordInputWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              aria-label="password"
              required
            />

            <div
              css={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}>
              {!showPassword ? <CloseEyeSlashIcon /> : <OpenEyeIcon />}
            </div>
          </div>
        </div>
      </form>

      <div css={styles.actions}>
        <div css={styles.checkboxWrapper}>
          <input
            type="checkbox"
            id="remember"
            name="remember"
            value={isChecked}
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            style={{ display: "none" }}
          />
          <label htmlFor="remember" css={styles.checkbox}>
            {isChecked && <div css={styles.checkboxInner}></div>}
          </label>
          <span>Remember me</span>
        </div>

        <div>Forgot Password ?</div>
      </div>

      <button
        onClick={() => router.push("/home")}
        id="login"
        css={styles.loginBtn}>
        Login
      </button>
    </div>
  );
};

export default Login;

const styles = {
  wrapper: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 30px;
    height: 100vh;
    width: fit-content;
    background: var(--primary);

    @media (min-width: 440px) {
      width: 100%;
      height: 100vh;
      padding-top: 0px;
    }
  `,
  header: css`
    color: var(--white);
    text-align: center;
    font-weight: 600;
    span {
      font-weight: 300;
    }
  `,
  loginBtn: css`
    background: var(--white);
    color: var(--primary);
    width: 80%;
    padding: 9px;
    margin-top: 20px;
    margin-bottom: 30px;
    border-radius: 15px;
    font-weight: 700;
    border: 1px solid transparent;
    font-size: 18px;
    cursor: pointer;

    @media (min-width: 768px) {
      width: 20%;
    }
  `,
  loginFormStyle: css`
    margin-top: 30px;
    margin-bottom: 20px;
    color: #fff;
    display: flex;
    width: 80%;
    flex-direction: column;
    gap: 9px;

    @media (min-width: 768px) {
      width: 20%;
    }

    input {
      color: #fff;
      background: transparent;
      border: none;
      border-bottom: 1px solid #fff;
      outline: none;
      width: 100%;
      padding: 5px;
    }
    div {
      margin-top: 5px;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
    }
  `,
  passwordInputWrapper: css`
    display: flex;
    flex-direction: row;
    position: relative;
    width: 100%;
  `,
  eyeIcon: css`
    position: absolute;
    right: 0;
    cursor: pointer;
  `,
  actions: css`
    margin-top: 25px;
    margin-bottom: 25px;
    display: flex;
    flex-direction: row;
    gap: 50px;
    color: #fff;
    div {
      cursor: pointer;
    }
  `,
  checkboxWrapper: css`
    display: flex;
    align-items: center;
    gap: 4px;
  `,
  checkbox: css`
    position: relative;
    width: 20px;
    height: 20px;
    border: 2px solid #fff;
    border-radius: 50%;
    cursor: pointer;
  `,
  checkboxInner: css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    background-color: #fff;
    border-radius: 50%;
  `,
};
