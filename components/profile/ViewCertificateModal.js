/** @jsxImportSource @emotion/react */
import { Modal } from "reactstrap";
import { useState } from "react";
import { css } from "@emotion/react";
import dayjs from "dayjs";
import { IoCloseSharp } from "react-icons/io5";

const ViewCertificateModal = ({
  selectedCertificate,
  isOpen = false,
  close = () => {},
}) => {
  const [fileList, setFileList] = useState([selectedCertificate?.attachement]);

  return (
    <>
      <Modal size="md" isOpen={isOpen} toggle={close} css={styles.modal}>
        <div css={styles.formContent}>
          <div className="primary-text">
            <div onClick={close} css={styles.formHeader}>
              <IoCloseSharp size={20} color="rgba(117, 117, 117, 1)" />
            </div>
          </div>

          <div className="formFlex">
            <div className="d-flex">
              <label className="secondary-text">Name</label>
            </div>
            <label className="secondary-text">
              {selectedCertificate?.name}
            </label>
          </div>
          <div className="formFlex">
            <div className="d-flex">
              <label className="secondary-text">Expired Date</label>
            </div>
            <label className="secondary-text">
              {dayjs(selectedCertificate?.expiryDate).format("DD/MM/YYYY")}
            </label>
          </div>
          <div className="formFlex" style={{ border: "none" }}>
            <div className="d-flex">
              <label className="secondary-text">Attach Documents</label>
            </div>

            <div className="secondary-text" css={styles.attchBox}>
              {fileList[0]?.map((eachFile, index) => {
                return (
                  <div key={index}>
                    <img
                      css={styles.previewImage}
                      src={
                        eachFile?.name?.split(".").pop().toLowerCase() === "pdf"
                          ? "images/pdfIcon.png"
                          : `${process.env.NEXT_PUBLIC_APP_URL}${eachFile?.url}`
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ViewCertificateModal;

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
    justify-content: flex-end;
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
      label {
        span {
          color: #ec1c24;
        }
      }
    }
  `,
  attchBox: css`
    border: 2px dashed #ccc;
    display: flex;
    gap: 10px;
    flex: 1;
    overflow-y: hidden;
    overflow-x: auto;
    width: 100%;
    padding: 15px;
    margin-bottom: 10px;
    width: 100%;
    margin-top: 10px;
    justify-content: start;
    border-radius: 4px;
    background: var(--white);
    box-shadow: 0px 4px 4px 0px rgba(117, 139, 154, 0.08);
    ::-webkit-scrollbar {
      height: 5px;
      background-color: transparent;
    }
    ::-webkit-scrollbar-thumb {
      height: 5px;
      border-radius: 10px;
      background-color: var(--lighter-gray);
    }
    div {
      border-radius: 10px;
      background: #e3f3ff;
      padding: 10px;
    }
  `,
  previewImage: css`
    width: 50px;
    height: 60px;
    object-fit: cover;
    border: 1px solid #e3f0ff;
    filter: drop-shadow(0px 4px 16px rgba(5, 14, 37, 0.05));
    border-radius: 4px 4px 0px 0px;
  `,
};
