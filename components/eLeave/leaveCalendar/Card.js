/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { BiCalendarAlt } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import dayjs from "dayjs";

const LeaveHistoryCard = ({ eachLeave, belongTo }) => {
  return (
    <div css={styles.cardContainer}>
      <div css={styles.eachCard} className="secondary-text">
        <label>
          <div className="d-flex">
            <div className="profile-img">
              <img
                src={
                  eachLeave?.users_permissions_user?.profile?.photo?.url
                    ? `${process.env.NEXT_PUBLIC_APP_URL}${eachLeave?.users_permissions_user?.profile?.photo.url}`
                    : "../../images/defaultImage.jpg"
                }
              />
            </div>
            <label
              style={{
                marginLeft: "10px",
              }}
            >
              {eachLeave?.users_permissions_user?.username}
              <label
                style={{
                  textTransform: "capitalize",
                  color: "#8898AA",
                  fontSize: "13px",
                }}
              >
                {eachLeave?.users_permissions_user?.role?.name}
              </label>
            </label>
            {belongTo != "leaveApproval" && (
              <div
                className="leaveStatus"
                style={{
                  background:
                    eachLeave?.status === "Approved"
                      ? "rgba(95, 164, 82, 0.20)"
                      : "rgba(236, 28, 36, 0.20)",
                  color:
                    eachLeave?.status === "Approved" ? "#5FA452" : "#EC1C24",
                }}
              >
                {eachLeave?.status}
              </div>
            )}
          </div>
          <div css={styles.leaveDetails}>
            <div>
              <span>Request Leave</span>
              <span>Reason</span>
              <span>
                {eachLeave?.status == "Approved" ? "Approved" : "Rejected"} by
              </span>
            </div>
            <div>
              <span>:</span>
              <span>:</span>
              <span>:</span>
            </div>
            <div>
              {eachLeave?.numberOfDays >= 1 ? (
                <span>
                  {eachLeave?.numberOfDays}{" "}
                  <span style={{ fontWeight: "400", fontSize: "14px" }}>
                    Days
                  </span>
                </span>
              ) : (
                <span>
                  {eachLeave?.halfdayOptions === "Firsthalf"
                    ? "First Half (AM)"
                    : "Second Half (PM)"}
                </span>
              )}
              <span>{eachLeave?.reason}</span>
              <span>
                {eachLeave?.actionBy?.username} (
                {eachLeave?.actionBy?.role?.name})
              </span>
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
    background: none;
    border: none;
    margin-bottom: 10px;
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
    box-shadow: -1px 1px 20px 0px rgba(0, 0, 0, 0.14);
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
    .profile-img {
      width: 50px;
      height: 50px;
    }
    img {
      width: 40px;
      height: 40px;
      border-radius: 50px;
      border: 1px solid var(--light-gray);
    }
    .leaveStatus {
      display: flex;
      height: 35px;
      align-items: center;
      padding: 0 10px;
      border-radius: 10px;
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
