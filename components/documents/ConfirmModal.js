/** @jsxImportSource @emotion/react */
import React from "react";
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
      <div css={styles.info}>
        <span>Are you sure you want to leave this page?</span>
        <p>Changes made to this page haven’t been saved yet. </p>
      </div>
      <div css={styles.actions}>
        <div onClick={openEditModal}>Cancel</div>
        <div onClick={() => setModal(false)}>Leave this page</div>
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
  info: css`
    span {
      font-size: 14px;
      font-weight: 400;
    }
    p {
      font-size: 16px;
      font-weight: 600;
    }
  `,
  actions: css`
    display: flex;
    flex-direction: row;
    gap: 9px;
    margin-left: auto;

    div {
      cursor: pointer;
      font-size: 18px;
      font-weight: 600;
    }
  `,
};
