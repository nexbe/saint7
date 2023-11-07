/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import { Modal } from "reactstrap";
import CloseIcon from "../../public/icons/closeIcon";
import useAnnouncement from "../../store/announcement";
import { useRouter } from "next/router";

const AddAnnouncementModal = ({ modal, setModal, userId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { createAnnouncement , errorCreateAnnouncement} = useAnnouncement();
  const router = useRouter();
  //console.log(errorCreateAnnouncement)
  const toggle = () => {
    setModal(!modal);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (title && description) {
      createAnnouncement({
        data: {
          title: title,
          description: description,
          users_permissions_users: userId,
          publishedAt: new Date().toISOString(),
        },
      });
      setModal(false)
      setTitle('');
      setDescription('');
      router.push({
        pathname: `/announcement`,
        query: {
          message: !errorCreateAnnouncement ? "Success!" : "Apologies!",
          belongTo: !errorCreateAnnouncement ? "Announcement" : "error",
          label: data?.title + " has successfully created.",
          userId: userId
        },
      })
    }
  };
  
  return (
    <Modal isOpen={modal} toggle={toggle} css={styles.wrapper}>
      <div css={styles.actions}>
        <h4>Add New Announcement</h4>
        <div onClick={() => setModal(false)}>
          <CloseIcon />
        </div>
      </div>
      <form css={styles.formStyle} onSubmit={onSubmitHandler}>
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
            onChange={(e) => setDescription(e.target.value)}
            value={description}
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
            Add New
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddAnnouncementModal;

const styles = {
  wrapper: css`
    margin-top: 50%;
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
  closeBtn: css`
    margin-left: auto;
    cursor: pointer;
  `,
  actions: css`
    color: #2f4858;
    margin: 10px 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    h4 {
      font-size: 18px;
      font-weight: 600;
    }
    div {
      cursor: pointer;
    }
  `,
  formStyle: css`
    color: #2f4858;
    margin: 10px 20px;
    div {
      display: flex;
      flex-direction: column;
      margin-top: 10px;
    }
    input {
      border-top: 0px;
      border-left: 0px;
      border-right: 0px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      outline: none;
    }
    textarea {
      border-top: 0px;
      border-left: 0px;
      border-right: 0px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      outline: none;
    }
    label {
      font-size: 16px;
      font-weight: 600;
    }
    span {
      color: #ec1c24;
    }
  `,
  btn: css`
    margin-top: 10px;
    width: 60%;
    border-radius: 10px;
    color: #fff;
    background: var(--primary);
    cursor: pointer;
    padding: 6px;
    border: none;
    font-size: 18px;
    font-weight: 700;
  `,
};
