/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

const CustomeModal = ({ isOpen, toggle, children }) => {
  return (
    <div css={[styles.modalOverlay, isOpen && styles.modalOverlayVisible]}>
      <div css={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div css={styles.modalContent}>{children}</div>
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: css`
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: center;
  `,
  modalOverlayVisible: css`
    display: flex;
  `,
  modal: css`
    background: var(--white);
    padding: 10px;
    display: flex;
    border-radius: 16px;
    flex-direction: column;
    gap: 9px;
    font-size: 14px;
    font-weight: 600;
    color: #718096;
    position: relative;
    z-index: 1;
  `,
  modalContent: css`
    width: 360px;
  `,
  closeButton: css`
    position: absolute;
    top: 5px;
    right: 10px;
    cursor: pointer;
    background: transparent;
    border: none;
    color: #2F4858;
    font-weight: 600;
    font-size: 14px;
  `,
};

export default CustomeModal;
