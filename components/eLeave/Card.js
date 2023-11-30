/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { BiCalendarAlt } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import dayjs from "dayjs";

const LeaveHistoryCard = ({ eachLeave }) => {
  return (
    <div css={styles.cardContainer}>
      <div css={styles.eachCard} className="secondary-text">
        <label>
          <div className="d-flex" style={{ gap: "30px" }}>
            Request Leave{" "}
            {eachLeave?.numberOfDays >= 1 ? (
              <span style={{ fontSize: "14px" }}>
                {eachLeave?.numberOfDays}{" "}
                <span style={{ fontWeight: "400", fontSize: "14px" }}>
                  Days
                </span>
              </span>
            ) : (
              <span style={{ fontSize: "14px" }}>
                {eachLeave?.halfdayOptions === "Firsthalf"
                  ? "First Half (AM)"
                  : "Second Half (PM)"}
              </span>
            )}
          </div>
          <ul css={styles.details}>
            <li>
              <span>Request To</span> :
              <b>
                {eachLeave?.requestedTos?.map((eachRequest) => {
                  return (
                    eachRequest?.username +
                    " (" +
                    eachRequest?.role?.name +
                    "), "
                  );
                })}
              </b>
            </li>
            <li>
              <span>Reason</span>:<b>{eachLeave?.reason}</b>
            </li>
            {eachLeave?.status != "Pending" && (
              <li>
                <span>
                  {eachLeave?.status == "Approved" ? "Approved" : "Rejected"} by
                </span>{" "}
                :
                <b>
                  {eachLeave?.actionBy?.username} (
                  {eachLeave?.actionBy?.role?.name})
                </b>
              </li>
            )}
          </ul>
          <span className="leaveDate">
            <BiCalendarAlt color="#A0AEC0" size={18} />
            {dayjs(eachLeave?.from).locale("en-US").format("MMM / DD / YY")}
            <BsArrowRight color="rgba(0, 0, 0, 1)" size={18} />{" "}
            <BiCalendarAlt color="#A0AEC0" size={18} />
            {dayjs(eachLeave?.to).locale("en-US").format("MMM / DD / YY")}
          </span>
        </label>
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
    color: #2f4858;
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
      width: 100%;
    }
    span {
      font-size: 12px;
      color: #37474f;
      display: flex;
      gap: 5px;
    }
    .leaveDate {
      justify-content: flex-start;
      align-items: center;
      margin-left: 5px;
    }
  `,
  leaveDetails: css`
    display: flex;
    flex-direction: column;
    gap: 2%;
    width: 100%;
    margin: 10px 5px;
    div {
      display: flex;
      gap: 10px;
      justify-content: flex-start;
    }
  `,
  details: css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 5px;
    padding-left: 1rem;
    padding-top:10px;
    ul {
      display: flex;
      flex-direction: column;
      padding-left: 0rem;
    }
    li {
      color: #000;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      display: flex;
    }
    b {
      font-weight: 400;
      text-align: left;
      font-size: 12px;
      padding-left: 20px;
    }
    span {
      min-width: 80px;
      text-align: left;
      margin-right: 10px;
      display: inline-block;
    }
  `,
};
