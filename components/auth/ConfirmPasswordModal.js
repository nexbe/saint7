/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { Modal } from "reactstrap";
import { useRouter } from "next/navigation";

const ConfirmPasswordModal = ({ modal, setModal, password }) => {
  const router = useRouter();

  const onSubmitHandler = () => {
    setModal(false);
    router.push("/");
  };
  return (
    <Modal isOpen={modal} toggle={() => setModal(!modal)} css={styles.wrapper}>
      <div css={styles.modalStyle}>
        <div>Remember your password</div>
        <div>
          <b>{password}</b>
        </div>
        <p>We want to make sure you can always get back into your account.</p>
        <button onClick={onSubmitHandler}>OK</button>
      </div>
    </Modal>
  );
};

export default ConfirmPasswordModal;

const styles = {
  modalStyle: css`
    background: var(--white);
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 9px;
    font-size: 14px;
    color: #2f4858;
    b {
      font-weight: 600;
      font-size: 16px;
    }
    button {
      font-weight: 600;
      font-size: 18px;
      cursor: pointer;
      border: none;
      background: transparent;
      justify-content: end;
    }
  `,
  wrapper: css`
    margin-top: 50%;
    padding: 20px;
    border-radius: 16px;
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
