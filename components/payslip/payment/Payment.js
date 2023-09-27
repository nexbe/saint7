/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import CloseIcon from "../../../public/icons/closeIcon";

const Payment = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  return (
    <div css={styles.wrapper}>
      <div css={styles.payment}>
        <h3 css={styles.title}>August</h3>
        <ul>
          <li style={{ fontWeight: 600 }}>
            <span> Net Salary </span> : <b>$500</b>
          </li>
          <li style={{ marginTop: "20px" }}>
            <span> Basic Salary </span>: <b>$500</b>
          </li>
          <li>
            <span>Allowance </span>: <b>$50</b>
          </li>
          <li>
            <span> Leave </span>: <b>$50</b>
          </li>
          <li>
            <span> Bank Acc No </span>: <b>159843014641</b>
          </li>
          <li>
            <span> Date of Payment </span>: <b> 31 August 2022</b>
          </li>
        </ul>
        <div>
          <h3 css={styles.title}>Upload Transaction Screenshot</h3>
          <div css={styles.dropzone}>
            {selectedImage && (
              <div css={styles.imageContainer}>
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected"
                  css={styles.selectedImage}
                />
                <div onClick={handleRemoveImage} css={styles.closeIcon}>
                  <CloseIcon />
                </div>
              </div>
            )}
            {!selectedImage && (
              <label css={styles.browseBtn}>
                Browse Picture
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            )}
          </div>
        </div>
        <div css={styles.actions}>
          <button css={styles.receivedBtn(selectedImage)}>Received</button>
          <button css={styles.notReceivedBtn}>Not Received</button>
        </div>
      </div>
    </div>
  );
};

export default Payment;

const styles = {
  wrapper: css`
    border-radius: 9px;
    padding: 20px;
    background: var(--white);
    box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.08);
    max-height: 71vh;
    overflow-y: scroll;
    @media (min-width: 440px) {
      margin: 30px;
    }
  `,
  title: css`
    color: #345165;
    font-size: 18px;
    font-weight: 700;
  `,
  payment: css`
    padding: 20px;
    ul {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding-left: 0rem;
      margin-top: 10px;
      margin-bottom: 25px;
    }
    li {
      color: #000;
      font-size: 16px;
      font-weight: 400;
      display: flex;
    }
    b {
      font-weight: 600;
      text-align: left;
      padding-left: 20px;
    }
    span {
      min-width: 125px;
      text-align: left;
      margin-right: 10px;
      display: inline-block;
    }
  `,
  receivedBtn: (isRecieved) => css`
    padding: 5px;
    border-radius: 9px;
    border: none;
    background: ${isRecieved ? 'rgba(40, 189, 65, 0.30)' : '#e2e8f0'};
    color: ${isRecieved ? '#28BD41' : 'var(--dark-gray)'};
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    max-width: 200px;
    min-width: 90px;
  `,
  notReceivedBtn: css`
    padding: 5px;
    border-radius: 9px;
    border: none;
    background: rgba(229, 62, 62, 0.3);
    color: #e53e3e;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    max-width: 200px;
    min-width: 90px;
  `,
  actions: css`
    display: flex;
    margin-top: 20px;
    flex-direction: row;
    gap: 20px;
  `,
  dropzone: css`
    border: 2px dashed #ccc;
    padding: 30px;
    margin-bottom: 20px;
    width: 100%;
    margin-top:30px;
    justify-content:start;
    display: flex;
    flex-direction: column;
  `,
  browseBtn: css`
    display: inline-block;
    padding: 8px 16px;
    font-weight: bold;
    color: #5E72E4;
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
    max-width: 200px;
    max-height: 200px;
    border-radius: 16px;
  `,
  imageContainer: css`
    position: relative;
    justify-content:start;
  `,
  closeIcon: css`
    position: absolute;
    top: 0;
    right:0;
    cursor: pointer;
    padding: 0;

    @media (min-width: 440px) {
      left: 20%;
    }
  `,
};
