/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { css } from "@emotion/react";
import { BiCalendarAlt } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";

const LeaveHistoryCard = ({
  leaveDay,
  requestTo,
  leaveReason,
  approvedBy,
  startDate,
  endDate,
  leaveStatus,
}) => {
  const [cardDetail, setCardDetail] = useState(false);

  return (
    <div css={styles.cardContainer}>
      <div css={styles.eachCard} className="primary-text">
        <label>
          <div className="d-flex" style={{ gap: "30px" }}>
            Request Leave{" "}
            <span style={{ fontSize: "14px" }}>
              {leaveDay}{" "}
              <span style={{ fontWeight: "400", fontSize: "14px" }}>Days</span>
            </span>
          </div>
          <div css={styles.leaveDetails}>
            <div>
              <span>Request To</span>
              <span>Reason</span>
              {leaveStatus != "Pending" && (
                <span>
                  {leaveStatus == "Approved" ? "Approved" : "Rejected"} by
                </span>
              )}
            </div>
            <div>
              <span>:</span>
              <span>:</span>
              {leaveStatus != "Pending" && <span>:</span>}
            </div>
            <div>
              <span>{requestTo}</span>
              <span>{leaveReason}</span>
              {leaveStatus != "Pending" && <span>{approvedBy}</span>}
            </div>
          </div>
          <span className="leaveDate">
            <BiCalendarAlt color="#A0AEC0" size={18} />
            {startDate}
            <BsArrowRight color="rgba(0, 0, 0, 1)" size={18} />{" "}
            <BiCalendarAlt color="#A0AEC0" size={18} />
            {endDate}
          </span>
        </label>
        <div
          css={styles.expenseStatus}
          style={{
            background:
              leaveStatus == "Approved"
                ? "rgba(95, 164, 82, 0.30)"
                : leaveStatus == "Rejected"
                ? "rgba(236, 28, 36, 0.30)"
                : "",
            color:
              leaveStatus == "Approved"
                ? "#5FA452"
                : leaveStatus == "Rejected"
                ? "#EC1C24"
                : "",
          }}
        >
          {leaveStatus}
        </div>
      </div>
    </div>
  );
};

export default LeaveHistoryCard;

const styles = {
  cardContainer: css`
    display: flex;
    flex-direction: column;
    gap: 8px;
    .detailWrapper {
      margin-top: -6px;
      .primary-text:last-child {
        border-radius: 0 0 10px 10px;
      }
    }
  `,
  eachCard: css`
    display: flex;
    flex-direction: row;
    line-height: 25px;
    padding: 7px 10px;
    justify-content: space-between;
    border-radius: 10px;
    background: var(--white);
    box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.08);
    label {
      display: flex;
      flex-direction: column;
    }
    span {
      font-size: 12px;
      color: #37474f;
      display: flex;
      gap: 5px;
    }
    .leaveDate {
      justify-content: center;
      align-items: center;
      margin-left: 5px;
    }
  `,
  leaveDetails: css`
    display: flex;
    gap: 7%;
    margin: 10px 5px;
    div {
      justify-content: space-between;
    }
  `,
  expenseDetail: css`
    padding: 0px 10px;
    font-size: 8px;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    background: #e0eeff;
    text-transform: uppercase;
    width: 65%;
  `,
  expenseStatus: css`
    font-size: 12px;
    text-transform: capitalize;
    height: 25px;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background: rgba(251, 122, 3, 0.5);
    color: #d06c0f;
  `,
};
