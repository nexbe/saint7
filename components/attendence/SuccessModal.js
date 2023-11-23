/** @jsxImportSource @emotion/react */
import { Modal } from "reactstrap";
import { css } from "@emotion/react";

const SuccessModal = ({ isOpen, setModal, handleSubmit, count }) => {
  const close = () => {
    setModal(!isOpen);
  };
  return (
    <Modal isOpen={isOpen} toggle={close} css={styles.wrapper}>
      <div css={styles.content}>
        <p>Congratulations! </p>
        <p>
          <b>{count} users</b> has been created successfully.
        </p>
      </div>
      <div css={styles.btn} onClick={handleSubmit}>OK</div>
    </Modal>
  );
};

export default SuccessModal;
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
  content: css`
    color: #2f4858;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
  `,
  btn: css`
    margin-left: auto;
    font-size: 16px;
    font-weight: 700;
  `,
};
