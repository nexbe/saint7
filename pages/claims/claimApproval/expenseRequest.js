/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineArrowBackIosNew,
} from "react-icons/md";
import { RiArrowDownSFill } from "react-icons/ri";
import moment from "moment";
import _ from "lodash";
import { useApolloClient, useMutation } from "@apollo/client";
import Select, { components } from "react-select";

import Layout from "../../../components/layout/Layout";
import HeaderNoti from "../../../components/layout/HeaderNoti";
import Card from "../../../components/claims/ExpenseStatusCard";
import FilterModal from "../../../components/claims/FilterModal";
import DateFilterModal from "../../../components/claims/DateFilterModal";

import FilterIcon from "/public/icons/filterIcon";
import CalendarIcon from "/public/icons/calendarIcon";
import RefreshIcon from "/public/icons/refreshIcon";
import SearchIcon from "/public/icons/searchIcon";
import NoDataIcon from "/public/icons/noDataIcon";
import userStore from "../../../store/auth";
import claimStore from "../../../store/claim";
import { UPDATE_CLAIM } from "../../../graphql/mutations/claim";
import NotificationBox from "../../../components/notification/NotiBox";
import ConfirmExpenseModal from "../../../components/claims/claimApproval/ConfirmModal";

const ExpenseRequestStatus = () => {
  const router = useRouter();
  const apolloClient = useApolloClient();
  const { getClaims, ClaimInfo: claimInfo } = claimStore((state) => state);
  const { updateClaim } = claimStore((state) => state);
  const [updateClaimAction, errUpdateClaim] = useMutation(UPDATE_CLAIM);
  const { user } = userStore((state) => state);
  const [activeTab, setActiveTab] = useState(1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [modalOpen, setModalOpen] = useState(false);
  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [actionStatus, setActionStatus] = useState(null);
  const [checkAll, setCheckAll] = useState(false);
  const [checkData, setCheckData] = useState([]);
  const [checkArr, setCheckArr] = useState([]);

  const filterModal = () => {
    setModalOpen(!modalOpen);
  };
  const dateModal = () => {
    setDateModalOpen(!dateModalOpen);
  };

  const incrementYear = () => {
    setCurrentYear(currentYear + 1);
  };

  const decrementYear = () => {
    setCurrentYear(currentYear - 1);
  };

  useEffect(() => {
    getClaims({
      apolloClient,
      where: { userId: user.id },
    });
  }, [user]);

  const statusOptions = [
    { value: "pending", label: "New" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
  ];

  const [filterTerm, setFilterTerm] = useState("");
  const [expenseList, setExpenseList] = useState();
  const [filteredData, setFilteredData] = useState(claimInfo);
  const [approvedData, setApprovedData] = useState(claimInfo);
  const [rejectedData, setRejectedData] = useState(claimInfo);
  const [approvedTotal, setApprovedTotal] = useState();
  const [rejectedTotal, setRejectedTotal] = useState();
  const [status, setStatus] = useState(statusOptions[0]);

  const monthName = (item) =>
    moment(item.expenseDate, "YYYY-MM-DD").format("MMMM YYYY");
  let requestCount = 0;
  claimInfo?.map((eachExpense) => {
    if (eachExpense.status === "pending") {
      requestCount += 1;
    }
  });

  const handleListChange = (filteredResults) => {
    const approvedList = filteredResults.filter(
      (item) => item && item.status && item.status.toLowerCase() === "approved"
    );

    const approvedResult = _.groupBy(approvedList, monthName);
    const approvedResultArr = _.entries(approvedResult);
    setApprovedData(approvedResultArr);
    const rejectedList = filteredResults.filter(
      (item) => item && item.status && item.status.toLowerCase() === "rejected"
    );

    const rejectResult = _.groupBy(rejectedList, monthName);
    const rejectResultArr = _.entries(rejectResult);
    setRejectedData(rejectResultArr);

    let approvedTotal = 0;
    let rejectedTotal = 0;

    approvedData?.map((eachExpense, index) => {
      if (eachExpense.status == "Approved") {
        approvedTotal += parseFloat(eachExpense.amount);
      }
    });
    setApprovedTotal(approvedTotal);
    rejectedList?.map((eachExpense, index) => {
      if (eachExpense.status == "Rejected") {
        rejectedTotal += parseFloat(eachExpense.amount);
      }
    });
    setRejectedTotal(rejectedTotal);
  };

  const handleFilterChange = (event) => {
    const term = event.target.value;
    setFilterTerm(term);

    // Filter the data based on the filterTerm
    const filteredResults = claimInfo.filter(
      (item) =>
        item?.category.label?.toLowerCase().includes(term?.toLowerCase()) ||
        item?.status?.toLowerCase().includes(term?.toLowerCase()) ||
        item?.id?.toLowerCase().includes(term?.toLowerCase())
    );
    setFilteredData(filteredResults);
    const result = _.groupBy(filteredResults, monthName);
    const resultArr = _.entries(result);
    setExpenseList(resultArr);
    handleListChange(filteredResults);
  };

  const handleDateChange = (startDate, endDate) => {
    const filteredResults = claimInfo.filter(
      (item) =>
        new Date(item.expenseDate).getTime() >= new Date(startDate).getTime() &&
        new Date(item.expenseDate).getTime() <= new Date(endDate).getTime()
    );
    setFilteredData(filteredResults);
    const result = _.groupBy(filteredResults, monthName);
    const resultArr = _.entries(result);
    setExpenseList(resultArr);
    handleListChange(filteredResults);
  };

  const handleCategoryChange = (
    minAmount,
    maxAmount,
    categoryOptions,
    check
  ) => {
    let filteredResults;
    filteredResults = minAmount
      ? claimInfo.filter((item) => item.amount >= minAmount)
      : claimInfo;
    filteredResults = maxAmount
      ? filteredResults.filter((item) => item.amount <= maxAmount)
      : filteredResults;

    let checkCategoryList = [];
    check.forEach((value, index) => {
      if (value === true) {
        checkCategoryList.push(categoryOptions[index - 1].name);
      }
    });

    filteredResults = filteredResults.filter((item) => {
      if (
        !!checkCategoryList.find((category) => category === item.category.label)
      )
        return item;
    });
    setFilteredData(filteredResults);
    const result = _.groupBy(filteredResults, monthName);
    const resultArr = _.entries(result);
    setExpenseList(resultArr);
    handleListChange(filteredResults);
  };

  const handleConfirmModal = () => {
    setOpenConfirmModal(!openConfirmModal);
  };

  useMemo(() => {
    if (!!claimInfo) {
      setFilteredData(claimInfo);
      const result = _.groupBy(claimInfo, monthName);
      const resultArr = _.entries(result);
      setExpenseList(resultArr);
      handleListChange(claimInfo);
    }
    setCheckAll(false);
    setCheckData([]);
    setCheckArr([]);
  }, [claimInfo, router.query]);

  useMemo(() => {
    if (!!claimInfo) {
      handleListChange(claimInfo);
    }
  }, []);

  const handleRefresh = () => {
    setFilterTerm("");
    setFilteredData(claimInfo);
    const result = _.groupBy(claimInfo, monthName);
    const resultArr = _.entries(result);
    setExpenseList(resultArr);
    handleListChange(claimInfo);
    setCheckAll(false);
    setCheckData([]);
    setCheckArr([]);
  };

  const DropdownIndicator = (props) => {
    return (
      components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>
          <RiArrowDownSFill color={"rgba(41, 57, 145, 1)"} size={30} />
        </components.DropdownIndicator>
      )
    );
  };

  useEffect(() => {
    if (!!claimInfo) {
      const filter = claimInfo.filter((item) => {
        const itemYear = new Date(item.expenseDate).getFullYear();
        return itemYear === currentYear;
      });
      setFilteredData(filter);
      const result = _.groupBy(filter, monthName);
      const resultArr = _.entries(result);
      setExpenseList(resultArr);
      handleListChange(filter);
    }
  }, [currentYear]);

  const handleStatusChange = async (id, status) => {
    if (!!id) {
      await updateClaim({
        updateClaimAction,
        id: id,
        claimData: {
          status: status,
          actionBy: user?.id,
        },
        updatedAt: new Date().toISOString(),
      });
    }
    getClaims({
      apolloClient,
      where: { userId: user.id },
    });
    router.push({
      pathname: "/claims/claimApproval/expenseRequest",
      query: {
        message: "Success!",
        belongTo: "ClaimApproval",
        label: "Expense report successfully " + status + ".",
      },
    });
  };

  const handleCheck = (selectedId) => {
    setCheckData([]);
    setCheckData((prevData) => {
      if (prevData?.includes(selectedId)) {
        return prevData?.filter((id) => id !== selectedId);
      } else {
        return [...prevData, selectedId];
      }
    });
    const checkList = claimInfo?.filter((eachClaim) => {
      if (eachClaim?.id === selectedId) {
        return eachClaim;
      }
    });
    setCheckArr([...checkArr, checkList]);
  };

  const handleCancel = () => {
    setCheckData([]);
    setCheckArr([]);
  };

  const handleStatusConfirm = async (status) => {
    if (checkData) {
      checkData?.map(async (eachCheckData) => {
        await updateClaim({
          updateClaimAction,
          id: eachCheckData,
          claimData: {
            status: status,
            actionBy: user?.id,
          },
          updatedAt: new Date().toISOString(),
        });
      });
    }
    getClaims({
      apolloClient,
      where: { userId: user.id },
    });
    router.push({
      pathname: "/claims/claimApproval/expenseRequest",
      query: {
        message: "Success!",
        belongTo: "ClaimApproval",
        label:
          checkData?.length + " Expense report successfully " + status + ".",
      },
    });
  };

  return (
    <Layout>
      <div css={styles.wrapper}>
        <HeaderNoti
          title={"Claims"}
          href={user?.role?.name === "Manager" ? "/claims/Manager" : "/home"}
        />
        <div style={{ position: "relative", margin: "2px 10px" }}>
          <NotificationBox
            message={router.query.message}
            belongTo={router.query.belongTo}
            timeout={5000}
            label={router?.query?.label}
          />
        </div>
        <div css={styles.bodyContainer}>
          <div css={styles.requestContent}>
            <button onClick={() => router.push("/claims/claimApproval")}>
              <MdOutlineArrowBackIosNew
                color="rgba(41, 57, 145, 1)"
                size={20}
              />
            </button>
            <label className="header-text">EXPENSE REQUESTS STATUS</label>
          </div>
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
                onClick={filterModal}
                style={{ border: "none", background: "none" }}
              >
                <FilterIcon />
              </button>
              {modalOpen && (
                <FilterModal
                  isOpen={modalOpen}
                  close={() => setModalOpen(!modalOpen)}
                  handleCategoryChange={handleCategoryChange}
                />
              )}
            </div>
            <div>
              <button
                onClick={dateModal}
                style={{ border: "none", background: "none" }}
              >
                <CalendarIcon />
              </button>
              {dateModalOpen && (
                <DateFilterModal
                  isOpen={dateModalOpen}
                  close={() => setDateModalOpen(!dateModalOpen)}
                  handleDateChange={handleDateChange}
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
                Pending [{requestCount}]
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
                {filteredData && filteredData.length > 0 && (
                  <>
                    <div css={styles.statusAction}>
                      <label className="secondary-text">
                        <input
                          type={"checkbox"}
                          className="checkbox"
                          checked={checkAll ? true : false}
                          onChange={() => {
                            setCheckAll(!checkAll);
                          }}
                        />
                        All
                      </label>
                      <button
                        className="primary-text"
                        disabled={checkData?.length > 0 ? false : true}
                        style={{
                          background:
                            checkData?.length > 0
                              ? ""
                              : "rgba(95, 164, 82, 0.5)",
                        }}
                        onClick={() => {
                          setActionStatus("approved");
                          handleConfirmModal();
                        }}
                      >
                        APPROVE
                      </button>
                      <button
                        className="primary-text"
                        style={{
                          background:
                            checkData?.length > 0
                              ? "#EC1C24"
                              : "rgba(236, 28, 36, 0.5)",
                        }}
                        disabled={checkData?.length > 0 ? false : true}
                        onClick={() => {
                          setActionStatus("rejected");
                          handleConfirmModal();
                        }}
                      >
                        REJECT
                      </button>
                    </div>
                    <div css={styles.cardContainer}>
                      {filteredData.map(
                        (item, index) =>
                          item.status === "pending" && (
                            <div
                              css={styles.eachCard}
                              className="primary-text"
                              style={{ cursor: "pointer", lineHeight: "20px" }}
                              key={index}
                            >
                              {!!checkAll && (
                                <input
                                  type={"checkbox"}
                                  className="checkbox"
                                  style={{ marginRight: "10px" }}
                                  onClick={() => handleCheck(item?.id)}
                                />
                              )}
                              <label
                                style={{ width: "60%" }}
                                onClick={() => {
                                  router.push({
                                    pathname: "/claims/requestDetail",
                                    query: {
                                      expenseId: item.id,
                                      userName:
                                        item?.users_permissions_user?.username,
                                    },
                                  });
                                }}
                              >
                                <div className="d-flex">
                                  <img
                                    src={
                                      item?.users_permissions_user?.profile
                                        ?.photo?.url
                                        ? `${process.env.NEXT_PUBLIC_APP_URL}${item?.users_permissions_user?.profile?.photo.url}`
                                        : "../../images/defaultImage.jpg"
                                    }
                                  />
                                  <label
                                    style={{
                                      marginLeft: "10px",
                                    }}
                                  >
                                    {item?.users_permissions_user?.username}
                                    <label
                                      style={{
                                        textTransform: "capitalize",
                                        color: "#8898AA",
                                        fontSize: "13px",
                                      }}
                                    >
                                      {item?.users_permissions_user?.role?.name}
                                    </label>
                                  </label>
                                </div>
                                <label css={styles.expenseId}>
                                  #ER-0000{item.id}
                                </label>
                                {item.category?.label}{" "}
                                <label>$ {item.amount}</label>
                              </label>
                              <label>
                                <Select
                                  value={status}
                                  // onChange={handleStatusChange(item?.id)}
                                  onChange={(e) => {
                                    handleStatusChange(item.id, e.value);
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
                          )
                      )}
                    </div>
                  </>
                )}
                {filteredData && filteredData.length == 0 && (
                  <div css={styles.noDataContainer} className="primary-text">
                    <NoDataIcon />
                    <label>Nothing Here to show</label>
                    <label>You don’t have any report request</label>
                  </div>
                )}
              </>
            )}
            {activeTab == 2 && (
              <div css={styles.cardWrapper}>
                <Card
                  expenseList={approvedData}
                  total={approvedTotal}
                  role={user?.role?.name}
                />
              </div>
            )}
            {activeTab == 3 && (
              <div css={styles.cardWrapper}>
                <Card
                  expenseList={rejectedData}
                  total={rejectedTotal}
                  role={user?.role?.name}
                />
              </div>
            )}
          </div>

          <button css={styles.dateButton}>
            <MdOutlineKeyboardDoubleArrowLeft
              size={"20"}
              onClick={decrementYear}
            />
            <label className="primary-text">{currentYear}</label>
            <MdOutlineKeyboardDoubleArrowRight
              size={"20"}
              onClick={incrementYear}
            />
          </button>
        </div>
      </div>
      {openConfirmModal && (
        <ConfirmExpenseModal
          isOpen={openConfirmModal}
          close={() => setOpenConfirmModal(!openConfirmModal)}
          actionStatus={actionStatus}
          checkData={checkData}
          handleStatusConfirm={handleStatusConfirm}
          checkArr={checkArr}
          handleCancel={handleCancel}
        />
      )}
    </Layout>
  );
};

export default ExpenseRequestStatus;

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
    height: "15px",
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
    img {
      width: 40px;
      height: 40px;
      border-radius: 50px;
      border: 1px solid var(--light-gray);
    }
  `,
  expenseId: css`
    display: flex;
    font-size: 10px;
    font-weight: 400;
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
