/** @jsxImportSource @emotion/react */
import React from "react";
import { Modal } from "reactstrap";
import CloseIcon from "../../public/icons/closeIcon";
import { css } from "@emotion/react";
import PdfIcon from "../../public/icons/pdfIcon";

const ViewEquipModal = ({ isOpen, setModal, imageModal }) => {
  const toggle = () => {
    setModal(!isOpen);
  };
  return (
    <Modal isOpen={isOpen} toggle={toggle} css={styles.wrapper}>
      <div css={styles.closeBtn} onClick={() => setModal(false)}>
        <CloseIcon />
      </div>
      <div css={styles.displayDataStyle}>
        <div>Name</div>
        <span>Presence of Standard Operations Procedures</span>
      </div>
      <div css={styles.displayDataStyle}>
        <div>Remarks</div>
        <span>
          Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
          consectetur adipisci velit sed qu ue porro quisquam est qui dolorem
          ipsum quia dolor sit amet consectetur adipisci velit sed quue porro
          quisquam est qui dolorem ipsum quia dolor sit amet consectetur
          adipisci velit sed qu
        </span>
      </div>
      <div>
        <div>Attach Documents</div>
        <div onClick={imageModal} css={styles.attachmentBox}>
          <PdfIcon />
          {/* <img
          style={{ opacity: imageList?.length > 1 ? "0.7" : "1" }}
          src={`${process.env.NEXT_PUBLIC_APP_URL}${imageList[0]?.url}`}
          />
          <span css={styles.imageCount}>+3</span> */}
        </div>
      </div>
    </Modal>
  );
};

export default ViewEquipModal;
const styles = {
  wrapper: css`
    margin-top: 30%;
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
  closeBtn: css`
    margin-left: auto;
    cursor: pointer;
  `,
  displayDataStyle: css`
    padding: 9px;
    margin-bottom: 15px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    font-weight: 600;
  `,
  imageCount: css`
    position: relative;
    margin-top: -35px;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--primary);
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
  `,
  attachmentBox: css`
    border-radius: 4px;
    border: 1px dashed #d6e2ea;
    padding: 20px;
    background: #fff;
  `,
};
