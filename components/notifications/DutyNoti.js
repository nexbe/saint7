/** @jsxImportSource @emotion/react */
import { Modal } from "reactstrap";
import { useState } from "react";
import { css } from "@emotion/react";

import CloseIcon from "../../public/icons/closeIcon";
import CheckInIcon from "../../public/icons/checkInIcon";
import CheckOutIcon from "../../public/icons/CheckOutIcon";
import attendenceStore from "../../store/attendance";
import { useEffect } from "react";
import { useApolloClient } from "@apollo/client";
import moment from "moment";
import notiStore from "../../store/notification";

const DutyNoti = ({ isOpen = false, close = () => {}, notiData }) => {
  const apolloClient = useApolloClient();

  const { updateNoti, getNotiFetchData } = notiStore((state) => state);

  const formatTime = (timeString) => {
    const timeParts = timeString?.split(":"); // Split the string by colon

    // Extract hours and minutes
    const hours = timeParts[0];
    const minutes = timeParts[1];
    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
  };

  const handleClose = () => {
    close();
    getNotiFetchData(false);
  };

  return (
    <Modal isOpen={isOpen} toggle={close} css={styles.wrapper}>
      <div css={styles.actions}>
        <h3>Duty In Progress...</h3>
        <div onClick={() => handleClose()}>
          <CloseIcon />
        </div>
      </div>
      <div css={styles.dutyDetails}>
        <div className="timeBox">
          <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <img
              src={
                notiData?.attributes?.user?.data?.attributes?.profile?.data
                  ?.attributes?.photo?.data?.attributes?.url
                  ? `${process.env.NEXT_PUBLIC_APP_URL}${notiData?.attributes?.user?.data?.attributes?.profile?.data?.attributes?.photo?.data?.attributes?.url}`
                  : `${process.env.NEXT_PUBLIC_APP_URL}/uploads/default_Image_49ed37eb5a.jpg`
              }
              style={{ width: 30, height: 30, borderRadius: 50 }}
            />
            <label>
              {" "}
              {notiData?.attributes?.user?.data?.attributes?.username}
            </label>
          </div>
          <div style={{ fontSize: "16px" }}>
            {moment(
              notiData?.attributes?.attendance?.data?.attributes?.date
            ).format("dddd")}
            <label className="d-flex">
              {moment(
                notiData?.attributes?.attendance?.data?.attributes?.date
              ).format("Do MMMM YYYY")}
            </label>
          </div>
          <div>
            Time of Duty (Planned)
            <label className="d-flex" css={styles.boldText}>
              {notiData?.attributes?.attendance?.data?.attributes
                ?.assignee_shift?.data?.attributes?.shift?.data?.attributes
                ?.timeRange?.StartTime
                ? formatTime(
                    notiData?.attributes?.attendance?.data?.attributes
                      ?.assignee_shift?.data?.attributes?.shift?.data
                      ?.attributes?.timeRange?.StartTime
                  )
                : "00:00:00"}{" "}
              to{" "}
              {notiData?.attributes?.attendance?.data?.attributes
                ?.assignee_shift?.data?.attributes?.shift?.data?.attributes
                ?.timeRange?.EndTime
                ? formatTime(
                    notiData?.attributes?.attendance?.data?.attributes
                      .assignee_shift?.data?.attributes?.shift?.data?.attributes
                      ?.timeRange?.EndTime
                  )
                : "00:00:00"}
            </label>
          </div>
          <div>{notiData?.attributes?.location}</div>
        </div>
        <div className="checkInBox">
          <div className="d-flex" style={{ gap: "10px" }}>
            <CheckInIcon />{" "}
            <label>
              Actual Check-in Time{" "}
              <label className="d-flex" css={styles.boldText}>
                {notiData?.attributes?.attendance?.data?.attributes?.checkInTime
                  ? formatTime(
                      notiData?.attributes?.attendance?.data?.attributes
                        ?.checkInTime
                    )
                  : "00:00"}
              </label>
            </label>
          </div>
          <div className="d-flex" style={{ gap: "10px", marginTop: "15px" }}>
            <CheckOutIcon />{" "}
            <label>
              Actual Check-out Time{" "}
              <label className="d-flex" css={styles.boldText}>
                {notiData?.attributes?.attendance?.data?.attributes?.status ==
                  "Complete" &&
                notiData?.attributes?.attendance?.data?.attributes?.checkOutTime
                  ? formatTime(
                      notiData?.attributes?.attendance?.data?.attributes
                        ?.checkOutTime
                    )
                  : "N.A"}
              </label>
            </label>
          </div>
          <div className="d-flex">
            <span className="lineDash"></span>
          </div>
          <button>00:00 Hr</button>
        </div>
      </div>
    </Modal>
  );
};

export default DutyNoti;

const styles = {
  wrapper: css`
    margin-top: 50%;
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
  dutyDetails: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 25px;
    padding: 20px 0;
    gap: 5px;
    position: relative;
    .timeBox {
      display: flex;
      flex-direction: column;
      gap: 25px;
      width: 50%;
    }
    .checkInBox {
      background: rgba(227, 243, 255, 1);

      padding: 15px;
      width: 50%;
    }
    .lineDash {
      border: 1px dashed var(--darker-gray);
      height: 66px;
      position: absolute;
      margin-top: -8rem;
      margin-left: 10px;
    }
    svg {
      width: 30px;
      height: 30px;
    }
    button {
      display: flex;
      height: 40px;
      padding: 12px 20px;
      justify-content: center;
      align-items: center;
      gap: 2px;
      border-radius: 8px;
      background: var(--primary);
      border: none;
      color: #fff;
      font-size: 16px;
      font-weight: 600;
      margin-top: 20px;
    }
  `,
  repotText: css`
    label {
      color: #386fff;
      font-size: 16px;
      font-weight: 700;
      line-height: 125%;
      text-decoration: underline;
    }
  `,
  boldText: css`
    color: #2f4858;
    font-size: 16px;
    font-weight: 600;
    line-height: 125%;
  `,
};
