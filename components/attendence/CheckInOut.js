/** @jsxImportSource @emotion/react */
import React from "react";
import { useRouter } from "next/router";
import Card from "../../components/documents/Card";
import CalendarIcon from "../../public/icons/calendarIcon";
import LocationIcon from "../../public/icons/locationIcon";
import ScanIcon from "../../public/icons/scanIcon";
import { css } from "@emotion/react";
import Map from "../../components/Map";

const CheckInOut = () => {
  const router = useRouter();
  return (
    <div>
      <div className="d-flex justify-content-between">
        <p className="m-3 text-black">Monday, 10th May 2023</p>
        <p className="m-3 text-black">09:00:00</p>
      </div>

      <div style={{ margin: "20px" }}>
        <button
          css={styles.wrapper}
          onClick={() => router.push("/checkin/qrcode")}>
          <ScanIcon />
          Check In
        </button>
      </div>

      <Card
        id={"0"}
        title={"Current Location"}
        body={
          <div css={styles.mapContainer}>
            <Map />
          </div>
        }
        icon={<LocationIcon />}
      />
      <Card
        id={"1"}
        title={"Duty Schedule Detail"}
        body={
          <div css={styles.info}>
            <ul>
              <li>
                <span> Date</span>: <b>$550</b>
              </li>
              <li>
                <span>Time </span>: <b>9:00AM - 6:00PM</b>
              </li>
              <li>
                <span>Report To </span>:{" "}
                <b>
                  {" "}
                  2715 Ash Dr.San Jose, South Dakota 83475
                </b>
              </li>
            </ul>
          </div>
        }
        icon={<CalendarIcon />}
      />
    </div>
  );
};

export default CheckInOut;

const styles = {
  mapContainer: css`
    width: 100%;
  `,
  wrapper: css`
    width: 100%;
    padding: 35px;
    font-size: 18px;
    font-weight: 700;
    border: none;
    border-radius: 10px;
    background: var(--primary);
    color: var(--white);
  `,
  info: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 20px;

    ul {
      display: flex;
      flex-direction: column;
      gap: 9px;
      padding-left: 0rem;
      margin-top: 5px;
    }
    li {
      color: #000;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      display: flex;
    }
    b {
      font-weight: 600;
      text-align: left;
      padding-left: 20px;
    }
    span {
      min-width: 110px;
      text-align: left;
      margin-right: 10px;
      display: inline-block;
    }
  `,
};
