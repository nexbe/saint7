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
  const [createCertificateAction, errCreateCertificate] =
    useMutation(CREATE_CERTIFICATE);

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
        const formData = new FormData();
        formData.append("files", file[1]);
        await uploadFile(formData).then(async (response) => {
          const json = await response.json();
          if (response.status === 200) {
            filesArrToSend.push(json[0]);
          }
        });
      }
      await createCertificate({
        createCertificateAction,
        data: {
          name: data.name,
          expiryDate: new Date(selectedDate).toISOString(),
          users_permissions_user: +userId,
          attachement: filesArrToSend?.map((eachFile) => {
            return +eachFile?.id;
          }),
          publishedAt: new Date().toISOString(),
        },
      });
      close();
      router.push({
        pathname: `/profile`,
        query: {
          message: errCreateCertificate ? "Success!" : "Apologies!",
          belongTo: errCreateCertificate ? "Certificate" : "error",
          label: data?.name + " has successfully created.",
          userId: userId,
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
              showYearDropdown
            />
          </div>
          <div>
            {fileListArr?.length > 0 ? (
              <UploadedFiles fileList={fileList} setFileList={setFileList} />
            ) : (
              <div className={styles.addNoteUploadContainer}>
                <Upload onChange={onChange} />
              </div>
            )}
          </div>
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
      label {
        span {
          color: #ec1c24;
        }
      }
      input {
        border: none;
        outline: none;
      }
      .react-datepicker {
        span {
          color: #000;
          font-weiht: 700;
          font-size: 16px;
        }
      }
      .react-datepicker__triangle {
        display: none;
      }
      .react-datepicker__navigation-icon--next {
        top: 11px;
        left: -10px;
        font-size: 16px;
      }
      .react-datepicker__navigation-icon--previous {
        top: 11px;
        left: 5px;
        font-size: 16px;
      }
      .react-datepicker__year-read-view--down-arrow {
        top: 7px;
        font-size: 16px;
        border-color: none;
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
