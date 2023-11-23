/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import useAuth from "../../store/auth";

const Verification = () => {
  const router = useRouter();
  const { verifyOTP, otpEmail, resendOTP, user } = useAuth();
  const [time, setTime] = useState({ minutes: 0, seconds: 59 });
  const [firstDigit, setFirstDigit] = useState(null);
  const [secDigit, setSecDigit] = useState(null);
  const [thirdDigit, setThirdDigit] = useState(null);
  const [fourthDigit, setFourthDigit] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const startCounting = setInterval(() => {
      if (time.minutes === 0 && time.seconds === 0) {
        clearInterval(startCounting);
        return;
      }

      if (time.seconds > 0) {
        setTime((prev) => ({ ...prev, seconds: prev.seconds - 1 }));
      } else {
        setTime((prev) => ({ minutes: prev.minutes - 1, seconds: 59 }));
      }
    }, 1000);

    return () => clearInterval(startCounting);
  }, [time, resendOTP]);

  const focusHandler = (event) => {
    const currentInput = event.target;
    const maxLength = parseInt(currentInput.getAttribute("maxLength"));
    const currentLength = currentInput.value.length;

    if (currentLength === maxLength) {
      const nextInput = currentInput.nextElementSibling;
      if (nextInput !== null) {
        nextInput.focus();
      }
    }
  };

  const resendHandler = () => {
    setFirstDigit('')
    setSecDigit('')
    setThirdDigit('')
    setFourthDigit('')
    resendOTP(
      {
        input: {
          identifier: otpEmail.email.email || user.email,
        },
      },
      router
    );
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (firstDigit && secDigit && thirdDigit && fourthDigit && otpEmail) {
      const response = await verifyOTP({
        input: {
          identifier: otpEmail.email.email,
          otpCode: `${firstDigit}${secDigit}${thirdDigit}${fourthDigit}`,
        },
      });
      if (response?.verifyOtp?.error?.message) {
        setError(response?.verifyOtp?.error?.message);
      } else {
        setError(null);
        router.push("/auth/createNewPassword");
      }
    }
  };

  return (
    <div css={styles.wrapper}>
      <div css={styles.info}>
        <h3 css={styles.title}>Verification</h3>
        <p>
          Please enter the 4-digit verification code that we have sent via the
          email.
        </p>
      </div>
      <form onSubmit={onSubmitHandler}>
        <div css={styles.box}>
          <input
            id="first-digit"
            type="number"
            required
            maxLength="1"
            onChange={(e) => setFirstDigit(e.target.value)}
            onInput={focusHandler}
            min="0"
          />
          <input
            id="second-digit"
            type="number"
            required
            maxLength="1"
            onChange={(e) => setSecDigit(e.target.value)}
            onInput={focusHandler}
            min="0"
          />
          <input
            id="third-digit"
            type="number"
            required
            maxLength="1"
            onChange={(e) => setThirdDigit(e.target.value)}
            onInput={focusHandler}
            min="0"
          />
          <input
            id="fourth-digit"
            type="number"
            required
            maxLength="1"
            onChange={(e) => setFourthDigit(e.target.value)}
            onInput={focusHandler}
            min="0"
          />
        </div>
        {error && <span css={styles.errorMsg}>{error}</span>}
        <div
          style={{ color: "var(--white)", margin: "9px", textAlign: "center" }}>
          code expire in :{" "}
          <span style={{ color: "#EB5656" }}>
            {" "}
            {time.minutes.toString().padStart(2, 0)} :{" "}
            {time.seconds.toString().padStart(2, 0)}{" "}
          </span>
        </div>

        <button id="continue" type="submit" css={styles.submitBtn}>
          Continue
        </button>
      </form>
      <div css={styles.actions}>
        <div>Didn’t get the code?</div>
        <span onClick={resendHandler}>Resend code</span>
      </div>
    </div>
  );
};

export default Verification;

const styles = {
  wrapper: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: 20px;
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
  box: css`
    display: flex;
    flex-direction: row;
    gap: 20px;
    input {
      border: none;
      font-size: 40px;
      text-align: center;
      background: var(--white);
      padding: 9px;
      width: 7vh;
      height: 7vh;
      border-radius: 2px;
    }
  `,
  submitBtn: css`
    background: var(--white);
    color: var(--primary);
    width: 100%;
    padding: 9px;
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 15px;
    font-weight: 700;
    border: 1px solid transparent;
    font-size: 18px;
    cursor: pointer;
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
    }
  `,
  errorMsg: css`
    color: #fb7777;
    font-weight: 500;
  `,
};