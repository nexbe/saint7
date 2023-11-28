/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import ActiveIcon from "../../public/icons/activeIcon";
import ProfileIcon from "../../public/icons/profileIcon";
import DutyNoti from "./DutyNoti";
import { UPDATE_NOTI } from "../../graphql/mutations/notification";
import notiStore from "../../store/notification";
import _ from "lodash";
import { useMutation } from "@apollo/client";
import { parseCookies } from "nookies";

const Card = ({ isActive, state, notiData }) => {
  const convertTimeToAMPM = (timeString) => {
    const time = new Date(`2000-01-01T${timeString}Z`); // Use a specific date to parse the time
    const options = { hour: "numeric", minute: "2-digit", hour12: true };
    return time.toLocaleString("en-US", options);
  };
  const cookies = parseCookies();
  const userData = cookies.user ? JSON.parse(cookies.user) : null;

  const [updateNotiAction] = useMutation(UPDATE_NOTI);
  const { updateNoti, getNotiFetchData } = notiStore((state) => state);

  const [dutyModalOpen, setDutyModalOpen] = useState(false);

  const readUsers = _.map(notiData?.attributes?.read_user?.data, "id");

  const handleClick = () => {
    if (isActive) {
      updateNoti({
        updateNotiAction,
        id: notiData?.id,
        notiData: {
          read_user: [...readUsers, userData?.id],
        },
        updatedAt: new Date().toISOString(),
      });
    }

    getNotiFetchData(true);
    setDutyModalOpen(!dutyModalOpen);
  };

  const handleClose = () => {
    getNotiFetchData(false);
    setDutyModalOpen(!dutyModalOpen);
  };

  return (
    <div css={styles.wrapper(isActive)} onClick={handleClick}>
      <div css={styles.header(isActive)}>
        {isActive && <ActiveIcon />}
        <div css={styles.info}>
          <div style={{ marginTop: "-9px", marginLeft: "9px" }}>
            <img
              src={
                notiData?.attributes?.user?.data?.attributes?.profile?.data
                  ?.attributes?.photo?.data?.attributes?.url
                  ? `${process.env.NEXT_PUBLIC_APP_URL}${notiData?.attributes?.user?.data?.attributes?.profile?.data?.attributes?.photo?.data?.attributes?.url}`
                  : `${process.env.NEXT_PUBLIC_APP_URL}/uploads/default_Image_49ed37eb5a.jpg`
              }
              style={{ width: 30, height: 30, borderRadius: 50 }}
            />
            <span style={{ marginLeft: "9px" }}>
              {notiData?.attributes?.user?.data?.attributes?.username}
            </span>
          </div>
          <div css={styles.stateStyle(state)}>{state ? "IN" : "Out"}</div>
        </div>
      </div>
      {state ? (
        <p css={styles.paragraph}>
          I am checked in and I am ready to take on any duties.
        </p>
      ) : (
        <p css={styles.paragraph}>
          I have completed my duties and am ready to check out.
        </p>
      )}
      {state ? (
        <div css={styles.checkInStyle}>
          <span>
            Check-in time: {convertTimeToAMPM(notiData?.attributes?.time)}
          </span>
          <span>Location: {notiData?.attributes?.location} </span>
        </div>
      ) : (
        <div css={styles.checkInStyle}>
          <span>
            Check-Out time: {convertTimeToAMPM(notiData?.attributes?.time)}
          </span>
          <span>Location: {notiData?.attributes?.location} </span>
        </div>
      )}
      {dutyModalOpen && (
        <DutyNoti
          isOpen={dutyModalOpen}
          close={() => handleClose()}
          notiData={notiData}
        />
      )}
    </div>
  );
};

export default Card;

const styles = {
  wrapper: (isActive) => css`
    border-radius: 4px;
    background: ${isActive ? "#eef8ff" : "#fff"};
    padding: 20px;
    color: var(--primary-font);
    // box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.1);
    border-bottom: 1px #d9d9d9 solid;
    p {
      margin-top: 9px;
    }
  `,
  header: (isActive) => css`
    display: flex;
    flex-direction: row;
    span {
      font-size: 14px;
      font-weight: 700;
      margin-left: ${isActive ? "20px" : ""};
      margin-top: -8px;
      text-transform: capitalize;
    }
  `,
  paragraph: css`
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
  `,
  info: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    span {
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
    }
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
  checkInStyle: css`
    display: flex;
    flex-direction: column;
    font-size: 14px;
    font-weight: 400;
  `,
};
