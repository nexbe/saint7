/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { RiBuildingLine } from "react-icons/ri";
import MapPineLineIcon from "../../public/icons/mapPineLineIcon";

const Profile = () => {
  return (
    <div css={styles.wrapper}>
      <div css={styles.profileContent}>
        <div css={styles.attachBox}>
          <img src={"images/defaultImage.jpg"} />
        </div>
        <p style={{ marginTop: "5px" }}>
          <label className="header-text">James</label>
          <label className="secondary-text">Employee ID: 123456789</label>
        </p>
      </div>
      <div css={styles.card}>
        <ul>
          <li>
            <RiBuildingLine color="#222e50" size={23} />{" "}
            <span>Site Name : Site A</span>
          </li>
          <li>
            <RiBuildingLine color="#222e50" size={23} />{" "}
            <span>Checkpoint Name : North Entrance</span>
          </li>
          <li>
            <MapPineLineIcon color="#222e50" />{" "}
            <span>2715 Ash Dr. San Jose, South Dakota 83475</span>
          </li>
        </ul>
        <div css={styles.dutyPlan}>
          <span>Time of Duty (Planned)</span>
          <div>09:00 to 18:00</div>
        </div>
      </div>
      <div css={styles.card}>
        <h4>Monday, 10th May 2023</h4>
        <hr />
        <div css={styles.displayTime}>
          <b>09:05:00</b>
          <b>00:00:00</b>
        </div>
        <div css={styles.displayTime}>
          <span>Check in Time </span>
          <span>Check out Time </span>
        </div>
      </div>
      <button css={styles.btn}>Check Out</button>
    </div>
  );
};

export default Profile;
const styles = {
  wrapper: css`
    padding: 20px;
  `,
  attachBox: css`
    position: absolute;
    margin-top: -70px;
    cursor: pointer;
    img {
      width: 60px;
      height: 60px;
      border-radius: 50px;
    }
  `,
  profileContent: css`
    border-radius: 10px;
    background: var(--mobile-color-usage-white, #fff);
    box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.08);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 110px;
    width: 100%;
    p {
      padding-top: 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      label {
        line-height: 25px;
      }
    }
    .header-text {
      color: var(--primary);
      text-transform: capitalize;
    }
    .secondary-text {
      color: var(--light-gray);
    }
  `,
  card: css`
    margin-top: 9px;
    padding: 10px;
    color: var(--primary-font);
    border-radius: 10px;
    background: var(--white);
    box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    gap: 9px;
    font-size: 14px;
    font-weight: 600;
    h4 {
      font-size: 16px;
      font-weight: 600;
      text-align: center;
    }
    li {
      display: flex;
      flex-direction: row;
      gap: 9px;
    }
  `,
  dutyPlan: css`
    display: flex;
    flex-direction: row;
    padding: 15px;
    justify-content: space-around;
    div {
      background: #293991;
      color: #fff;
      padding: 5px;
      border-radius: 9px;
    }
  `,
  displayTime: css`
    display: flex;
    padding: 8px;
    flex-direction: row;
    justify-content: space-between;
    font-size: 18px;
    font-weight: 400;
    b {
      text-align: center;
    }
  `,
  btn: css`
    margin-top: 5px;
    width: 100%;
    font-size: 18px;
    padding: 4px;
    font-weight: 700;
    border: none;
    border-radius: 10px;
    background: var(--primary);
    color: var(--white);
  `,
};
