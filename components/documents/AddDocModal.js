/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import { Modal } from "reactstrap";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import CloseIcon from "../../public/icons/closeIcon";
import UploadIcon from "../../public/icons/uploadIcon";
import PdfIcon from "../../public/icons/pdfIcon";
import documentStore from "../../store/document";
import { CREATE_DOCUMENT } from "../../graphql/mutations/document";

const AddDocModal = ({ modal, setModal, userId }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { createDocument, getAllCertificates } = documentStore(
    (state) => state
  );
  const [createDocumentAction] = useMutation(CREATE_DOCUMENT);
  const [selectedImage, setSelectedImage] = useState(null);
  const [saveAction, setSaveAction] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const onSubmit = async (data) => {
    if (!!saveAction) {
      await createDocument({
        createDocumentAction,
        data: {
          title: data.title,
          description: data.description,
          users_permissions_users: userId,
          publishedAt: new Date().toISOString(),
        },
      });
      setModal(false);
      router.push("/documents");
    }
  };

  return (
    <Modal isOpen={modal} toggle={toggle} css={styles.wrapper}>
      <div css={styles.actions}>
        <h4>Add New Document</h4>
        <div onClick={() => setModal(false)}>
          <CloseIcon />
        </div>
      </div>
      <form css={styles.formStyle} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title">
            Title <span>*</span>
          </label>
          <input
            type="text"
            id="title"
            {...register("title", {
              required: "Please enter title",
            })}
          />
          {saveAction && errors.title && (
            <label className="secondary-text" style={{ color: "red" }}>
              {errors.title.message}
            </label>
          )}
        </div>
        <div>
          <label htmlFor="description">
            Description <span>*</span>
          </label>
          <input
            type="text"
            id="description"
            {...register("description", {
              required: "Please enter description",
            })}
          />
          {saveAction && errors.description && (
            <label className="secondary-text" style={{ color: "red" }}>
              {errors.description.message}
            </label>
          )}
        </div>
        <div>
          <label htmlFor="documents">
            Attach Documents <span>*</span>
          </label>
          <div
            css={styles.dropzone}
            style={{
              border:
                saveAction && errors.attachment
                  ? "2px dashed red"
                  : "2px dashed #ccc",
            }}
          >
            {selectedImage && (
              <div css={styles.imageContainer}>
                <PdfIcon />
                <div onClick={handleRemoveImage} css={styles.closeIcon}>
                  <CloseIcon />
                </div>
              </div>
            )}
            {!selectedImage && (
              <label css={styles.browseBtn}>
                Browse Picture
                <input
                  type="file"
                  accept=".pdf"
                  multiple={true}
                  onChange={handleFileChange}
                  {...register("attachment", {
                    required: true,
                  })}
                />
              </label>
            )}
            {selectedImage && (
              <div>
                <label css={styles.uploadBtn}>
                  <UploadIcon />
                  Upload file
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            )}
          </div>
        </div>
        <div>
          <button
            css={styles.btn}
            type="submit"
            onClick={() => {
              setSaveAction(true);
            }}
          >
            Add New
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddDocModal;

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
  actions: css`
    color: #2f4858;
    margin: 10px 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    h4 {
      font-size: 18px;
      font-weight: 600;
    }
    div {
      cursor: pointer;
    }
  `,
  formStyle: css`
    color: #2f4858;
    margin: 10px 20px;
    div {
      display: flex;
      flex-direction: column;
      margin-top: 10px;
    }
    input {
      border-top: 0px;
      border-left: 0px;
      border-right: 0px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      outline: none;
    }
    label {
      font-size: 16px;
      font-weight: 600;
    }
    span {
      color: #ec1c24;
    }
    .form-invalid {
      border-bottom: 1px solid red;
    }
  `,
  dropzone: css`
    padding: 30px;
    margin-bottom: 20px;
    width: 100%;
    margin-top: 5px;
    justify-content: start;
    display: flex;
    flex-direction: column;
  `,
  browseBtn: css`
    display: inline-block;
    padding: 8px 16px;
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
  uploadBtn: css`
    display: inline-block;
    padding: 8px 16px;
    color: #5e72e4;
    font-size: 14px;
    font-weight: 400;
    text-align: start;
    cursor: pointer;
    border: none;
    background: none;
    outline: none;

    input {
      display: none;
    }
  `,
  selectedImage: css`
    max-width: 90px;
    max-height: 90px;
    border-radius: 16px;
  `,
  imageContainer: css`
    position: relative;
    justify-content: start;
  `,
  closeIcon: css`
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    padding: 0;

    @media (min-width: 440px) {
      left: 20%;
    }
  `,
  btn: css`
    border-radius: 10px;
    color: #fff;
    background: var(--primary);
    cursor: pointer;
    padding: 12px;
    border: none;
    font-size: 18px;
    font-weight: 700;
  `,
};
