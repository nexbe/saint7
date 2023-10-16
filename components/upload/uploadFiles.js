/** @jsxImportSource @emotion/react */
import { memo } from "react";
import { css } from "@emotion/react";
import { useDisclosure } from "@mantine/hooks";
import { FilePreview } from "./filePreview";
import _ from "lodash";

import UploadIcon from "../../public/icons/uploadIcon";

export const UploadedFiles = memo(function UploadedFiles({
  fileList = {},
  setFileList = () => {},
}) {
  const [opened, openHandlers] = useDisclosure(false);
  const fileListArr = _.entries(fileList);

  const removeFile = (id) => {
    delete fileList[id];
    setFileList({ ...fileList });
  };

  return (
    <div css={styles.container}>
      <div css={styles.selectedFilesContainer}>
        <label className="secondary-text">
          Attach Documents <span style={{ color: "#ec1c24" }}>*</span>
        </label>
        <div css={styles.selectedFiles}>
          {fileListArr.map(([id, file]) => (
            <FilePreview
              fileName={file?.name}
              src={window !== undefined ? window.URL.createObjectURL(file) : ""}
              onRemove={() => {
                removeFile(id);
              }}
              file={file}
              key={id}
            />
          ))}
        </div>
        {/* {fileListArr.length !== 0 && (
            // <button
            //   onClick={openHandlers.toggle}
            //   css={styles.toggleUploadFilesButton}
            // >
            //   <AiOutlinePlus color="#1E3C72" />
            //   Upload another file
            // </button>
            <label css={styles.uploadBtn}>
              <UploadIcon /> Upload file
              <input
                disabled={loading}
                accept={`application/pdf, image/*`}
                onChange={async (e) => {
                  setLoading(true);
                  await onChange(e);
                  setLoading(false);
                }}
                type="file"
                css={styles.fileInput}
                multiple
              />
            </label>
          )} */}
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
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    width: 100%;
    min-height: 85px;
    background: var(--white);
    box-shadow: 0px 4px 4px 0px rgba(117, 139, 154, 0.08);
    border: 2px dashed #d6e2ea;
    padding: 10px;
    margin-bottom: 20px;
    margin-top: 10px;
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
};
