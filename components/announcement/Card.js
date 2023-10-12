/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import ActiveIcon from "../../public/icons/activeIcon";
import ProfileIcon from "../../public/icons/profileIcon";
import ViewModal from "./ViewModal";
import dayjs from "dayjs";
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const Card = ({ isActive, data, markAsRead }) => {
  const [modal, setModal] = useState(false);

  const calculateTime = (time) => {
    const date = dayjs(time);
    const difference = date.fromNow();
    return difference;
  };

  return (
    <div css={styles.wrapper(!isActive)} onClick={markAsRead}>
      <div css={styles.header}>
        {!isActive && <ActiveIcon />}
        <span>{data.attributes?.title}</span>
      </div>
      <p css={styles.paragraph}>
        {data?.attributes?.description?.slice(0, 150)}
        {"   "}
        <b style={{ color: "#386FFF" }} onClick={() => setModal(true)}>
          View More
        </b>
      </p>
      <div css={styles.info}>
        <div>
          <ProfileIcon />
          <span style={{ marginLeft: "9px" }}>
            {
              data.attributes?.users_permissions_users?.data?.[0]?.attributes
                ?.username
            }
          </span>
        </div>
        <span>{calculateTime(data.attributes?.createdAt)}</span>
      </div>
      <ViewModal
        modal={modal}
        setModal={setModal}
        data={data}
        time={calculateTime(data.attributes?.createdAt)}
      />
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
    box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.08);

    p {
      margin: 20px;
    }
  `,
  header: (isActive) => css`
    display: flex;
    flex-direction: row;
    span {
      font-size: 18px;
      font-weight: 600;
      line-height: 25px;
      margin-left: ${isActive ? "20px" : ""};
      margin-top: -8px;
      text-transform: capitalize;
    }
  `,
  paragraph: css`
    font-size: 16px;
    font-weight: 400;
    b {
      cursor: pointer;
    }
  `,
  info: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    span {
      font-size: 12px;
      font-weight: 400;
    }
  `,
};
