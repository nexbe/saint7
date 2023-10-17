/** @jsxImportSource @emotion/react */
import { Modal } from "reactstrap";
import { useState } from "react";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
require("react-datepicker/dist/react-datepicker.css");
import { IoCloseSharp } from "react-icons/io5";
import { useMutation } from "@apollo/client";
import _ from "lodash";

import certificateStore from "../../store/certificate";
import { CREATE_CERTIFICATE } from "../../graphql/mutations/certificate";
import { UploadedFiles } from "../upload/uploadFiles";
import { Upload } from "../upload/uploadFile";
import { uploadFile } from "../upload/upload";

const AddCertificateModal = ({ isOpen = false, close = () => {}, userId }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { createCertificate } = certificateStore((state) => state);
  const [createCertificateAction] = useMutation(CREATE_CERTIFICATE);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [saveAction, setSaveAction] = useState(false);

  const [fileList, setFileList] = useState([]);
  let fileListArr = _.entries(fileList);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const onSubmit = async (data) => {
    if (!!saveAction) {
      let filesArrToSend = [];
      for (let file of fileListArr) {
        let fileData = {};
        let uploadFiles = {};
        const formData = new FormData();
        formData.append("files", file[1]);
        const response = await uploadFile(formData);
        const json = await response.json();
        if (response.status === 200) {
          const term = json[0].id;
          fileData.attachment = term;
          filesArrToSend.push(json[0]);
          uploadFiles[term] = file;
        }
      }
      await createCertificate({
        createCertificateAction,
        data: {
          name: data.name,
          expiryDate: new Date(selectedDate).toISOString(),
          users_permissions_user: userId,
          attachement: filesArrToSend?.map((eachFile) => {
            return +eachFile?.id;
          }),
          publishedAt: new Date().toISOString(),
        },
      });
      close();
      router.push("/profile");
    }
  };

  const onChange = async (e) => {
    const selectedFiles = [...e.target.files];
    const uploadedFiles = {};

    for (let file of selectedFiles) {
      uploadedFiles[0] = file;
    }

    setFileList({ ...fileList, ...uploadedFiles });
  };

  return (
    <Modal size="md" isOpen={isOpen} toggle={close} css={styles.modal}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div css={styles.formContent}>
          <div className="primary-text" css={styles.formHeader}>
            Add New Certifications/ Licenses{" "}
            <IoCloseSharp
              size={20}
              color="rgba(117, 117, 117, 1)"
              onClick={() => {
                close();
              }}
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
              required
              {...register("name", {
                required: true,
              })}
            />
          </div>
          <div className="formFlex">
            <div className="d-flex">
              <label className="secondary-text">
                Expired Date <span>*</span>
              </label>
            </div>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              required={true}
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
            Add New
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddCertificateModal;

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
};
