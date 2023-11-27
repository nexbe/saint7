/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import MembersListModal from "./MembersListModal";
import DutyModal from "../DutyModal";
import attendenceStore from "../../../store/attendance";
import { useEffect } from "react";

const Card = ({ state, attendanceData }) => {
  const [viewModal, setViewModal] = useState(false);
  const [viewDutyModal, setViewDutyModal] = useState(false);
  // const [viewDutyModal, setViewDutyModal] = useState(false);

  const handleClick = () => {
    setViewModal(true);
  };

  console.log(attendanceData);

  return (
    <div css={styles.wrapper}>
      <div css={styles.container}>
        <div css={styles.profileContainer} onClick={() => handleClick()}>
          {attendanceData &&
            attendanceData?.length > 5 &&
            attendanceData?.slice(0, 5)?.map((attendance, index) => {
              return (
                <div key={index}>
                  <img
                    id={attendance?.id}
                    src={
                      attendance?.attributes?.assignee_shift?.data
                        ? `${process.env.NEXT_PUBLIC_APP_URL}${attendance?.attributes?.assignee_shift?.data?.attributes?.users_permissions_user?.data?.attributes?.profile?.data?.attributes?.photo?.data?.attributes?.url}`
                        : `${process.env.NEXT_PUBLIC_APP_URL}/uploads/default_Image_49ed37eb5a.jpg`
                    }
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
          {attendanceData &&
            attendanceData?.length < 5 &&
            attendanceData?.map((attendance, index) => {
              return (
                <div key={index}>
                  <img
                    id={attendance?.id}
                    src={
                      attendance?.attributes?.assignee_shift?.data
                        ? `${process.env.NEXT_PUBLIC_APP_URL}${attendance?.attributes?.assignee_shift?.data?.attributes?.users_permissions_user?.data?.attributes?.profile?.data?.attributes?.photo?.data?.attributes?.url}`
                        : `${process.env.NEXT_PUBLIC_APP_URL}/uploads/default_Image_49ed37eb5a.jpg`
                    }
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
          {attendanceData && attendanceData?.length > 5 && (
            <div css={styles.circle}>
              <span
                style={{
                  color: "#fff",
                  display: "flex",
                  padding: "5px",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "22px",
                }}
              >
                +{attendanceData?.length - 5}
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
      <MembersListModal
        isOpen={viewModal}
        setModal={setViewModal}
        setViewDutyModal={setViewDutyModal}
        attendanceData={attendanceData}
      />
      <DutyModal
        isOpen={viewDutyModal}
        close={() => setViewDutyModal(!viewDutyModal)}
      />
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
