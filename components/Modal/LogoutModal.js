/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Modal } from "reactstrap";
import { useRouter } from "next/router";

const LogoutModal = ({ modal, setModal }) => {
  const router = useRouter();

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <Modal isOpen={modal} toggle={toggle} css={styles.wrapper}>
      <div className="primary-text" css={styles.confirmText}>
        <span>Confirmation message</span>
        <span>Are You sure You Want To Logout?</span>
      </div>
      <div css={styles.actions}>
        <div
          onClick={() => {
            setModal(false);
          }}
        >
          Cancel
        </div>
        <div onClick={() => router.push("/")}>Logout</div>
      </div>
    </Modal>
  );
};

export default LogoutModal;

const styles = {
  wrapper: css`
    margin-top: 60%;
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
  confirmText: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    span {
      font-size: 14px;
      font-weight: 400;
      line-height: 35px;
    }
  `,
  actions: css`
    display: flex;
    flex-direction: row;
    gap: 50px;
    margin-top: 15px;
    margin-left: auto;
    div {
      cursor: pointer;
      font-size: 18px;
      font-weight: 600;
    }
  `,
};
