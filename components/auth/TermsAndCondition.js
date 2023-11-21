/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { Modal } from "reactstrap";

const TermsAndConditions = ({ modal, setModal, setSuccessModal }) => {
  const handleAcceptHandler = () => {
    setSuccessModal(true);
    setModal(false);
  };
  return (
    <Modal isOpen={modal} toggle={() => setModal(!modal)} css={styles.wrapper}>
      <div css={styles.modalStyle}>
        <h4>Terms and conditions</h4>
        <p>I have read and understood the Data Protection Policy.</p>
        <p>
          I have checked the edited by salary detail and it is correct. This
          will be a contract between me and the company.
        </p>
        <p>
          I understand the company policy that I need to check in and out my
          attendance digitally and if I am unable to check in or out due to app
          error, I need to immediately inform my Operations Executive (OE) of
          the occurrence. Failing to check in and out digital will cause delay
          in my payment for that day. I will have to submit an appeal and give
          evidence of my attendance for that day. The company policy is an admin
          fee $20 per day will charged if its due to my failing to check in and
          out without a valid reason.
        </p>
      </div>
      <div css={styles.actions}>
        <button className="acceptBtn" onClick={handleAcceptHandler}>
          Accept
        </button>
        <button className="declineBtn" onClick={() => setModal(false)}>
          Decline
        </button>
      </div>
    </Modal>
  );
};

export default TermsAndConditions;
const styles = {
  modalStyle: css`
    background: var(--white);
    display: flex;
    flex-direction: column;
    font-size: 16px;
    color: #2f4858;
  `,
  wrapper: css`
    margin-top: 9%;
    padding: 40px;
    border-radius: 16px;
    background: #fff;
    color: var(--primary-font);
    h4 {
      font-size: 18px;
      font-weight: 600;
    }
    p {
      font-size: 16px;
    }
    .modal-content {
      border: none;
    }
    @media (min-width: 440px) {
      margin-top: 5%;
    }
  `,
  actions: css`
    display: flex;
    gap: 20px;
    .acceptBtn {
      border-radius: 10px;
      background: #293991;
      padding: 5px 60px;
      color: var(--white);
      box-shadow: -2px 0px 10px 0px rgba(65, 70, 92, 0.2);
    }

    .declineBtn {
      border-radius: 10px;
      border: 2px solid #293991;
      background: #fff;
      padding: 5px 50px;
      color: #293991;
    }
  `,
};
