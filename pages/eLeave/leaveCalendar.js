/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { BiCalendar } from "react-icons/bi";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useApolloClient, useMutation } from "@apollo/client";
import Select, { components } from "react-select";
import { BiCalendarAlt } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { RiArrowDownSFill } from "react-icons/ri";
import dayjs from "dayjs";
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";
let isBetween = require("dayjs/plugin/isBetween");

import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";
import authStore from "../../store/auth";
import leavestore from "../../store/eLeave";
import Card from "../../components/eLeave/leaveCalendar/Card";
import { UPDATE_LEAVE } from "../../graphql/mutations/eLeave";
import NotificationBox from "../../components/notification/NotiBox";
import NoDataIcon from "/public/icons/noDataIcon";
import Loading from "../../components/Loading";

const LeaveCalendar = () => {
  dayjs.extend(isBetween);
  const router = useRouter();
  const apolloClient = useApolloClient();
  const { user } = authStore((state) => state);
  const {
    getAllLeaves,
    getLeaves,
    LeaveInfo: leaveInfo,
    updateLeave,
    loading,
  } = leavestore((state) => state);
  const [updateLeaveAction, errUpdateLeave] = useMutation(UPDATE_LEAVE);

  const statusOptions = [
    { value: "Approved", label: "Approved" },
    { value: "Rejected", label: "Rejected" },
  ];

  const [isFullHeight, setIsFullHeight] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [leaveList, setLeaveList] = useState(leaveInfo);
  const [status, setStatus] = useState({ value: "Pending", label: "New" });

  useEffect(() => {
    if (!!user?.id) {
      if (user?.role?.name?.toLowerCase() === "admin") {
        getLeaves({
          apolloClient,
          where: { userId: user.id },
        });
      } else {
        getAllLeaves({
          apolloClient,
          where: { userId: user.id },
        });
      }
      setLeaveList(leaveInfo);
    }
  }, [user]);

  useEffect(() => {
    if (!!startDate) {
      const filteredResults = leaveInfo?.filter(
        (item) =>
          dayjs(startDate).isBetween(
            dayjs(item.from),
            dayjs(item.to),
            "day",
            "[]"
          ) == true
      );
      setLeaveList(filteredResults);
    }
  }, [startDate, leaveInfo]);

  const handleToggleHeight = () => {
    setIsFullHeight(!isFullHeight);
  };

  function customTileContent({ date }) {
    const specialDays = leaveInfo?.reduce((acc, leave) => {
      const startDate = new Date(leave.from);
      const endDate = new Date(leave.to);
      for (
        let date = startDate;
        date <= endDate;
        date.setDate(date.getDate() + 1)
      ) {
        acc.push(new Date(date));
      }
      return acc;
    }, []);
    const isSpecialDay = specialDays?.some(
      (specialDate) =>
        date.getDate() === specialDate.getDate() &&
        date.getMonth() === specialDate.getMonth() &&
        date.getFullYear() === specialDate.getFullYear()
    );
    if (isSpecialDay) {
      return <div className="dot-style"></div>;
    }
    return null;
  }

  const DropdownIndicator = (props) => {
    return (
      components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>
          <RiArrowDownSFill color={"rgba(41, 57, 145, 1)"} size={30} />
        </components.DropdownIndicator>
      )
    );
  };

  const handleStatusChange = async (id, status) => {
    if (!!id) {
      await updateLeave({
        updateLeaveAction,
        id: id,
        leaveData: {
          status: status,
          actionBy: user?.id,
        },
        updatedAt: new Date().toISOString(),
      });
    }
    getLeaves({
      apolloClient,
      where: { userId: user.id },
    });
    router.push({
      pathname: "/eLeave/leaveCalendar",
      query: {
        message: "Success!",
        label: "Leave request successfully " + status?.toLowerCase() + ".",
      },
    });
  };

  return (
    <Layout>
      <div css={styles.wrapper}>
        <HeaderNoti title={"Leave Calendar"} href={"/eLeave"} />
        <div style={{ position: "relative", margin: "2px 10px" }}>
          <NotificationBox
            message={router.query.message}
            timeout={3000}
            label={router?.query?.label}
          />
        </div>
        <div css={styles.bodyContainer}>
          <div>
            <div
              className="calendar-container"
              css={styles.calendarContainer}
              style={{ height: isFullHeight ? "" : "140px" }}
            >
              <Calendar
                onChange={setStartDate}
                value={startDate}
                css={styles.calendar}
                tileContent={customTileContent}
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
            {leaveList && leaveList.length > 0 ? (
              <>
                {leaveList.map((eachLeave, index) =>
                  eachLeave?.status === "Pending" ? (
                    user?.role?.name?.toLowerCase() === "admin" ? (
                      <div
                        css={styles.eachApprovalCard}
                        className="secondary-text"
                        key={index}
                      >
                        <label>
                          <div className="d-flex">
                            <div className="profile-img">
                              <img
                                src={
                                  eachLeave?.users_permissions_user?.profile
                                    ?.photo?.url
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
                            <label style={{ width: "70%" }}>
                              <Select
                                value={status}
                                onChange={(e) => {
                                  handleStatusChange(eachLeave?.id, e.value);
                                }}
                                options={statusOptions}
                                styles={selectBoxStyle}
                                components={{
                                  DropdownIndicator: () => null,
                                  IndicatorSeparator: () => null,
                                  DropdownIndicator,
                                }}
                                isClearable={false}
                                isSearchable={false}
                              />
                            </label>
                          </div>
                          <div css={styles.leaveDetails}>
                            <div>
                              <span>Request Leave</span>
                              <span>Reason</span>
                            </div>
                            <div>
                              <span>:</span>
                              <span>:</span>
                            </div>
                            <div>
                              {eachLeave?.numberOfDays >= 1 ? (
                                <span>
                                  {eachLeave?.numberOfDays} <span>Days</span>
                                </span>
                              ) : (
                                <span>
                                  {eachLeave?.halfdayOptions === "Firsthalf"
                                    ? "First Half (AM)"
                                    : "Second Half (PM)"}
                                </span>
                              )}
                              <span>{eachLeave?.reason}</span>
                            </div>
                          </div>
                          <span className="leaveDate">
                            <BiCalendarAlt color="#A0AEC0" size={18} />
                            {dayjs(eachLeave?.from)
                              .locale("en-US")
                              .format("MMM / DD / YY")}
                            <BsArrowRight color="rgba(0, 0, 0, 1)" size={18} />{" "}
                            <BiCalendarAlt color="#A0AEC0" size={18} />
                            {dayjs(eachLeave?.to)
                              .locale("en-US")
                              .format("MMM / DD / YY")}
                          </span>
                        </label>
                      </div>
                    ) : (
                      <div
                        css={styles.eachCard}
                        className="primary-text"
                        key={index}
                      >
                        <label>
                          Request Leave
                          <div>
                            <div css={styles.requestLeave}>
                              <span css={styles.circleStyle}></span>
                              <BiCalendar color="var(--dark-gray)" size={15} />
                              <span className="secondary-text">
                                {dayjs(eachLeave.from)
                                  .locale("en-US")
                                  .format("dddd D MMMM")}
                              </span>
                            </div>
                            <div css={styles.lineStyle}></div>
                            <div
                              css={styles.requestLeave}
                              style={{ marginTop: "-10px" }}
                            >
                              <span css={styles.circleStyle}></span>
                              <BiCalendar color="var(--dark-gray)" size={15} />
                              <span className="secondary-text">
                                {dayjs(eachLeave.to)
                                  .locale("en-US")
                                  .format("dddd D MMMM")}
                              </span>
                            </div>
                          </div>
                          {eachLeave?.numberOfDays >= 1 ? (
                            <span style={{ fontSize: "14px" }}>
                              {eachLeave?.numberOfDays}{" "}
                              <span
                                style={{ fontWeight: "400", fontSize: "14px" }}
                              >
                                Day off
                              </span>
                            </span>
                          ) : (
                            <span style={{ fontSize: "14px" }}>
                              {eachLeave?.halfdayOptions === "Firsthalf"
                                ? "First Half (AM)"
                                : "Second Half (PM)"}
                            </span>
                          )}
                        </label>
                        <span css={styles.expenseStatus}>
                          {eachLeave?.status}
                        </span>
                      </div>
                    )
                  ) : (
                    <div key={index}>
                      <Card eachLeave={eachLeave} />
                    </div>
                  )
                )}
              </>
            ) : (
              <div css={styles.noDataContainer} className="primary-text">
                <NoDataIcon />
                <label>Nothing Here to show</label>
                <label>You don’t have any report request</label>
              </div>
            )}
          </div>
        </div>
      </div>
      {loading && <Loading isOpen={loading} />}
    </Layout>
  );
};

export default LeaveCalendar;

const selectBoxStyle = {
  singleValue: (styles, { data }) => {
    return {
      ...styles,
      color: "rgba(41, 57, 145, 1)",
      fontSize: "14px",
      fontWeight: "700",
      alignItems: "center",
      justifyContent: "center",
    };
  },
  valueContainer: (provided, state) => ({
    ...provided,
    padding: "0",
    margin: "0",
    marginLeft: "10px",
  }),
  control: (base) => ({
    ...base,
    borderRadius: "10px",
    background: "rgba(41, 57, 145, 0.20)",
    fontSize: "14px",
    height: "40px",
    color: "rgba(41, 57, 145, 1)",
    fontWeight: "400",
    display: "flex",
    flexWrap: "no-wrap",
    outline: "none",
    border: "none",
  }),
  option: (styles, { isSelected }) => {
    return {
      ...styles,
      backgroundColor: isSelected ? "#E3F3FF" : "#fff",
      color: "#000",
      cursor: isSelected ? "not-allowed" : "pointer",
      fontSize: "14px",
      margin: "0",
      padding: "5px 20px",
      "&:hover": {
        backgroundColor: "none",
      },
    };
  },
};

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
    .dot-style {
      width: 5px;
      height: 5px;
      background: #5fa452;
      border-radius: 50%;
      margin: 0 auto;
      position: relative;
      top: 3px;
    }
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
    margin-top: -15px;
    padding: 0;
    width: 30px;
    height: 30px;
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
      margin-bottom: 15px;
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
    color: #2f4858;
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
      left: 20px;
      margin-top: -15px;
      svg {
        margin-right: 5px;
      }
    }
  `,
  eachApprovalCard: css`
    display: flex;
    flex-direction: row;
    line-height: 25px;
    padding: 7px 10px;
    justify-content: space-between;
    border-radius: 10px;
    background: var(--white);
    box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.08);
    margin-bottom: 10px;
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
  requestLeave: css`
    display: flex;
    gap: 7px;
    align-items: center;
  `,
  lineStyle: css`
    background-color: rgba(113, 128, 150, 1);
    height: 25px;
    width: 2px;
    margin-top: -10px;
    margin-left: 4px;
  `,
  circleStyle: css`
    width: 10px;
    height: 10px;
    background: rgba(113, 128, 150, 1);
    border-radius: 50px;
  `,
  noDataContainer: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
};
