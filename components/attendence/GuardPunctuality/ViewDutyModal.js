/** @jsxImportSource @emotion/react */
import { Modal } from "reactstrap";
import { css } from "@emotion/react";
import CloseIcon from "../../../public/icons/closeIcon";
import { BiLogIn } from "react-icons/bi";

const ViewDutyModal = ({ isOpen, setModal }) => {
  const close = () => {
    setModal(!isOpen);
  };
  return (
    <Modal isOpen={isOpen} toggle={close} css={styles.wrapper}>
      <div css={styles.actions}>
        <h3>Duty In Progress...</h3>
        <div onClick={() => close()}>
          <CloseIcon />
        </div>
      </div>
      <div css={styles.container}>
        <div css={styles.info}>
          <div css={styles.profile}>
            <img
              src={"images/defaultImage.jpg"}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
              }}
            />
            <span>Christopher Young</span>
          </div>
          <p>
            Wednesday <br />
            <span style={{ fontSize: "22px" }}>17th Jun, 2023</span>
          </p>
          <p>
            Time of Duty (Planned) <br />
            <span style={{ fontSize: "22px" }}>09:00 to 18:00</span>
          </p>
          <p>3891 Ranchview Dr. Richardson, California 62639</p>
        </div>
        <div css={styles.time}>
          <div css={styles.profile}>
            <div
              style={{
                background: "#222e50",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
              }}>
              <BiLogIn color="#fff" size={22} />
            </div>
            <p>
              Actual Check-in Time <br />
              <span style={{ fontSize: "22px" }}>09:05</span>
            </p>
          </div>
          <div css={styles.profile}>
            <div
              style={{
                background: "#B3B3B3",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
              }}>
              <BiLogIn color="#fff" size={22} />
            </div>
            <p>
              Actual Check-in Time <br />
              <span style={{ fontSize: "22px" }}>N.A</span>
            </p>
          </div>
          <div css={styles.btn}>00:05 Hr </div>
        </div>
      </div>
      <div style={{marginTop:'30px'}}>If you have any issue, send us an email to <span style={{fontSize:"16px",color: "#386FFF", fontWeight:700}}>Report</span></div>
    </Modal>
  );
};

export default ViewDutyModal;
const styles = {
  wrapper: css`
    margin-top: 30%;
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
  profile: css`
    display: flex;
    flex-direction: row;
    color: #2f4858;
    font-size: 14px;
    font-weight: 700;
    p {
      text-wrap: wrap;
      margin-left: 3px;
    }
  `,
  info: css`
    display: flex;
    flex-direction: column;
    gap: 20px;
    font-size: 14px;
    font-weight: 400;
  `,
  time: css`
    background: #e3f3ff;
    padding: 6px;
    padding-top: 20px;
    width: 350px;
  `,
  container: css`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin-top:16px;
  `,
  btn: css`
    margin:9px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    padding:9px 20px;
    background: var(--primary);
    font-size: 16px;
    font-weight: 600;
    color: var(--white);
  `,
};
