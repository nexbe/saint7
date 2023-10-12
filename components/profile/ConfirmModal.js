/** @jsxImportSource @emotion/react */
import { Modal } from "reactstrap";
import { useState } from "react";
import { css } from "@emotion/react";
import DatePicker from "react-datepicker";
require("react-datepicker/dist/react-datepicker.css");
import { AiOutlineFilePdf } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";

const ConfirmModal = ({ setConfirmOpen, isOpen = false, close = () => {} }) => {
  return (
    <Modal size="md" isOpen={isOpen} toggle={close} css={styles.modal}>
      <div css={styles.formContent}>
        <div className="primary-text" css={styles.confirmText}>
          <span>Are you sure you want to leave this page?</span>
          <label>Changes made to this page haven’t been saved yet.</label>
        </div>
        <div css={styles.actionButton}>
          <button
            onClick={() => setConfirmOpen(false)}
            className="primary-text"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setConfirmOpen(false);
              close();
            }}
            className="primary-text"
          >
            Leave this page
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;

const styles = {
  modal: css`
    .modal-content {
      border-radius: 8px;
      margin-top: 13rem;
      width: 100%;
      background: var(--white);
      padding: 12px;
    }
  `,
  formContent: css`
    display: flex;
    flex-direction: column;
    border-radius: 8px;
  `,
  actionButton: css`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 30px;
    button {
      background: none;
      border: none;
      font-size: 18px;
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
};
