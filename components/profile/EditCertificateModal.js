/** @jsxImportSource @emotion/react */
import { Modal } from "reactstrap";
import { useState } from "react";
import { css } from "@emotion/react";
import DatePicker from "react-datepicker";
require("react-datepicker/dist/react-datepicker.css");
import { AiOutlineFilePdf } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import ConfirmModal from "../Modal/ConfirmModal";

const EditCertificateModal = ({
  selectedCertificate,
  isOpen = false,
  setEditModalOpen,
}) => {
  const [selectedDate, setSelectedDate] = useState(
    new Date(selectedCertificate.expiryDate)
  );
  const [selectedFile, setSelectedFile] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const FILE_EXTENSIONS = [".png", ".jpg", ".jpeg"];
  const isImage = FILE_EXTENSIONS.some((extension) =>
    selectedFile?.name?.endsWith(extension)
  );

  console.log("sele...", selectedCertificate);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const toggle = () => {
    setEditModalOpen(!isOpen);
  };
  const handleEditModalClose = () => {
    setConfirmOpen(true);
    setEditModalOpen(false);
  };

  return (
    <>
      <Modal size="md" isOpen={isOpen} toggle={toggle} css={styles.modal}>
        <div css={styles.formContent}>
          <div className="primary-text" css={styles.formHeader}>
            Edit Certifications{" "}
            <IoCloseSharp
              size={20}
              color="rgba(117, 117, 117, 1)"
              onClick={handleEditModalClose}
            />
          </div>

          <div className="formFlex">
            <div className="d-flex">
              <label className="secondary-text">
                Name <span>*</span>
              </label>
            </div>
            <input
              type={"text"}
              className="secondary-text"
              defaultValue={selectedCertificate.name}
            />
          </div>
          <div className="formFlex">
            <div className="d-flex">
              <label className="secondary-text">
                Expired Date <span>*</span>
              </label>
            </div>
            <DatePicker
              defaultValue={selectedCertificate.expiredDate}
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <div className="formFlex" style={{ border: "none" }}>
            <div>
              <label className="secondary-text">
                Attach Documents <span>*</span>
              </label>

              <div css={styles.attchBox}>
                {selectedFile && (
                  <div css={styles.imageContainer}>
                    {isImage ? (
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Selected"
                        css={styles.selectedImage}
                      />
                    ) : (
                      <div css={styles.fileIconContainer}>
                        <AiOutlineFilePdf color={"#1E3C72"} size={80} />
                      </div>
                    )}

                    <div onClick={handleRemoveFile} css={styles.closeIcon}>
                      <IoCloseSharp size={20} color="#F6302B" />
                    </div>
                  </div>
                )}
                {!selectedFile && (
                  <label css={styles.attachBtn}>
                    Browse File
                    <input
                      type="file"
                      accept={`application/pdf, image/*`}
                      onChange={handleFileChange}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>
        <div css={styles.actionButton}>
          <button css={styles.addBtn} onClick={() => close()}>
            Save
          </button>
        </div>
      </Modal>
      {confirmOpen && (
        <ConfirmModal
          modal={confirmOpen}
          setModal={setConfirmOpen}
          setEditModal={setEditModalOpen}
        />
      )}
    </>
  );
};

export default EditCertificateModal;

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
    justify-content: center;
    align-items: center;
    button {
      border-radius: 10px;
      padding: 3px 30px;
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.08),
        0px 4px 6px 0px rgba(50, 50, 93, 0.11);
      border: none;
      color: var(--white);
      background: var(--primary);
    }
  `,
  attchBox: css`
    border: 2px dashed #ccc;
    padding: 10px;
    margin-bottom: 20px;
    width: 100%;
    margin-top: 10px;
    justify-content: start;
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    border: 2px dashed #d6e2ea;
    background: var(--white);
    box-shadow: 0px 4px 4px 0px rgba(117, 139, 154, 0.08);
  `,
  attachBtn: css`
    display: inline-block;
    padding: 8px 16px;
    font-weight: bold;
    color: #5e72e4;
    font-weight: 600;
    font-size: 16px;
    text-align: center;
    text-decoration: underline;
    cursor: pointer;
    border: none;
    background: none;
    outline: none;

    input {
      display: none;
    }
  `,
  selectedImage: css`
    width: 95px;
    height: 100px;
    border-radius: 16px;
    background: #e3f3ff;
  `,
  imageContainer: css`
    position: relative;
    justify-content: start;
  `,
  closeIcon: css`
    position: absolute;
    top: 0;
    right: 50px;
    cursor: pointer;
    padding: 0;

    @media (min-width: 440px) {
      left: 10%;
    }
  `,
  fileIconContainer: css`
    width: 95px;
    height: 100px;
    display: grid;
    place-items: center;
    border-radius: 16px;
    background: #e3f3ff;
  `,
};
