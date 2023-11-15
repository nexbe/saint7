/** @jsxImportSource @emotion/react */
import React from "react";
import { Modal } from "reactstrap";
import CloseIcon from "../../public/icons/closeIcon";
import { css } from "@emotion/react";

const ViewSopModal = ({ isOpen, setModal, imageModal, selectedSopData }) => {
  const toggle = () => {
    setModal(!isOpen);
  };
  const FILE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".jfif",".svg"];
  const isImage = selectedSopData?.Attachments?.data?.map((eachAttach) => {
    return FILE_EXTENSIONS.some((extension) =>
      eachAttach.attributes?.url?.endsWith(extension)
    );
  });

  const attachmentLists = selectedSopData?.Attachments?.data?.filter(
    (eachDoc, index) => isImage[index]
  );
  return (
    <Modal isOpen={isOpen} toggle={toggle} css={styles.wrapper}>
      <div css={styles.closeBtn} onClick={() => setModal(false)}>
        <CloseIcon />
      </div>
      <div css={styles.displayDataStyle}>
        <div>Name</div>
        <span>{selectedSopData?.Name}</span>
      </div>
      <div css={styles.displayDataStyle}>
        <div>Type</div>
        <span>{selectedSopData?.sop_type?.data?.attributes.name || "-"} </span>
      </div>
      <div>
        {attachmentLists && attachmentLists?.length > 0 && (
          <>
            <div>Attach Documents</div>
            <div onClick={imageModal} css={styles.attachmentBox}>
              <img
                style={{
                  opacity: attachmentLists?.length > 1 ? "0.7" : "1",
                  height: "90px",
                }}
                src={`${process.env.NEXT_PUBLIC_APP_URL}${attachmentLists[0]?.attributes.url}`}
              />
              {attachmentLists?.length > 1 && (
                <span css={styles.imageCount}>+{attachmentLists?.length}</span>
              )}
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ViewSopModal;
const styles = {
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
