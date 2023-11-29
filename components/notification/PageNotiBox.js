/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useMemo, useEffect } from "react";
import {
  AiOutlineClose,
  AiFillInfoCircle,
  AiFillNotification,
} from "react-icons/ai";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useRouter } from "next/router";
import BellIcon from "../../public/icons/bellIcon";

const PageNotiBox = ({ message, timeout, status, label, user, time }) => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useMemo(() => {
    let timer;
    if (isVisible) {
      timer = setTimeout(() => {
        setIsVisible(false);
      }, timeout);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isVisible, timeout, status]);

  useMemo(() => {
    !!status && setIsVisible(true);
  }, [status]);

  const handleClick = () => {
    router.push("/notifications");
  };

  return (
    <div className={`notification-box visible`} css={styles.notiBoxWrapper}>
      {isVisible && message && (
        <>
          <div css={styles.notiBox} onClick={handleClick}>
            <div>
              <BellIcon />
            </div>
            <div className="d-flex" style={{ flexDirection: "column" }}>
              <p css={styles.notiText}>
                {user} <span css={styles.notiSpan}>{message}</span>{" "}
              </p>
              {status == "In" ? (
                <label css={styles.notiTime}>{`check-In Time: ${time}`}</label>
              ) : (
                <label css={styles.notiTime}>{`check-Out Time: ${time}`}</label>
              )}
            </div>
            <div css={styles.closeIcon}>
              <AiOutlineClose
                color={"rgba(123, 123, 123, 1)"}
                size={16}
                onClick={() => setIsVisible(false)}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PageNotiBox;

const styles = {
  notiBoxWrapper: css`
    z-index: 1;
    position: absolute;
    top: 10px;
    border-radius: 4px;
    background: var(--white);
    width: 100%;
    box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.08),
      1px -1px 10px 0px rgba(0, 0, 0, 0.1);
    color: var(--primary-font);
    .modal-content {
      border: none;
    }
  `,
  notiBox: css`
    display: flex;
    padding: 7px 10px;
    gap: 5px;
    font-style: normal;
    font-weight: 400;
    line-height: 30px;
    font-size: 16px;
    label {
      font-size: 14px;
      line-height: normal;
    }
  `,
  closeIcon: css`
    display: flex;
    cursor: pointer;
    margin-left: auto;
  `,
  notiText: css`
    margin-bottom: 0;
    font-family: Inter;
    font-size: 14px;
    font-weight: 700;
    margin-right: 5px;
  `,
  notiSpan: css`
    margin-bottom: 0;
    font-family: Inter;
    font-size: 14px;
    font-weight: 400;
  `,
  notiTime: css`
    margin-bottom: 0;
    font-family: Inter;
    font-size: 12px;
    font-weight: 400;
  `,
};
