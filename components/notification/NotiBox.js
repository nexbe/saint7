/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useMemo } from "react";
import { AiOutlineClose, AiFillInfoCircle } from "react-icons/ai";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useRouter } from "next/router";

const NotificationBox = ({
  message,
  belongTo,
  timeout,
  action,
  label,
  userId,
}) => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useMemo(() => {
    let timer;
    if (isVisible) {
      timer = setTimeout(() => {
        setIsVisible(false);
        belongTo == "uploadProfileSuccess" ||
        belongTo === "Certificate" ||
        belongTo === "Personal"
          ? router.push({
              pathname: `/profile`,
              query: {
                userId: userId,
              },
            })
          : belongTo === "Document"
          ? router.push("/documents")
          : belongTo == "Announcement"
          ? router.push("/announcement")
          : belongTo == "ClaimApproval"
          ? router.push("/claims/claimApproval/expenseRequest")
          : "";
      }, timeout);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isVisible, timeout]);

  useMemo(() => {
    !!message && setIsVisible(true);
  }, [message]);

  return (
    <div
      className={`notification-box ${isVisible ? "visible" : "hidden"}`}
      css={styles.notiBoxWrapper}
    >
      {isVisible && message && (
        <>
          <div css={styles.notiBox}>
            <div>
              {message === "Success!" ? (
                <BsFillCheckCircleFill
                  color={"rgba(95, 164, 82, 1)"}
                  size={20}
                />
              ) : message === "Info" ? (
                <AiFillInfoCircle color={"rgba(89, 156, 255, 1)"} size={25} />
              ) : (
                <AiFillInfoCircle color={"rgba(235, 86, 86, 1)"} size={25} />
              )}
            </div>
            <div className="d-flex" style={{ flexDirection: "column" }}>
              {message}
              <label>
                {belongTo === "uploadProfileSuccess"
                  ? "Your Personal Photo has successfully uploaded."
                  : action === "delete"
                  ? "Your " + belongTo + " has successfully deleted."
                  : action === "create"
                  ? "Your " + belongTo + " has successfully created."
                  : action === "edit"
                  ? "Your " + belongTo + " has successfully updated."
                  : belongTo === "error"
                  ? "There was an error. Please try again later."
                  : label}
              </label>
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

export default NotificationBox;

const styles = {
  notiBoxWrapper: css`
    z-index: 1;
    position: absolute;
    top: -80px;
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
    gap: 7px;
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
};
