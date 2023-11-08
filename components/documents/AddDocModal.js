/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { css } from "@emotion/react";
import { Modal } from "reactstrap";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import _ from "lodash";

import CloseIcon from "../../public/icons/closeIcon";
import documentStore from "../../store/document";
import { CREATE_DOCUMENT } from "../../graphql/mutations/document";
import { UploadedFiles } from "../upload/uploadFiles";
import { Upload } from "../upload/uploadFile";
import { uploadFile } from "../upload/upload";

const AddDocModal = ({ modal, setModal, userId }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({});
  const router = useRouter();
  const { createDocument } = documentStore((state) => state);
  const [createDocumentAction, errCreateDocument] =
    useMutation(CREATE_DOCUMENT);
  const [saveAction, setSaveAction] = useState(false);
  const [fileList, setFileList] = useState([]);
  let fileListArr = _.entries(fileList);

  const toggle = () => {
    setModal(!modal);
    reset({
      title: null,
      description: null,
      attachment: null,
    });
    setFileList([]);
    filesArrToSend = [];
  };
  let filesArrToSend = [];
  const onSubmit = async (data) => {
    if (!!saveAction) {
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
      await createDocument({
        createDocumentAction,
        data: {
          title: data.title,
          description: data.description,
          users_permissions_users: userId,
          attachment: filesArrToSend?.map((eachFile) => {
            return +eachFile?.id;
          }),
          publishedAt: new Date().toISOString(),
        },
      });
      setModal(false);
      reset({
        title: null,
        description: null,
        attachment: null,
      });
      setFileList([]);
      filesArrToSend = [];
      router.push({
        pathname: `/documents`,
        query: {
          message: errCreateDocument ? "Success!" : "Apologies!",
          belongTo: errCreateDocument ? "Document" : "error",
          label: data?.title + " has successfully created.",
        },
      });
    }
  };

  const onChange = async (e) => {
    const selectedFiles = [...e.target.files];
    const uploadedFiles = {};
    selectedFiles?.map((eachFile, index) => {
      return (uploadedFiles[index] = eachFile);
    });
    setFileList({ ...fileList, ...uploadedFiles });
  };
  return (
    <Modal isOpen={modal} toggle={toggle} css={styles.wrapper}>
      <div css={styles.actions}>
        <h4>Add New Document</h4>
        <div onClick={toggle}>
          <CloseIcon />
        </div>
      </div>
      <form css={styles.formStyle} onSubmit={handleSubmit(onSubmit)}>
        <div className="formFlex">
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
        <div className="formFlex">
          <label htmlFor="description">
            Description <span>*</span>
          </label>
          <textarea
            type="text"
            id="description"
            rows={3}
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
        {fileListArr?.length > 0 ? (
          <UploadedFiles fileList={fileList} setFileList={setFileList} />
        ) : (
          <div className={styles.addNoteUploadContainer}>
            <Upload onChange={onChange} />
          </div>
        )}
        <div className="formFlex">
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
    .formFlex {
      display: flex;
      flex-direction: column;
      margin-top: 10px;
    }
    input,
    textarea {
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
