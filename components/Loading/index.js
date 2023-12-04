/** @jsxImportSource @emotion/react */
import { Modal, Spinner } from "reactstrap";
import { css } from "@emotion/react";

const Loading = ({ isOpen = false, close = () => {} }) => {
  return (
    <Modal size="md" isOpen={isOpen} css={styles.modal} centered>
      <div css={styles.bodyContainer}>
        <Spinner css={styles.spinner} />
        <label className="primary-text">Loading... </label>
        <label className="primary-text">Please Wait...</label>
      </div>
    </Modal>
  );
};

export default Loading;

const styles = {
  modal: css`
    .modal-content {
      border-radius: 10px;
      border: none;
    }
  `,
  bodyContainer: css`
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  spinner: css`
    width: 4rem;
    height: 4rem;
    font-size: 3rem;
    color: #1e3c72;
    margin-bottom: 30px;
  `,
};
