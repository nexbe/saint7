/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useApolloClient, useMutation } from "@apollo/client";
import Select, { components } from "react-select";
import { BiCalendarAlt } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { RiArrowDownSFill } from "react-icons/ri";
import dayjs from "dayjs";

import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";
import Card from "../../components/eLeave/leaveCalendar/Card";
import NoDataIcon from "/public/icons/noDataIcon";
import authStore from "../../store/auth";
import leavestore from "../../store/eLeave";
import NotificationBox from "../../components/notification/NotiBox";
import FilterIcon from "/public/icons/filterIcon";
import RefreshIcon from "/public/icons/refreshIcon";
import SearchIcon from "/public/icons/searchIcon";
import { UPDATE_LEAVE } from "../../graphql/mutations/eLeave";
import DateFilterModal from "../../components/claims/DateFilterModal";

const LeaveHistory = () => {
  const router = useRouter();
  const apolloClient = useApolloClient();
  const { user } = authStore((state) => state);
  const {
    getLeaves,
    getLeavesByRequest,
    LeaveInfo: leaveInfo,
    updateLeave,
  } = leavestore((state) => state);
  const [updateLeaveAction, errUpdateLeave] = useMutation(UPDATE_LEAVE);

  const statusOptions = [
    { value: "Pending", label: "New" },
    { value: "Approved", label: "Approved" },
    { value: "Rejected", label: "Rejected" },
  ];

  const [activeTab, setActiveTab] = useState(1);
  const [pendingData, setPendingData] = useState(leaveInfo);
  const [approvedData, setApprovedData] = useState(leaveInfo);
  const [rejectedData, setRejectedData] = useState(leaveInfo);
  const [filterTerm, setFilterTerm] = useState("");
  const [status, setStatus] = useState(statusOptions[0]);
  const [modalOpen, setModalOpen] = useState(false);
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    if (!!user?.id) {
      if (user?.role?.name?.toLowerCase() === "admin") {
        getLeaves({
          apolloClient,
          where: { userId: user.id },
        });
      } else {
        getLeavesByRequest({
          apolloClient,
          where: { userId: user.id, requestedTos: user.id },
        });
      }
    }
  }, [user]);

  const handleListChange = (filteredResults) => {
    if (!!filteredResults) {
      const pendingList = filteredResults.filter(
        (item) => item && item.status && item.status.toLowerCase() === "pending"
      );
      setPendingData(pendingList);
      setRequestCount(pendingList.length);
      const approvedList = filteredResults.filter(
        (item) =>
          item && item.status && item.status.toLowerCase() === "approved"
      );
      setApprovedData(approvedList);
      const rejectedList = filteredResults.filter(
        (item) =>
          item && item.status && item.status.toLowerCase() === "rejected"
      );
      setRejectedData(rejectedList);
    }
  };

  const handleFilterChange = (event) => {
    const term = event.target.value;
    setFilterTerm(term);

    // Filter the data based on the filterTerm
    const filteredResults = leaveInfo.filter((item) =>
      item?.users_permissions_user?.username
        ?.toLowerCase()
        .includes(term?.toLowerCase())
    );
    handleListChange(filteredResults);
  };

  const handleRefresh = () => {
    setFilterTerm("");
    handleListChange(leaveInfo);
  };

  useMemo(() => {
    if (!!leaveInfo) {
      handleListChange(leaveInfo);
    }
  }, [leaveInfo]);

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
    if (user?.role?.name?.toLowerCase() === "admin") {
      getLeaves({
        apolloClient,
        where: { userId: user.id },
      });
    } else {
      getLeavesByRequest({
        apolloClient,
        where: { userId: user.id, requestedTos: user.id },
      });
    }
    router.push({
      pathname: "/eLeave/leaveApproval",
      query: {
        message: "Success!",
        label: "Leave request successfully " + status + ".",
      },
    });
  };

  const filterModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleDateChange = (
    startDate,
    endDate,
    halfDayChecked,
    fullDayChecked
  ) => {
    let filteredResults;

    filteredResults =
      (halfDayChecked && fullDayChecked) || (!halfDayChecked && !fullDayChecked)
        ? leaveInfo
        : halfDayChecked
        ? leaveInfo.filter((item) => item.leaveDuration === "Halfday")
        : leaveInfo.filter((item) => item.leaveDuration === "Fullday");

    filteredResults = filteredResults.filter(
      (item) =>
        new Date(item.from).getTime() >= new Date(startDate).getTime() &&
        new Date(item.to).getTime() <= new Date(endDate).getTime()
    );
    handleListChange(filteredResults);
  };

  return (
    <Layout>
      <div css={styles.wrapper}>
        <HeaderNoti title={"Leave Approval"} href={"/eLeave"} />
        <div style={{ position: "relative", margin: "2px 10px" }}>
          <NotificationBox
            message={router.query.message}
            timeout={3000}
            label={router?.query?.label}
          />
        </div>
        <div css={styles.bodyContainer}>
          <div css={styles.filterContainer}>
            <input
              type="text"
              placeholder="Search fields"
              value={filterTerm}
              onChange={handleFilterChange}
            />
            <label css={styles.searchIcon}>
              <SearchIcon />
            </label>
            <div>
              <button
                style={{ border: "none", background: "none" }}
                onClick={handleRefresh}
              >
                <RefreshIcon />
              </button>
            </div>
            <div>
              <button
                style={{ border: "none", background: "none" }}
                onClick={filterModal}
              >
                <FilterIcon />
              </button>
              {modalOpen && (
                <DateFilterModal
                  isOpen={modalOpen}
                  close={() => setModalOpen(!modalOpen)}
                  handleDateChange={handleDateChange}
                  belongTo="leaveApproval"
                />
              )}
            </div>
          </div>
          <div css={styles.statusContainer} className="primary-text">
            <div css={styles.statusHeader}>
              <label
                css={activeTab == 1 ? styles.activeColor : ""}
                onClick={() => setActiveTab(1)}
              >
                Request {requestCount >= 1 && "[" + requestCount + "]"}
              </label>
              <label
                css={activeTab == 2 ? styles.activeColor : ""}
                onClick={() => setActiveTab(2)}
              >
                Approved
              </label>
              <label
                css={activeTab == 3 ? styles.activeColor : ""}
                onClick={() => setActiveTab(3)}
              >
                Rejected
              </label>
            </div>

            {activeTab == 1 && (
              <>
                {pendingData && pendingData.length > 0 && (
                  <div css={styles.cardContainer}>
                    {pendingData.map((eachLeave, index) => (
                      <div
                        css={styles.eachCard}
                        className="secondary-text"
                        key={index}
                      >
                        <label>
                          <div className="d-flex">
                            <img
                              src={
                                eachLeave?.users_permissions_user?.profile
                                  ?.photo?.url
                                  ? `${process.env.NEXT_PUBLIC_APP_URL}${eachLeave?.users_permissions_user?.profile?.photo.url}`
                                  : "../../images/defaultImage.jpg"
                              }
                            />
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
                            <label style={{ maxWidth: "200px" }}>
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
                    ))}
                  </div>
                )}
                {pendingData && pendingData.length == 0 && (
                  <div css={styles.noDataContainer} className="primary-text">
                    <NoDataIcon />
                    <label>Nothing Here to show</label>
                    <label>You don’t have any report request</label>
                  </div>
                )}
              </>
            )}

            {activeTab == 2 && (
              <>
                {approvedData && approvedData.length > 0 && (
                  <div css={styles.cardWrapper}>
                    {approvedData.map((eachLeave, index) => (
                      <div key={index}>
                        <Card
                          eachLeave={eachLeave}
                          belongTo={"leaveApproval"}
                        />
                      </div>
                    ))}
                  </div>
                )}
                {approvedData && approvedData.length == 0 && (
                  <div css={styles.noDataContainer} className="primary-text">
                    <NoDataIcon />
                    <label>Nothing Here to show</label>
                    <label>You don’t have any report request</label>
                  </div>
                )}
              </>
            )}
            {activeTab == 3 && (
              <>
                {rejectedData && rejectedData.length > 0 && (
                  <div css={styles.cardWrapper}>
                    {rejectedData.map((eachLeave, index) => (
                      <div key={index}>
                        <Card
                          eachLeave={eachLeave}
                          belongTo={"leaveApproval"}
                        />
                      </div>
                    ))}
                  </div>
                )}
                {rejectedData && rejectedData.length == 0 && (
                  <div css={styles.noDataContainer} className="primary-text">
                    <NoDataIcon />
                    <label>Nothing Here to show</label>
                    <label>You don’t have any report request</label>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LeaveHistory;

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

    "&:focus": {
      backgroundColor: "none",
      outline: "1px solid red",
      border: "1px solid red",
    },
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
    background: var(--background);
  `,
  bodyContainer: css`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    min-height: 200px;
    margin: 20px;
    gap: 12px;
    font-family: Inter;
    font-style: normal;
    ::-webkit-scrollbar {
      width: 2px;
      background-color: transparent;
    }
    .bodyContainer::-webkit-scrollbar-thumb {
      border-radius: 2px;
      background-color: var(--font-gray);
    }
    @media (max-width: 1400px) {
      margin: 20px 20px 50px;
    }
    @media (min-width: 1400px) {
      margin: 30px 30px 50px;
    }
    svg {
      cursor: pointer;
    }
  `,
  requestContent: css`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    button {
      border: none;
      background: none;
      position: absolute;
      left: 0px;
    }
    label {
      font-size: 18px;
      color: var(--primary);
    }
  `,
  filterContainer: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    input {
      height: 30px;
      width: 60%;
      padding: 9px 12px;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      flex-shrink: 0;
      border-radius: 10px;
      border: 1px solid var(--dark-gray);
      background: var(--white);
      padding-left: 35px;
      ::placeholder {
        color: var(--dark-gray);
        font-family: Open Sans;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
      }
      :focus {
        border: 1px solid var(--primary);
        outline: none;
      }
    }
  `,
  searchIcon: css`
    position: absolute;
    margin: 10px;
  `,
  statusContainer: css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
    .checkbox {
      width: 20px;
      height: 20px;
      border-radius: 4px;
      border: 1px solid #718096;
      ::checked {
        background: red;
      }
    }
    input[type="checkbox"]: checked {
      background: red;
    }
  `,
  statusHeader: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: #a0aec0;
    border-bottom: 1px solid rgba(196, 196, 196, 0.3);
  `,
  activeColor: css`
    color: var(--primary);
    border-bottom: 1px solid var(--primary);
  `,
  noDataContainer: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  cardWrapper: css`
    display: flex;
    flex-direction: column;
    gap: 8px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50px;
      border: 1px solid var(--light-gray);
    }
  `,
  dateButton: css`
    position: absolute;
    bottom: 70px;
    left: 35%;
    border: none;
    background: none;
    label {
      color: #1e3c72;
      padding: 0 15px;
    }
  `,
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
  expenseDetail: css`
    padding: 0 10px;
    font-size: 8px;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    background: #e0eeff;
    text-transform: uppercase;
    width: 80px;
  `,
  expenseStatus: css`
    font-size: 10px;
    color: #28bd41;
    text-transform: uppercase;
    height: 18px;
    padding: 0px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    background: rgba(250, 126, 11, 0.2);
    color: #fa7e0b;
  `,
  statusAction: css`
    display: flex;
    align-items: center;
    gap: 20px;
    label {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 7px;
    }
    button {
      border-radius: 10px;
      background: #5fa452;
      color: #fff;
      box-shadow: 0px 10px 60px 0px rgba(0, 0, 0, 0.08);
      padding: 5px 15px;
      border: none;
    }
  `,
};
