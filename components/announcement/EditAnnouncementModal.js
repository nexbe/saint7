/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import { Modal } from "reactstrap";
import CloseIcon from "../../public/icons/closeIcon";

const EditAnnouncementModal = ({ modal, setModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const toggle = () => {
    setModal(!modal);
  };
  return (
    <Modal isOpen={modal} toggle={toggle} css={styles.wrapper}>
      <div css={styles.actions}>
        <h4>Edit Announcement</h4>
        <div onClick={() => setModal(false)}>
          <CloseIcon />
        </div>
      </div>
      <form css={styles.formStyle}>
        <div>
          <label htmlFor="title">
            Title <span>*</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">
            Description <span>*</span>
          </label>
          <textarea
            type="text"
            id="description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <button css={styles.btn} type="submit">
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditAnnouncementModal;
