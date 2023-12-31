/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import LoginLogo from "../../public/icons/LoginLogo";
import CloseEyeSlashIcon from "../../public/icons/CloseEyeSlashIcon";
import OpenEyeIcon from "../../public/icons/OpenEyeIcon";
import useAuth from "../../store/auth";
import TermsAndConditions from "./TermsAndCondition";
import LoginSuccessModal from "./LoginSuccessModal";

const Login = () => {
  const router = useRouter();
  const { login, errorLogin } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState();
  const [modal, setModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [redirectHome, setRedirectHome] = useState(false);
  const { user } = useAuth();
  
  useEffect(() => {
    if (user?.jwt && !redirectHome) {
      console.log("Redirecting to /home");
      router.push("/home");
    } else {
      console.log("Redirecting to /");
      router.push("/");
    }
  }, [redirectHome]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        const response = await login({
          identifier: email,
          password: password,
        });
        if (!response.errors) {
          setModal(true);
          setError(null);
        } else {
          setModal(false);
          setRedirectHome(false);
        }
      } catch (err) {
        console.log(err);
        setRedirectHome(false);
        setError(errorLogin);
      }
    }
  };

  return (
    <div css={styles.wrapper}>
      <div css={styles.header}>
        <LoginLogo />
        <h3>Welcome back!</h3>
        <span>Login to your account</span>
      </div>

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
              onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="password"
                required
              />
              <div
                css={styles.eyeIcon}
                onClick={() => setShowPassword(!showPassword)}>
                {!showPassword ? <CloseEyeSlashIcon /> : <OpenEyeIcon />}
              </div>
            </div>
            {error && !modal && (
              <span css={styles.errorMsg}>
                Invalid email or password. Try Again !
              </span>
            )}
          </div>
        </div>

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
          <div onClick={() => router.push("/auth/resetPassword")}>
            Forgot Password ?
          </div>
        </div>

        <button id="login" type="submit" css={styles.loginBtn}>
          Login
        </button>
      </form>
      <TermsAndConditions
        modal={modal}
        setModal={setModal}
        setSuccessModal={setSuccessModal}
      />
      <LoginSuccessModal
        modal={successModal}
        setModal={setSuccessModal}
        setRedirectHome={setRedirectHome}
      />
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
    height: 100vh;
    width: fit-content;
    background: var(--primary);

    @media (max-height: 667px) {
      height: 205vh;
      width: fit-content;
    }
    @media (max-height: 844px) {
      height: 110vh;
      width: fit-content;
    }
    @media (max-height: 851px) {
      height: 110vh;
      width: fit-content;
    }
    @media (min-width: 412px) and (max-height: 915px) {
      height: 103.5vh;
      width: fit-content;
    }
    @media (min-width: 440px) {
      width: 100%;
      height: 100vh;
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
  passwordInputWrapper: css`
    display: flex;
    flex-direction: row;
    position: relative;
    width: 100%;
  `,
  errorMsg: css`
    color: #fb7777;
    font-weight: 500;
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
