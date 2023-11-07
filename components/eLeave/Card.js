/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { BiCalendarAlt } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import dayjs from "dayjs";

const LeaveHistoryCard = ({ eachLeave }) => {
  return (
    <div css={styles.cardContainer}>
      <div css={styles.eachCard} className="primary-text">
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
              <span style={{ fontWeight: "400", fontSize: "14px" }}>
                {eachLeave?.leaveDuration}
              </span>
            )}
          </div>
          <div css={styles.leaveDetails}>
            <div>
              <span>Request To</span>
              <span>Reason</span>
              {eachLeave?.status != "Pending" && (
                <span>
                  {eachLeave?.status == "Approved" ? "Approved" : "Rejected"} by
                </span>
              )}
            </div>
            <div>
              <span>:</span>
              <span>:</span>
              {eachLeave?.status != "Pending" && <span>:</span>}
            </div>
            <div>
              <span style={{ width: "100%" }}>
                {eachLeave?.requestedTos?.map((eachRequest) => {
                  return (
                    eachRequest?.username +
                    " (" +
                    eachRequest?.role?.name +
                    ")  "
                  );
                })}
              </span>

              <span>{eachLeave?.reason}</span>
              {eachLeave?.status != "Pending" && (
                <span>
                  {eachLeave?.actionBy?.username} (
                  {eachLeave?.actionBy?.role?.name})
                </span>
              )}
            </div>
          </div>
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
    gap: 2%;
    width: 100%;
    margin: 10px 5px;
    div {
      justify-content: space-between;
    }
  `,
};
