/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { Modal } from "reactstrap";
import CloseIcon from "../../public/icons/closeIcon";
import ProfileIcon from "../../public/icons/profileIcon";

const ViewModal = ({ modal, setModal }) => {
  const toggle = () => {
    setModal(!modal);
  };
  return (
    <Modal isOpen={modal} toggle={toggle} css={styles.wrapper}>
      <div css={styles.closeBtn} onClick={() => setModal(false)}>
        <CloseIcon />
      </div>
      <div css={styles.header}>
        <span>A Continually Unfolding History</span>
      </div>
      <p css={styles.paragraph}>
        A single building occupies the hillside at Hillview a historic
        240 hectare former sheep farm on Tasmanias Bruny Island.Surrounded by
        breathtaking beauty the building stands as a testament to the islands
        rich agricultural heritage. With its rustic charm and idyllic location 
        Hillview offers a glimpse into the past while providing a tranquil
        retreat for visitors seeking solace in nature.
      </p>
      <div css={styles.info}>
        <div>
          <ProfileIcon />
          <span style={{ marginLeft: "9px" }}>Jonah Johnson</span>
        </div>
        <span>1 hour ago</span>
      </div>
    </Modal>
  );
};

export default ViewModal;

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
  header: css`
    font-size: 18px;
    font-weight: 600;
    line-height: 25px;
    margin-left: 20px;
    text-transform: capitalize;
  `,
  closeBtn: css`
    margin-left: auto;
    cursor: pointer;
  `,
  paragraph: css`
    font-size: 16px;
    font-weight: 400;
  `,
  info: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    span {
      font-size: 12px;
      font-weight: 400;
    }
  `,
};
