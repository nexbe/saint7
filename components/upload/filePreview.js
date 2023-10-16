/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useDisclosure } from "@mantine/hooks";
import { AiOutlineFilePdf } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";

export const FilePreview = ({ onRemove, src, fileName, size }) => {
  const [hover, handlers] = useDisclosure(false);
  const FILE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".jfif"];
  const isImage = FILE_EXTENSIONS.some((extension) =>
    fileName?.endsWith(extension)
  );
  return (
    <div
      css={hover ? [styles.selectedFile, styles.zIndex2] : styles.selectedFile}
      onMouseEnter={handlers.open}
      onMouseLeave={() => setTimeout(handlers.close, 150)}
    >
      {isImage ? (
        <img css={styles.previewImage} src={src} />
      ) : (
        <div css={styles.fileIconContainer}>
          <AiOutlineFilePdf color={"#1E3C72"} size={80} />
        </div>
      )}
      <div css={[styles.showFileDetail, styles.f16_600]}>
        <button type="button" onClick={onRemove} css={styles.removeButton}>
          <IoCloseSharp size={20} color="#F6302B" />
        </button>
      </div>
    </div>
  );
};

const styles = {
  selectedFile: css`
    display: flex;
    flex-direction: column;
    background-color: #e3f0ff;
    position: relative;
    transition: all 150ms ease;
    border-radius: 4px 4px 0px 0px;

    &:hover > div {
      opacity: 1;
    }
  `,
  zIndex2: css`
    z-index: 2;
  `,
  fileIconContainer: css`
    width: 95px;
    height: 100px;
    display: grid;
    place-items: center;
  `,
  previewImage: css`
    width: 125px;
    height: 100px;
    object-fit: cover;
    border: 1px solid #e3f0ff;
    filter: drop-shadow(0px 4px 16px rgba(5, 14, 37, 0.05));
    border-radius: 4px 4px 0px 0px;
  `,
  removeButton: css`
    width: 30px;
    min-height: 30px;
    height: 30px;
    display: grid;
    place-items: center;
    border: 0;
    outline: none;
    background: #fafcff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05),
      inset 2px 2px 2px rgba(0, 0, 0, 0.15), inset -2px -2px 2px #ffffff;
    border-radius: 8px;
    margin: auto auto 0;
  `,
  showFileDetail: css`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background-color: #e3f0ff;
    padding: 15px 15px 20px;
    color: #1e3c72;
    transition: all 150ms ease;
    border-radius: 4px 4px 0px 0px;
  `,
  f16_600: css`
    font-size: 16px;
    font-weight: 600;
  `,
  fileIconContainer: css`
    width: 95px;
    height: 100px;
    display: grid;
    place-items: center;
  `,
};
