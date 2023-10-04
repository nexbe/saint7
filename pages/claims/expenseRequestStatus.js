/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineArrowBackIosNew,
} from "react-icons/md";
import moment from "moment";
import _ from "lodash";

import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";
import Card from "../../components/claims/ExpenseStatusCard";
import FilterModal from "../../components/claims/FilterModal";
import DateFilterModal from "../../components/claims/DateFilterModal";

import FilterIcon from "/public/icons/filterIcon";
import CalendarIcon from "/public/icons/calendarIcon";
import RefreshIcon from "/public/icons/refreshIcon";
import SearchIcon from "/public/icons/searchIcon";
import NoDataIcon from "/public/icons/noDataIcon";
import PlusIcon from "/public/icons/plusIcon";

const ExpenseRequestStatus = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(1);
  const [count, setCount] = useState(2023);
  const [modalOpen, setModalOpen] = useState(false);
  const [dateModalOpen, setDateModalOpen] = useState(false);

  const filterModal = () => {
    setModalOpen(!modalOpen);
  };
  const dateModal = () => {
    setDateModalOpen(!dateModalOpen);
  };

  // Increment function
  const increment = () => {
    setCount(count + 1);
  };

  // Decrement function
  const decrement = () => {
    setCount(count - 1);
  };
  const expenseData = [
    {
      id: "#ER-00001",
      category: "Advanced Tax",
      subCategory: "COMMUNICATION",
      currency: "$",
      amount: 200,
      status: "Pending",
      date: "2023-09-10",
    },
    {
      id: "#ER-00002",
      category: "Telephone Expense",
      subCategory: "COMMUNICATION",
      currency: "$",
      amount: 800,
      status: "Approved",
      date: "2023-09-20",
    },
    {
      id: "#ER-00003",
      category: "Parking",
      subCategory: "COMMUNICATION",
      currency: "$",
      amount: 500,
      status: "Rejected",
      date: "2023-09-28",
    },
    {
      id: "#ER-000010",
      category: "Parking",
      subCategory: "COMMUNICATION",
      currency: "$",
      amount: 100,
      status: "Rejected",
      date: "2023-09-18",
    },
    {
      id: "#ER-00004",
      category: "Telephone Expense",
      subCategory: "COMMUNICATION",
      currency: "$",
      amount: 300,
      status: "Pending",
      date: "2023-08-10",
    },
    {
      id: "#ER-00005",
      category: "Telephone Expense",
      subCategory: "COMMUNICATION",
      currency: "$",
      amount: 400,
      status: "Approved",
      date: "2023-08-20",
    },
    {
      id: "#ER-00006",
      category: "Parking",
      subCategory: "COMMUNICATION",
      currency: "$",
      amount: 500,
      status: "Rejected",
      date: "2023-08-29",
    },
    {
      id: "#ER-00007",
      category: "Telephone Expense",
      subCategory: "COMMUNICATION",
      currency: "$",
      amount: 400,
      status: "Pending",
      date: "2023-07-10",
    },
    {
      id: "#ER-00008",
      category: "Telephone Expense",
      subCategory: "COMMUNICATION",
      currency: "$",
      amount: 500,
      status: "Approved",
      date: "2023-07-20",
    },
    {
      id: "#ER-00009",
      category: "Parking",
      subCategory: "COMMUNICATION",
      currency: "$",
      amount: 700,
      status: "Rejected",
      date: "2023-07-29",
    },
  ];

  const [filterTerm, setFilterTerm] = useState("");
  const [expenseList, setExpenseList] = useState();
  const [filteredData, setFilteredData] = useState(expenseData);
  const [approvedData, setApprovedData] = useState(expenseData);
  const [rejectedData, setRejectedData] = useState(expenseData);
  const [approvedTotal, setApprovedTotal] = useState();
  const [rejectedTotal, setRejectedTotal] = useState();

  const monthName = (item) =>
    moment(item.date, "YYYY-MM-DD").format("MMMM YYYY");

  useEffect(() => {
    const result = _.groupBy(expenseData, monthName);
    const resultArr = _.entries(result);
    setExpenseList(resultArr);
  }, []);

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
    const filteredResults = expenseData.filter(
      (item) =>
        item?.category?.toLowerCase().includes(term?.toLowerCase()) ||
        item?.subCategory?.toLowerCase().includes(term?.toLowerCase()) ||
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
    const filteredResults = expenseData.filter(
      (item) =>
        new Date(item.date).getTime() >= new Date(startDate).getTime() &&
        new Date(item.date).getTime() <= new Date(endDate).getTime()
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
      ? expenseData.filter((item) => item.amount >= minAmount)
      : expenseData;
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
      if (!!checkCategoryList.find((category) => category === item.category))
        return item;
    });
    setFilteredData(filteredResults);
    const result = _.groupBy(filteredResults, monthName);
    const resultArr = _.entries(result);
    setExpenseList(resultArr);
    handleListChange(filteredResults);
  };

  useMemo(() => {
    handleListChange(expenseData);
  }, []);

  const handleRefresh = () => {
    setFilterTerm("");
    setFilteredData(expenseData);
    const result = _.groupBy(expenseData, monthName);
    const resultArr = _.entries(result);
    setExpenseList(resultArr);
    handleListChange(expenseData);
  };

  return (
    <Layout>
      <div css={styles.wrapper}>
        <HeaderNoti title={"Claims"} href={"/home"} />
        <div css={styles.bodyContainer}>
          <div css={styles.requestContent}>
            <button onClick={() => router.push("/claims")}>
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
                Pending
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
                  <div css={styles.cardContainer}>
                    {filteredData.map(
                      (item, index) =>
                        item.status == "Pending" && (
                          <div
                            css={styles.eachCard}
                            className="primary-text"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              router.push({
                                pathname: "/claims/requestDetail",
                                query: {
                                  expenseId: item.id,
                                },
                              });
                            }}
                            key={index}
                          >
                            <label>
                              <label css={styles.expenseId}>{item.id}</label>
                              {item.category}
                            </label>
                            <label>
                              {item.currency} {item.amount}
                              <label css={styles.expenseStatus}>
                                {item.status}
                              </label>
                            </label>
                          </div>
                        )
                    )}
                  </div>
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
                <Card expenseList={approvedData} total={approvedTotal} />
              </div>
            )}
            {activeTab == 3 && (
              <div css={styles.cardWrapper}>
                <Card expenseList={rejectedData} total={rejectedTotal} />
              </div>
            )}
          </div>
          {filteredData && filteredData.length > 0 && (
            <button css={styles.dateButton}>
              <MdOutlineKeyboardDoubleArrowLeft
                size={"20"}
                onClick={decrement}
              />
              <label className="primary-text">{count}</label>
              <MdOutlineKeyboardDoubleArrowRight
                size={"20"}
                onClick={increment}
              />
            </button>
          )}
          <div
            css={styles.addReport}
            onClick={() => router.push("/claims/addExpenseRequest")}
          >
            <PlusIcon />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ExpenseRequestStatus;

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
  addReport: css`
    background: var(--primary);
    width: 50px;
    height: 50px;
    border-radius: 50px;
    padding: 3px;
    cursor: pointer;
    position: absolute;
    bottom: 60px;
    right: 12px;
  `,
};
