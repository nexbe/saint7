/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import MembersListModal from "./MembersListModal";
import DutyModal from "../DutyModal";

const Card = ({ state }) => {
  const [viewModal, setViewModal] = useState(false);
  const [viewDutyModal, setViewDutyModal] = useState(false);
  const data = [
    { id: 0 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 6 },
  ];
  return (
    <div css={styles.wrapper}>
      <div css={styles.container}>
        <div css={styles.profileContainer} onClick={() => setViewModal(true)}> 
          {data &&
            data.length > 5 &&
            data?.slice(0, 5)?.map((index) => {
              return (
                <div key={index}>
                <img
                  id={index}
                  src={"images/defaultImage.jpg"}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    marginLeft: "-10px",
                  }}
                />
                </div>
              );
            })}
          {data &&
            data.length < 5 &&
            data?.map((index) => {
              return (
                <div key={index}>
                <img
                  id={index}
                  src={"images/defaultImage.jpg"}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    marginLeft: "-10px",
                  }}
                />
                </div>
              );
            })}
          {data && data.length > 5 && (
            <div css={styles.circle}>
              <span
                style={{
                  color: "#fff",
                  display: "flex",
                  padding: "5px",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "22px",
                }}>
                +{data?.length - 5}
              </span>
            </div>
          )}
        </div>
        <div css={styles.stateStyle(state)}>{state ? "IN" : "Out"}</div>
      </div>
      <div style={{ marginTop: "20px" }}>
        {state
          ? "checked in and ready to take on any duties."
          : "completed my duties and am ready to check out."}
      </div>
      <MembersListModal isOpen={viewModal} setModal={setViewModal} setViewDutyModal={setViewDutyModal}/>
      <DutyModal isOpen={viewDutyModal} setModal={setViewDutyModal}/>
    </div>
  );
};

export default Card;
const styles = {
  wrapper: css`
    padding: 16px;
    background: #fff;
    font-size: 16px;
    font-weight: 600;
    font-size: 16px;
    font-weight: 600;
    color: rgba(47, 72, 88, 1);
    border-bottom: 1px solid #d9d9d9;
  `,
  stateStyle: (state) => css`
    border-radius: 6px;
    background: ${state ? "#1fa6b8" : "#EB5656"};
    padding: 2px 20px;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 600;
    color: var(--white);
  `,
  container: css`
    display: flex;
    padding: 9px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,
  profileContainer: css`
    display: flex;
    flex-direction: row;
  `,
  circle: css`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-left: -20px;
    display: flex;
    background: rgba(0, 0, 0, 0.8);
    cursor: pointer;
    span {
      color: #fff;
      display: flex;
      padding: 5px;
      justify-content: center;
      align-items: center;
      font-size: 22px;
    }
  `,
};
