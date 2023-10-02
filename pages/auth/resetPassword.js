/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ResetPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (email) {
      router.push("/auth/verification");
    }
  };

  const cusotmerSupportHandler = (e) => {
    const email = "saint_customersupport.com";
    e.preventDefault();
    window.location.href = `mailto:${email}`;
  };
  return (
    <div css={styles.wrapper}>
      <div css={styles.info}>
        <h3 css={styles.title}>Forgot your password?</h3>
        <p>
          Enter your email address and you will receive a verification code.
        </p>
        <form onSubmit={onSubmitHandler}>
          <div css={styles.loginFormStyle}>
            <div>
              <label htmlFor="email">Your email</label>
              <input
                type="email"
                id="email"
                name="email"
                aria-label="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div css={styles.actions}>
            <div>Forgot email?</div>
            <span>
              <a href="#" onClick={cusotmerSupportHandler}>
                contact customer support
              </a>
            </span>
          </div>

          <button id="reset" type="submit" css={styles.loginBtn}>
            Get reset code
          </button>
          <div css={styles.backBtn} onClick={() => router.push("/")}>
            Back
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

const styles = {
  wrapper: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: 15px;
    background: var(--primary);
  `,
  info: css`
    display: flex;
    flex-direction: column;
    justify-content: start;
    p {
      color: var(--white);
      font-size: 16px;
      font-weight: 400;
      line-height: normal;
    }
  `,
  title: css`
    color: var(--white);
    font-size: 32px;
    font-weight: 600;
    line-height: normal;
  `,
  loginBtn: css`
    background: var(--white);
    color: var(--primary);
    width: 100%;
    padding: 9px;
    margin-bottom: 20px;
    border-radius: 15px;
    font-weight: 700;
    border: 1px solid transparent;
    font-size: 18px;
    cursor: pointer;
  `,
  loginFormStyle: css`
    margin-top: 30px;
    margin-bottom: 20px;
    color: #fff;
    display: flex;
    flex-direction: column;
    gap: 9px;

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
  actions: css`
    margin-top: 25px;
    margin-bottom: 25px;
    display: flex;
    flex-direction: row;
    gap: 9px;
    color: #fff;
    cursor: pointer;
    span {
      color: var(--blue);
      text-decoration: underline;
    }
  `,
  backBtn: css`
    color: var(--white);
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    line-height: normal;
    cursor: pointer;
  `,
};
