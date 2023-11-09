/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { Modal } from "reactstrap";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import _ from "lodash";
import { IoCloseSharp } from "react-icons/io5";

import ConfirmModal from "../Modal/ConfirmModal";
import { UploadedFiles } from "../upload/uploadFiles";
import { Upload } from "../upload/uploadFile";
import documentStore from "../../store/document";
import { UPDATE_DOCUMENT } from "../../graphql/mutations/document";
import { uploadFile } from "../upload/upload";

const EditDocModal = ({ modal, setModal, selectedDocument, userId }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: selectedDocument?.title,
      description: selectedDocument?.description,
    },
  });

  const router = useRouter();
  const { updateDocument } = documentStore((state) => state);
  const [updateDocumentAction, errEditDocument] = useMutation(UPDATE_DOCUMENT);

  const [saveAction, setSaveAction] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [fileList, setFileList] = useState([]);
  let fileListArr = _.entries(fileList);

  const toggle = () => {
    setModal(!modal);
  };

  const onChange = async (e) => {
    const selectedFiles = [...e.target.files];
    const uploadedFiles = {};
    selectedFiles?.map((eachFile, index) => {
      return (uploadedFiles[index] = eachFile);
    });
    setFileList({ ...fileList, ...uploadedFiles });
  };

  const downloadFile = async ({ fileName, url }) => {
    const httpLink = `${process.env.NEXT_PUBLIC_APP_URL}${url}`;
    return await fetch(httpLink)
      .then((res) => res.blob())
      .then((blob) => new File([blob], fileName));
  };

  const initializeFileList = async ({ fileUrl, fileName, index }) => {
    const name = fileName ?? "";
    const url = fileUrl ?? "";
    const id = index;
    const file = await downloadFile({ fileName: name, url: url });
    fileList[id] = file;
    setFileList({ ...fileList });
  };

  useEffect(() => {
    if (!!selectedDocument?.attachment) {
      selectedDocument?.attachment.map((eachAttach, index) => {
        initializeFileList({
          fileUrl: selectedDocument?.attachment[index]?.url,
          fileName: selectedDocument?.attachment[index]?.name,
          index: selectedDocument?.attachment[index]?.id,
        });
      });

      fileListArr = _.entries(fileList);
    }
  }, [selectedDocument]);

  const onSubmit = async (data) => {
    if (!!saveAction) {
      let filesArrToSend = [];
      for (let file of fileListArr) {
        const formData = new FormData();
        formData.append("files", file[1]);
        await uploadFile(formData).then(async (response) => {
          const json = await response.json();
          if (response.status === 200) {
            filesArrToSend.push(json[0]);
          }
        });
      }
      await updateDocument({
        updateDocumentAction,
        id: selectedDocument?.id,
        documentData: {
          title: data.title,
          description: data.description,
          attachment: filesArrToSend?.map((eachFile) => {
            return +eachFile?.id;
          }),
        },
        updatedAt: new Date().toISOString(),
      });
      setModal(false);
      router.push({
        pathname: `/documents`,
        query: {
          message: errEditDocument ? "Success!" : "Apologies!",
          belongTo: errEditDocument ? "Document" : "error",
          label: data?.title + " has successfully updated.",
          userId: userId,
        },
      });
    }
  };

  return (
    <>
      <Modal
        size="md"
        isOpen={!openConfirmModal}
        toggle={toggle}
        css={styles.modal}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div css={styles.formContent}>
            <div className="primary-text" css={styles.formHeader}>
              Edit Document{" "}
              <div
                onClick={() => {
                  setOpenConfirmModal(true);
                }}
              >
                <IoCloseSharp size={20} color="rgba(117, 117, 117, 1)" />
              </div>
            </div>

            <div className="formFlex">
              <div className="d-flex">
                <label className="secondary-text">
                  Title <span>*</span>
                </label>
              </div>
              <input
                type={"text"}
                className="secondary-text"
                required
                {...register("title", {
                  required: true,
                })}
              />
            </div>

            <div className="formFlex">
              <div className="d-flex">
                <label className="secondary-text">
                  Description <span>*</span>
                </label>
              </div>
              <textarea
                type="text"
                id="description"
                rows={3}
                className="secondary-text"
                required
                {...register("description", {
                  required: true,
                })}
              />
            </div>
            {fileListArr?.length > 0 ? (
              <UploadedFiles fileList={fileList} setFileList={setFileList} />
            ) : (
              <div className={styles.addNoteUploadContainer}>
                <Upload onChange={onChange} />
              </div>
            )}
          </div>
          <div css={styles.actionButton}>
            <button
              css={styles.addBtn}
              onClick={() => {
                setSaveAction(true);
              }}
            >
              Save
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmModal
        modal={openConfirmModal}
        setModal={setOpenConfirmModal}
        setEditModal={setModal}
      />
    </>
  );
};

export default EditDocModal;

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
      input,
      textarea {
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
