/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useDisclosure } from "@mantine/hooks";
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
      <div css={styles.fileIconContainer}>
        <img
          css={styles.previewImage}
          src={
            isImage
              ? src
              : `${process.env.NEXT_PUBLIC_APP_URL}/uploads/pdf_Icon_c25ad717da.png`
          }
        />
      </div>

      <div css={styles.selectedFileName}>
        <button type="button" onClick={onRemove} css={styles.removeButton}>
          <IoCloseSharp size={22} color="rgba(117, 117, 117, 1)" />
        </button>
      </div>
    </div>
  );
};

const styles = {
  selectedFile: css`
    display: flex;
    flex-direction: column;
    position: relative;
    transition: all 150ms ease;
    border-radius: 4px 4px 0px 0px;
    width: 110px;
    &:hover > div {
      opacity: 1;
    }
  `,
  zIndex2: css`
    z-index: 2;
  `,
  fileIconContainer: css`
    width: 90px;
    height: 100px;
    display: grid;
    place-items: center;
    border-radius: 10px;
    background: #e3f3ff;
    padding: 22px 10px 8px;
  `,
  previewImage: css`
    width: 70px;
    height: 70px;
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
    background: none;
    position: absolute;
    top: -4px;
    right: 18px;
  `,
  selectedFileName: css`
    width: 125px;
  `,
};
