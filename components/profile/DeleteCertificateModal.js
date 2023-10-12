/** @jsxImportSource @emotion/react */
import { Modal } from "reactstrap";
import { useState } from "react";
import { css } from "@emotion/react";
import DatePicker from "react-datepicker";
require("react-datepicker/dist/react-datepicker.css");
import { AiOutlineFilePdf } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";

const DeleteCertificateModal = ({
  selectedCertificate,
  isOpen = false,
  close = () => {},
}) => {
  return (
    <Modal size="md" isOpen={isOpen} toggle={close} css={styles.modal}>
      <div css={styles.formContent}>
        <div className="primary-text" css={styles.formHeader}>
          Delete Certifications{" "}
          <IoCloseSharp
            size={20}
            color="rgba(117, 117, 117, 1)"
            onClick={() => close()}
          />
        </div>
        <div className="primary-text" css={styles.confirmText}>
          <label>Are You Sure You Want To Delete This Certification?</label>
          <label> {selectedCertificate?.id}</label>
        </div>
        <div css={styles.actionButton}>
          <button css={styles.cancelBtn} onClick={() => close()}>
            Cancel
          </button>
          <button css={styles.addBtn} onClick={() => close()}>
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteCertificateModal;

const styles = {
  modal: css`
    .modal-content {
      border-radius: 8px;
      margin-top: 8rem;
      width: 100%;
      background: var(--white);
      padding: 12px;
    }
  `,
  formHeader: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    svg {
      cursor: pointer;
    }
  `,
  formContent: css`
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    .formFlex {
      display: flex;
      flex-direction: column;
      padding-top: 10px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      span {
        color: #ec1c24;
      }
      input {
        border: none;
        outline: none;
      }
    }
  `,
  actionButton: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    button {
      border-radius: 10px;
      padding: 3px 20px;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.08),
        0px 4px 6px 0px rgba(50, 50, 93, 0.11);
    }
  `,
  cancelBtn: css`
    border: 1px solid rgba(160, 174, 192, 1);
    color: var(--dark-gray);
  `,
  addBtn: css`
    border: none;
    color: var(--white);
    background: red;
  `,
  confirmText: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 30px;
  `,
};
