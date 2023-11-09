/** @jsxImportSource @emotion/react */
import { Modal } from "reactstrap";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import DatePicker from "react-datepicker";
require("react-datepicker/dist/react-datepicker.css");
import { useMutation } from "@apollo/client";
import { IoCloseSharp } from "react-icons/io5";

import ConfirmModal from "../Modal/ConfirmModal";
import { UploadedFiles } from "../upload/uploadFiles";
import { Upload } from "../upload/uploadFile";
import { uploadFile } from "../upload/upload";
import certificateStore from "../../store/certificate";
import { UPDATE_CERTIFICATE } from "../../graphql/mutations/certificate";

const EditCertificateModal = ({
  selectedCertificate,
  isOpen,
  setEditModalOpen,
  userId,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: selectedCertificate?.name,
    },
  });
  const router = useRouter();
  const { updateCertificate } = certificateStore((state) => state);
  const [updateCertificateAction, errEditCertificate] =
    useMutation(UPDATE_CERTIFICATE);
  const [selectedDate, setSelectedDate] = useState(
    new Date(selectedCertificate.expiryDate)
  );
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [saveAction, setSaveAction] = useState(false);

  const [fileList, setFileList] = useState([]);
  let fileListArr = _.entries(fileList);

  const toggle = () => {
    setEditModalOpen(!isOpen);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
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
    if (!!selectedCertificate?.attachement) {
      selectedCertificate?.attachement.map((eachAttach, index) => {
        initializeFileList({
          fileUrl: selectedCertificate?.attachement[index]?.url,
          fileName: selectedCertificate?.attachement[index]?.name,
          index: selectedCertificate?.attachement[index]?.id,
        });
      });
      fileListArr = _.entries(fileList);
    }
  }, [selectedCertificate]);

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
      await updateCertificate({
        updateCertificateAction,
        id: selectedCertificate?.id,
        certificateData: {
          name: data.name,
          expiryDate: new Date(selectedDate).toISOString(),
          attachement: filesArrToSend?.map((eachFile) => {
            return +eachFile?.id;
          }),
        },
        updatedAt: new Date().toISOString(),
      });
      setEditModalOpen(false);
      router.push({
        pathname: `/profile`,
        query: {
          message: errEditCertificate ? "Success!" : "Apologies!",
          belongTo: errEditCertificate ? "Certificate" : "error",
          label: data?.name + " has successfully updated.",
          userId: userId,
        },
      });
    }
  };

  return (
    <>
      <Modal size="md" isOpen={!confirmOpen} toggle={toggle} css={styles.modal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div css={styles.formContent}>
            <div className="primary-text" css={styles.formHeader}>
              Edit Certifications{" "}
              <div
                onClick={() => {
                  setConfirmOpen(true);
                }}
              >
                <IoCloseSharp size={20} color="rgba(117, 117, 117, 1)" />
              </div>
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
                selected={selectedDate ?? selectedCertificate.expiredDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                showYearDropdown
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
