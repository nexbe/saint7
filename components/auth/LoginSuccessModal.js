/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { Modal } from "reactstrap";
import { useRouter } from "next/navigation";
import CustomeModal from "./CustomeModal";

const LoginSuccessModal = ({ modal, setModal }) => {
  const router = useRouter();
  const onClickHandler = () => {
    setModal(false);
    router.push("/home");
  };
  return (
    <CustomeModal isOpen={modal} toggle={() => setModal(!modal)} css={styles.wrapper}>
      <div css={styles.modalStyle}>
        <div className="title">Login Success</div>
        <div>You’re ready to continue. Thank you for logging in.</div>
        <button onClick={onClickHandler}>Continue</button>
      </div>
    </CustomeModal>
  );
};

export default LoginSuccessModal;
const styles = {
  modalStyle: css`
    background: var(--white);
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 9px;
    font-size: 14px;
    font-weight: 600;
    color: #718096;
    button {
      font-weight: 600;
      font-size: 18px;
      cursor: pointer;
      border: none;
      color: #000;
      margin-left: auto;
      background: transparent;
      justify-content: end;
    }
    .title {
      color:#2F4858;
      font-size: 16px;
      font-weight: 600;
    }
  `,
  wrapper: css`
    margin-top: 50%;
    padding: 13px;
    background: #fff;
    color: var(--primary-font);
    box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.08);
    p {
      margin: 20px;
    }
    .modal-content {
      border: none;
    }
    @media (min-width: 440px) {
      margin-top: 5%;
    }
  `,
};
