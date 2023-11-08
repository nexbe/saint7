/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import { useApolloClient } from "@apollo/client";
import { BiCalendar } from "react-icons/bi";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";

import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";
import authStore from "../../store/auth";
import leavestore from "../../store/eLeave";
import Card from "../../components/eLeave/leaveCalendar/Card";

const LeaveCalendar = () => {
  const apolloClient = useApolloClient();
  const { user } = authStore((state) => state);
  const { getAllLeaves, LeaveInfo: leaveInfo } = leavestore((state) => state);
  const [isFullHeight, setIsFullHeight] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [leaveList, setLeaveList] = useState(leaveInfo);

  useEffect(() => {
    if (!!user?.id) {
      getAllLeaves({
        apolloClient,
        where: { userId: user.id },
      });
      setLeaveList(leaveInfo);
    }
  }, [user]);

  useEffect(() => {
    if (!!startDate) {
      const filteredResults = leaveInfo?.filter(
        (item) =>
          (new Date(item.from).getFullYear() ==
            new Date(startDate).getFullYear() &&
            new Date(item.from).getMonth() === new Date(startDate).getMonth() &&
            new Date(item.from).getDate() === new Date(startDate).getDate()) ||
          (new Date(item.to).getFullYear() ==
            new Date(startDate).getFullYear() &&
            new Date(item.to).getMonth() === new Date(startDate).getMonth() &&
            new Date(item.to).getDate() === new Date(startDate).getDate())
      );
      setLeaveList(filteredResults);
    }
  }, [startDate]);

  const handleToggleHeight = () => {
    setIsFullHeight(!isFullHeight);
  };

  return (
    <Layout>
      <div css={styles.wrapper}>
        <HeaderNoti title={"Leave Calendar"} href={"/eLeave"} />
        <div css={styles.bodyContainer}>
          <div>
            <div
              className="calendar-container"
              css={styles.calendarContainer}
              style={{ height: isFullHeight ? "" : "125px" }}
            >
              <Calendar
                onChange={setStartDate}
                value={startDate}
                css={styles.calendar}
              />
            </div>
            <button onClick={handleToggleHeight} css={styles.dropDownBtn}>
              {isFullHeight ? (
                <MdOutlineArrowDropDown color="var(--white)" size={30} />
              ) : (
                <MdOutlineArrowDropUp color="var(--white)" size={30} />
              )}
            </button>
          </div>

          <div css={styles.requestCard}>
            <label className="primary-text" style={{ marginBottom: "10px" }}>
              {dayjs(startDate).locale("en-US").format("D MMMM, YYYY")}
            </label>
            {leaveList && leaveList.length > 0 && (
              <>
                {leaveList.map((eachLeave, index) =>
                  eachLeave?.status === "Pending" ? (
                    <div
                      css={styles.eachCard}
                      className="primary-text"
                      key={index}
                    >
                      <label>
                        Request Leave
                        <span className="requestDate">
                          <span css={styles.circleStyle}></span>
                          <span css={styles.lineStyle}></span>{" "}
                          <BiCalendar color="var(--dark-gray)" size={15} />
                          {dayjs(eachLeave.from)
                            .locale("en-US")
                            .format("ddd D MMMM")}
                        </span>
                        <span
                          className="requestDate"
                          style={{ marginTop: "-18px" }}
                        >
                          <span
                            css={styles.circleStyle}
                            style={{ marginRight: "6px" }}
                          ></span>
                          <BiCalendar color="var(--dark-gray)" size={15} />
                          {dayjs(eachLeave.to)
                            .locale("en-US")
                            .format("ddd D MMMM")}
                        </span>
                        <label style={{ fontSize: "14px" }}>
                          {eachLeave?.numberOfDays} Day off
                        </label>
                      </label>
                      <span css={styles.expenseStatus}>
                        {eachLeave?.status}
                      </span>
                    </div>
                  ) : (
                    <div key={index}>
                      <Card eachLeave={eachLeave} />
                    </div>
                  )
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LeaveCalendar;

const styles = {
  wrapper: css`
    flex: 1 1 auto;
    height: 0px;
    display: flex;
    flex-direction: column;
    margin: 0;
    background: var(--white);
  `,
  bodyContainer: css`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: hidden;
    overflow-x: hidden;
    position: relative;
    background: #f5f5f5;
  `,
  calendarContainer: css`
    overflow: hidden;
    transition: height 0.5s;
  `,
  dropDownBtn: css`
    background: rgba(47, 72, 88, 1);
    border: none;
    border-radius: 100px;
    position: absolute;
    margin-left: 50%;
    margin-top: -10px;
    padding: 0;
    width: 25px;
    height: 25px;
    align-items: center;
    display: flex;
  `,
  calendar: css`
    width: 100%;
    border: none;
    box-shadow: 0px 4px 8px 0px rgba(21, 21, 21, 0.15);
    border-radius: 0px 0px 16px 16px;
    .react-calendar__month-view > div > div {
      flex-grow: 1;
      width: 100%;
      margin-bottom: 20px;
    }
    .react-calendar button,
    .react-calendar__tile--now {
      background: none;
      padding: 0;
      margin: 0;
      flex: 0;
    }
    .react-calendar__tile--active:enabled:hover,
    .react-calendar__tile--active:enabled:focus,
    .react-calendar__tile--active {
      background: var(--primary);
      width: 50px;
      height: 50px;
      border-radius: 100%;
      color: var(--white);
      border: none;
    }
  `,
  requestCard: css`
    position: relative;
    height: 100vh;
    overflow-y: scroll;
    overflow-x: hidden;
    margin-top: 20px;
    border-radius: 10px;
    background: var(--white);
    box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.08);
    padding: 20px;
    margin-bottom: 5px;
    ::-webkit-scrollbar {
      width: 2px;
      background-color: transparent;
    }
  `,
  eachCard: css`
    display: flex;
    flex-direction: row;
    line-height: 25px;
    padding: 7px 10px;
    margin-bottom: 10px;
    justify-content: space-between;
    border-radius: 16px;
    background: rgba(250, 126, 11, 0.2);
    box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.08);
    label {
      display: flex;
      flex-direction: column;
      gap: 5px;
      color: #000;
    }
    .requestDate {
      font-size: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 15px;
      margin-top: -15px;
      svg {
        margin-right: 5px;
      }
    }
  `,
  expenseStatus: css`
    font-size: 12px;
    text-transform: capitalize;
    height: 25px;
    padding: 5px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background: rgba(251, 122, 3, 0.5);
    color: #d06c0f;
  `,
  lineStyle: css`
    background-color: var(--light-gray);
    height: 30px;
    width: 2px;
    margin-left: -6px;
    margin-top: 20px;
    margin-right: 10px;
  `,
  circleStyle: css`
    width: 10px;
    height: 10px;
    background: var(--light-gray);
    border-radius: 50px;
  `,
};
