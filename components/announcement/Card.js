/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import ActiveIcon from "../../public/icons/activeIcon";
import ViewModal from "./ViewModal";
import EditPencil from "../../public/icons/editPencil";
import { Input } from "reactstrap";
import dayjs from "dayjs";
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const Card = ({
  isActive,
  data,
  markAsRead,
  setEditModal,
  editModal,
  isDelete,
  isEdit,
  setSelectedData,
  isChecked,
  handleSelect
}) => {
  const [modal, setModal] = useState(false);

  const calculateTime = (time) => {
    const date = dayjs(time);
    const difference = date.fromNow();
    return difference;
  };
  return (
    <div css={styles.wrapper(!isActive)} onClick={markAsRead}>
      <div css={styles.header}>
        {isDelete && (
          <div style={{ marginTop: "-9px" }}>
            <Input
              type="checkbox"
              id="status"
              name="status"
              checked={isChecked}
              onChange={handleSelect}
              style={{ border: "2px solid #000" }}
            />
          </div>
        )}
        {!isActive && !isDelete && <ActiveIcon />}
        <span>{data.attributes?.title}</span>
        {isEdit && (
          <div
            onClick={() => {
              setEditModal(true)
              setSelectedData(data)
            }}
            style={{ marginTop: "-12px", marginLeft: "9px" }}>
            <EditPencil />
          </div>
        )}
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
          <img
            src={
              data?.attributes?.users_permissions_users?.data[0]?.attributes
                .profile?.data?.attributes.photo.data?.attributes.url
                ? `${process.env.NEXT_PUBLIC_APP_URL}${data?.attributes?.users_permissions_users?.data[0]?.attributes.profile.data?.attributes.photo?.data?.attributes.url}`
                : "images/defaultImage.jpg"
            }
            css={styles.profile}
          />
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
    margin: 15px;
    span {
      font-size: 12px;
      font-weight: 400;
    }
  `,
  profile: css`
    width: 35px;
    height: 35px;
    border-radius: 50%;
  `,
};
