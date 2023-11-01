/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Card from "../../components/documents/Card";
import CalendarIcon from "../../public/icons/calendarIcon";
import LocationIcon from "../../public/icons/locationIcon";
import ScanIcon from "../../public/icons/scanIcon";
import { css } from "@emotion/react";
import Map from "../../components/Map";
import moment from "moment";
import userStore from "../../store/user";
import dayjs from "dayjs";

const CheckInOut = () => {
  const currentDate = moment().format("Do MMMM YYYY");
  const currentDay = moment().format("dddd");
  const currentTime = moment().format("HH:mm:ss");

  const [dateTime, setDateTime] = useState({});

  useEffect(() => {
    setDateTime({
      currentDate: currentDate,
      currentDay: currentDay,
      currentTime: currentTime,
    });
  }, []);

  const { getAssignUsers, AssignUsers } = userStore((state) => state);

  const formattedTime = (time) => {
    const timeObject = new Date(`${moment().format("YYYY-MM-DD")}T${time}`);
    const resultTime = timeObject.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return resultTime;
  };

  console.log(AssignUsers);

  const router = useRouter();
  return (
    <div>
      <div className="d-flex justify-content-between">
        <p className="m-3 text-black">
          {dateTime?.currentDay}, {dateTime?.currentDate}
        </p>
        <p className="m-3 text-black">{dateTime?.currentTime}</p>
      </div>

      <div style={{ margin: "20px" }}>
        <button
          css={styles.wrapper}
          onClick={() => router.push("/checkin/qrcode")}
        >
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
                <span> Date</span>: <b>{moment().format("YYYY-MM-DD")}</b>
              </li>
              <li>
                <span>Time </span>:{" "}
                <b>
                  {formattedTime(
                    AssignUsers[0]?.attributes?.shift?.data?.attributes
                      ?.timeRange?.StartTime
                  )}{" "}
                  -{" "}
                  {formattedTime(
                    AssignUsers[0]?.attributes?.shift?.data?.attributes
                      ?.timeRange?.EndTime
                  )}
                </b>
              </li>
              <li>
                <span>Report To </span>:{" "}
                <b>
                  {" "}
                  {AssignUsers[0]?.attributes?.site?.data?.attributes?.address}
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
