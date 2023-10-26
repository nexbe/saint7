/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Modal } from "reactstrap";
import { use, useState } from "react";

import CloseIcon from "../../../public/icons/closeIcon";

const ConfirmExpenseModal = ({
  isOpen = false,
  close = () => {},
  actionStatus,
  checkData,
  handleStatusConfirm,
  checkArr,
}) => {
  const [total, setTotal] = useState(null);
  const checkLists = checkArr?.map((each) => {
    return each[0];
  });
  let sum = 0;
  sum = checkLists?.map((eachCheck, index) => {
    return (sum += eachCheck?.amount);
  });

  return (
    <Modal isOpen={isOpen} toggle={close} css={styles.wrapper}>
      <div css={styles.header}>
        <h4>Confirmation</h4>
        <div onClick={close}>
          <CloseIcon />
        </div>
      </div>
      <div css={styles.confirmText}>
        <label className="label">
          Do you want to make{" "}
          {actionStatus === "rejected" ? "rejection" : "approval"} for these
          selected {checkData.length} claims?
        </label>
        <div
          className="valueBox"
          style={{
            background:
              actionStatus === "rejected"
                ? "rgba(236, 28, 36, 0.1)"
                : " #e3f3ff",
          }}
        >
          {checkLists?.map((eachCheck, index) => {
            return (
              <div key={index}>
                <label className="secondary-text">
                  {index + 1} . #ER-0000{eachCheck?.id} (
                  {eachCheck?.category?.label})
                  <span>$ {eachCheck?.amount}</span>
                </label>
              </div>
            );
          })}

          {/* <label className="secondary-text">
            2. #ER-00002 (Telephone Expense) <span>$ 300</span>
          </label>
          <label className="secondary-text">
            3. #ER-00003 (Telephone Expense) <span>$ 200</span>
          </label> */}
        </div>
        <div className="primary-text">
          Total Amount : $ {sum[sum.length - 1]}
        </div>
      </div>
      <div css={styles.actions}>
        <button css={styles.cancelBtn} onClick={close}>
          Cancel
        </button>
        <button
          css={styles.confirmBtn}
          onClick={() => {
            handleStatusConfirm(actionStatus);
            close();
          }}
          style={{
            background: actionStatus === "reject" ? "#EC1C24" : " #5fa452",
          }}
        >
          {actionStatus}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmExpenseModal;

const styles = {
  wrapper: css`
    margin-top: 65%;
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
    color: #2f4858;
    display: flex;
    align-items: center;
    justify-content: space-between;
    h4 {
      font-size: 18px;
      font-weight: 600;
    }
    div {
      cursor: pointer;
    }
  `,
  confirmText: css`
    display: flex;
    flex-direction: column;
    line-height: 25px;
    .label {
      display: flex;
      line-height: 23px;
      align-items: center;
      justify-content: center;
      padding: 16px 40px;
    }
    .valueBox {
      padding: 12px;
      line-height: 35px;
      margin-bottom: 10px;
      label {
        display: flex;
      }
      span {
        margin-left: auto;
      }
    }
  `,
  actions: css`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    button {
      border-radius: 10px;
      padding: 3px 20px;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.08),
        0px 4px 6px 0px rgba(50, 50, 93, 0.11);
    }
  `,
  cancelBtn: css`
    border: 1px solid rgba(160, 174, 192, 1);
    color: var(--dark-gray);
  `,
  confirmBtn: css`
    border: none;
    color: var(--white);
    text-transform: uppercase;
  `,
};
