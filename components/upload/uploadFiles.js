/** @jsxImportSource @emotion/react */
import { memo } from "react";
import { css } from "@emotion/react";
import { useDisclosure } from "@mantine/hooks";
import { FilePreview } from "./filePreview";
import _ from "lodash";

import UploadIcon from "../../public/icons/uploadIcon";
import { uploadFile } from "../upload/upload";

export const UploadedFiles = memo(function UploadedFiles({
  fileList = {},
  setFileList = () => {},
}) {
  const fileListArr = _.entries(fileList);

  const removeFile = (id) => {
    delete fileList[id];
    setFileList({ ...fileList });
  };

  const onChange = async (e) => {
    const selectedFiles = [...e.target.files];
    const uploadedFiles = {};
    for (let file of selectedFiles) {
      const fileData = {};
      const formData = new FormData();
      formData.append("files", file);
      const response = await uploadFile(formData);
      const json = await response.json();
      if (response.status === 200) {
        const term = json[0].id;
        fileData.attachment = term;
        uploadedFiles[json[0].id] = file;
      }
    }
    setFileList({ ...fileList, ...uploadedFiles });
  };

  return (
    <div css={styles.container}>
      <div css={styles.selectedFilesContainer}>
        <label className="secondary-text">
          Attach Documents <span style={{ color: "#ec1c24" }}>*</span>
        </label>
        <div css={styles.selectedFiles}>
          <div className="d-flex">
            {fileListArr.map(([id, file]) => (
              <FilePreview
                fileName={file?.name}
                src={
                  window !== undefined ? window.URL.createObjectURL(file) : ""
                }
                onRemove={() => {
                  removeFile(id);
                }}
                file={file}
                key={id}
              />
            ))}
          </div>
          {fileListArr.length !== 0 && (
            <label css={styles.uploadBtn}>
              <UploadIcon /> Upload file
              <input
                accept={`application/pdf, image/*`}
                onChange={async (e) => {
                  await onChange(e);
                }}
                type="file"
                css={styles.fileInput}
                multiple
              />
            </label>
          )}
        </div>
      </div>
    </div>
  );
});

UploadedFiles.displayName = "UploadedFiles";

const styles = {
  container: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-top: 10px;
  `,
  selectedFilesContainer: css`
    width: 100%;
    display: flex;
    flex-direction: column;
  `,
  toggleUploadFilesButton: css`
    width: fit-content;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    color: #1e3c72;
    border: 0;
    outline: none;
    background-color: transparent;
    margin-top: 23px;
    text-decoration: underline;
  `,
  selectedFiles: css`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: hidden;
    overflow-x: auto;
    width: 100%;
    height: 150px;
    background: var(--white);
    box-shadow: 0px 4px 4px 0px rgba(117, 139, 154, 0.08);
    border: 2px dashed #d6e2ea;
    padding: 10px;
    margin-bottom: 20px;
    margin-top: 10px;
    ::-webkit-scrollbar {
      height: 5px;
      background-color: transparent;
    }
    ::-webkit-scrollbar-thumb {
      height: 5px;
      border-radius: 10px;
      background-color: var(--lighter-gray);
    }
  `,
  uploadBtn: css`
    color: #5e72e4;
    font-size: 14px;
    padding: 3px;
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
};
