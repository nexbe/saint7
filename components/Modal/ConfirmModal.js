/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Modal } from "reactstrap";

const ConfirmModal = ({ modal, setModal, setEditModal }) => {
  const toggle = () => {
    setModal(!modal);
  };

  const openEditModal = () => {
    setModal(false);
    setEditModal(true);
  };
  return (
    <Modal isOpen={modal} toggle={toggle} css={styles.wrapper}>
      <div className="primary-text" css={styles.confirmText}>
        <span>Are You sure You Want To Leave This Page?</span>
        <label>Changes made to this page haven’t been saved yet.</label>
      </div>
      <div css={styles.actions}>
        <div onClick={openEditModal}>Cancel</div>
        <div
          onClick={() => {
            setModal(false);
            setEditModal(false);
          }}
        >
          Leave this page
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;

const styles = {
  wrapper: css`
    margin-top: 40%;
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
    line-height: 25px;
    span {
      font-size: 14px;
      font-weight: 400;
      line-height: 40px;
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
