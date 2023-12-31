/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import OpenEyeIcon from "../../public/icons/OpenEyeIcon";
import CloseEyeSlashIcon from "../../public/icons/CloseEyeSlashIcon";
import ConfirmPasswordModal from "../../components/auth/ConfirmPasswordModal";
import useAuth from "../../store/auth";

const CreateNewPassword = () => {
  const router = useRouter();
  const { createNewPassword, verifiedOtpUserData } = useAuth();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (password) {
      createNewPassword({
        password: password,
        passwordConfirmation: password,
        code: verifiedOtpUserData.data?.code,
      });
      setModal(true);
    }
  };

  useEffect(() => {
    if (password && password.length < 6) {
      setError(true);
    }else{
      setError(false);
    }
  }, [password]);

  return (
    <div css={styles.wrapper}>
      <div css={styles.info}>
        <h3 css={styles.title}>Create a new password</h3>
        <p>
          You will use this password to access your account. Enter a combination
          of at least six numbers, letters and punctuation marks.
        </p>
        <form>
          <div css={styles.loginFormStyle}>
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
            {error && (
              <span style={{color:"#FB7777"}}>
                Your password is too short. Please enter a password with at
                least 6 characters.
              </span>
            )}
          </div>
          <div id="reset" type="submit" css={styles.loginBtn} onClick={onSubmitHandler}>
            Continue
          </div>
          <div
            css={styles.backBtn}
            onClick={() => router.push("/auth/resetPassword")}>
            Back
          </div>
        </form>
      </div>
      <ConfirmPasswordModal
        modal={modal}
        setModal={setModal}
        password={password}
      />
    </div>
  );
};

export default CreateNewPassword;

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
    text-align:center;
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
  backBtn: css`
    color: var(--white);
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    line-height: normal;
    cursor: pointer;
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
};
