/** @jsxImportSource @emotion/react */
import { Modal } from "reactstrap";
import { css } from "@emotion/react";
import CloseIcon from "../../../public/icons/closeIcon";

const MembersListModal = ({ isOpen, setModal, setViewDutyModal }) => {
  const close = () => {
    setModal(!isOpen);
  };
  const data = [
    { id: 0, name: "lyn" },
    { id: 1, name: "lyn" },
    { id: 2, name: "lyn" },
  ];
  return (
    <Modal isOpen={isOpen} toggle={close} css={styles.wrapper}>
      <div css={styles.actions}>
        <h3>Assigned Team Members</h3>
        <div onClick={() => close()}>
          <CloseIcon />
        </div>
      </div>
      <div css={styles.lists}>
        {data &&
          data.map((index) => {
            return (
              <div css={styles.container} key={index}>
                <div>
                <img
                  id={index}
                  src={"images/defaultImage.jpg"}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                  }}
                />
                <span>Christopher Young</span>
                </div>
                <div onClick={() => {
                  setViewDutyModal(true)
                  setModal(false)
                }}>View Duty</div>
              </div>
            );
          })}
      </div>
    </Modal>
  );
};

export default MembersListModal;

const styles = {
  wrapper: css`
    margin-top: 50%;
    padding: 20px;
    border-radius: 16px;
    background: #fff;
    color: var(--primary-font);
    .modal-content {
      border: none;
    }
    box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.08);
    @media (min-width: 440px) {
      margin-top: 5%;
    }
  `,
  actions: css`
    color: #2f4858;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    h4 {
      font-size: 18px;
      font-weight: 600;
    }
    div {
      cursor: pointer;
    }
  `,
  container: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 500;
    span {
      color: #386fff;
      margin-left:9px;
    }
    div {
      color: var(--primary);
    }
  `,
  lists: css`
    display: flex;
    margin-top: 20px;
    flex-direction: column;
    gap: 20px;
    max-height: 40vh;
    overflow-y: scroll;
  `,
};
