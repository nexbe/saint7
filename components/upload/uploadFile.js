/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { Spinner } from "reactstrap";

export const Upload = ({ onChange, belongTo }) => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <label className="secondary-text" style={{ marginTop: "10px" }}>
        Attach Documents <span style={{ color: "#ec1c24" }}>*</span>
      </label>
      <div css={styles.uploadContainer}>
        {loading ? (
          <>
            <Spinner color="info" />
            Uploading...
          </>
        ) : (
          <>
            <input
              disabled={loading}
              accept={
                belongTo === "addExpense"
                  ? `image/*`
                  : `application/pdf, image/*`
              }
              onChange={async (e) => {
                setLoading(true);
                await onChange(e);
                setLoading(false);
              }}
              type="file"
              css={styles.fileInput}
              multiple
              required
            />

            <div css={[styles.dragAndDrop, styles.f16_600]}>Browse File</div>
          </>
        )}
      </div>
    </>
  );
};

const styles = {
  uploadContainer: css`
    width: 100%;
    min-height: 120px;
    background: var(--white);
    box-shadow: 0px 4px 4px 0px rgba(117, 139, 154, 0.08);
    border: 2px dashed #d6e2ea;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    position: relative;
    padding: 10px;
    margin-bottom: 20px;
    margin-top: 10px;
    z-index: 0;
  `,
  fileInput: css`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    color: transparent;
    z-index: 1;

    &::-webkit-file-upload-button {
      visibility: hidden;
    }
  `,
  dragAndDrop: css`
    display: flex;
    gap: 20px;
    color: #5e72e4;
    align-items: center;
    text-decoration: underline;
  `,
  uploadButton: css`
    width: 400px;
    height: 50px;
    display: grid;
    place-items: center;
    color: white;
    background: linear-gradient(19.34deg, #1e3c72 -26.77%, #4b83e5 100.15%);
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2), -4px -4px 2px #ffffff;
    border-radius: 6px;
  `,
  f16_600: css`
    font-size: 16px;
    font-weight: 600;
  `,
};
