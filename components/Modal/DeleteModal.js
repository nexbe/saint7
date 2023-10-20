/** @jsxImportSource @emotion/react */
import { Modal } from "reactstrap";
import { css } from "@emotion/react";

const DeleteModal = ({
  selectedData,
  isOpen = false,
  close = () => {},
  handleDeleteConfirm = {},
  belongTo,
}) => {
  const handlConfirm = () => {
    selectedData.map((eachData, index) => {
      handleDeleteConfirm(eachData);
    });
    close();
  };

  return (
    <Modal size="md" isOpen={isOpen} toggle={close} css={styles.modal}>
      <div className="primary-text" css={styles.confirmText}>
        <span>Delete Confirmation message</span>
        <label>
          Are you sure you want to permanently delete these{" "}
          <label style={{ fontWeight: "700" }}>
            {belongTo != "certificate"
              ? selectedData && selectedData?.length
              : selectedData?.map((eachData) => {
                  return eachData?.name;
                })}
          </label>{" "}
          {belongTo != "certificate" ? belongTo : ""}
          {belongTo != "certificate"
            ? selectedData.length > 1
              ? "s"
              : ""
            : ""}
          ?
        </label>
      </div>
      <div css={styles.actions}>
        <div onClick={() => close()}>Cancel</div>
        <div onClick={handlConfirm}>Delete</div>
      </div>
    </Modal>
  );
};

export default DeleteModal;

const styles = {
  modal: css`
    margin-top: 12rem;
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
  confirmText: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 25px;
    font-weight: 400;
    span {
      line-height: 40px;
    }
  `,
  actions: css`
    display: flex;
    flex-direction: row;
    gap: 9px;
    margin-left: auto;
    margin-top: 10px;
    div {
      cursor: pointer;
      font-size: 18px;
      font-weight: 600;
    }
  `,
};
