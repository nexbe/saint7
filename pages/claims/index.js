/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import Chart from "chart.js/auto";
import { useRef, useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import moment from "moment";
import _ from "lodash";

import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";
import Card from "../../components/claims/ExpenseListCard";
import FilterModal from "../../components/claims/FilterModal";
import DateFilterModal from "../../components/claims/DateFilterModal";

import FilterIcon from "/public/icons/filterIcon";
import CalendarIcon from "/public/icons/calendarIcon";
import RefreshIcon from "/public/icons/refreshIcon";
import SearchIcon from "/public/icons/searchIcon";
import ShowChartIcon from "/public/icons/showChartIcon";
import ShowListIcon from "/public/icons/showListIcon";
import ChartIcon from "/public/icons/chartIcon";
import ListIcon from "/public/icons/listIcon";
import ForwardIcon from "/public/icons/forwardIcon";
import BackIcon from "/public/icons/backIcon";
import PlusIcon from "/public/icons/plusIcon";

const Claims = () => {
  const router = useRouter();
  const [showChart, setShowChart] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };
  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };
  const formattedDate = currentDate.format("MMMM YYYY");

  const filterModal = () => {
    setModalOpen(!modalOpen);
  };
  const dateModal = () => {
    setDateModalOpen(!dateModalOpen);
  };

  const canvas = useRef();
  useEffect(() => {
    const ctx = canvas.current;
    let chartStatus = Chart.getChart(ctx);
    if (chartStatus !== undefined) {
      chartStatus.destroy();
    }
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Pending", "Approved", "Rejected"],
        datasets: [
          {
            data: [30, 30, 40],
            labels: ["Pending", "Approved", "Rejected"],
            backgroundColor: [
              "rgba(117, 221, 72, 1)",
              "rgba(229, 62, 62, 1)",
              "rgba(255, 176, 22, 1)",
            ],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: false,
        aspectRatio: 1.4,
        plugins: {
          legend: false,
          tooltip: {
            enabled: false,
          },
        },
      },
    });
  }, []);

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

  const monthName = (item) => moment(item.date, "YYYY-MM-DD").format("MMMM");

  const [filterTerm, setFilterTerm] = useState("");
  const [expenseList, setExpenseList] = useState();

  useEffect(() => {
    const result = _.groupBy(expenseData, monthName);
    const resultArr = _.entries(result);
    setExpenseList(resultArr);
  }, []);

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
    const result = _.groupBy(filteredResults, monthName);
    const resultArr = _.entries(result);
    setExpenseList(resultArr);
  };

  const handleDateChange = (startDate, endDate) => {
    const filteredResults = expenseData.filter(
      (item) =>
        new Date(item.date).getTime() >= new Date(startDate).getTime() &&
        new Date(item.date).getTime() <= new Date(endDate).getTime()
    );
    const result = _.groupBy(filteredResults, monthName);
    const resultArr = _.entries(result);
    setExpenseList(resultArr);
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

    const result = _.groupBy(filteredResults, monthName);
    const resultArr = _.entries(result);
    setExpenseList(resultArr);
  };

  const handleRefresh = () => {
    setFilterTerm("");
    const result = _.groupBy(expenseData, monthName);
    const resultArr = _.entries(result);
    setExpenseList(resultArr);
  };

  const expenseCount = _.values(expenseList).reduce(
    (accumulator, eachExpense) => {
      return accumulator + eachExpense[1]?.length;
    },
    0
  );

  let approvedTotal = 0;
  let rejectedTotal = 0;
  let pendingTotal = 0;
  let approvedCount = 0;
  let rejectedCount = 0;
  let pendingCount = 0;
  expenseData?.map((eachExpense, index) => {
    if (eachExpense.status == "Approved") {
      approvedTotal += parseFloat(eachExpense.amount);
      approvedCount += 1;
    } else if (eachExpense.status == "Rejected") {
      rejectedTotal += parseFloat(eachExpense.amount);
      rejectedCount += 1;
    } else {
      pendingTotal += parseFloat(eachExpense.amount);
      pendingCount += 1;
    }
  });

  return (
    <Layout>
      <div css={styles.wrapper}>
        <HeaderNoti title={"Claims"} href={"/home"} />
        <div css={styles.bodyContainer}>
          <div
            css={styles.requestTitle}
            className="header-text"
            onClick={() => router.push("/claims/expenseRequestStatus")}
          >
            EXPENSE REQUESTS STATUS
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
          <div css={styles.viewContainer}>
            <button onClick={() => setShowChart(!showChart)}>
              {showChart ? <ChartIcon /> : <ShowChartIcon />}
            </button>
            <button onClick={() => setShowChart(!showChart)}>
              {showChart ? <ShowListIcon /> : <ListIcon />}
            </button>
          </div>
          <div style={{ display: showChart ? "block" : "none" }}>
            <div css={styles.dateContainer}>
              <button onClick={handlePrevMonth}>
                <BackIcon />
              </button>
              <label className="primary-text">{formattedDate}</label>
              <button onClick={handleNextMonth}>
                <ForwardIcon />
              </button>
            </div>
            <div style={{ textAlign: "center" }}>
              <div css={styles.pieChart}>
                <canvas id="myChart" ref={canvas}></canvas>
                {/* <label className="pendingPercent">48%</label>
                <label className="approvedPercent">32%</label>
                <label className="rejectedPercent">20%</label> */}
                <label className="expenseCount">
                  {expenseCount} <span>Expenses</span>
                </label>
              </div>
              <div css={styles.chartDataStatus}>
                <div style={{ gap: "10px" }}>
                  <span css={styles.colorStatus}></span>
                  <span
                    css={styles.colorStatus}
                    style={{ background: "#75DD48" }}
                  ></span>
                  <span
                    css={styles.colorStatus}
                    style={{ background: "#E53E3E" }}
                  ></span>
                </div>
                <div className="primary-text" style={{ fontWeight: "400" }}>
                  <label>Pending</label>
                  <label>Approved</label>
                  <label>Rejected</label>
                </div>
                <div className="primary-text">
                  <span css={styles.percentageStatus}>
                    {pendingTotal} $ - {(pendingCount / expenseCount) * 100}%{" "}
                  </span>
                  <span css={styles.percentageStatus}>
                    {approvedTotal} $ - {(approvedCount / expenseCount) * 100}%{" "}
                  </span>
                  <span css={styles.percentageStatus}>
                    {rejectedTotal} $ - {(rejectedCount / expenseCount) * 100}%{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: showChart ? "none" : "block" }}>
            <Card expenseList={expenseList} />
          </div>
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

export default Claims;

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
      margin: 20px;
    }
    @media (min-width: 1400px) {
      margin: 30px;
    }
    svg {
      cursor: pointer;
    }
  `,
  requestTitle: css`
    padding: 10px;
    height: 40px;
    display: flex;
    font-size: 18px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 10px;
    background: var(--primary);
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
  viewContainer: css`
    display: flex;
    gap: 10px;
    button {
      border: none;
      background: none;
    }
  `,
  dateContainer: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    .primary-text {
      color: #497c8a;
    }
    button {
      border: none;
      background: none;
    }
  `,
  pieChart: css`
    position: relative;
    display: flex;
    justify-content: center;
    label {
      position: absolute;
      color: var(--white);
    }
    .rejectedPercent {
      margin-top: 10rem;
      margin-left: 10rem;
    }
    .approvedPercent {
      margin-top: 40px;
      margin-left: 7rem;
    }
    .pendingPercent {
      margin-top: 6rem;
      margin-right: 11rem;
    }
    .expenseCount {
      margin-top: 85px;
      color: #37474f;
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 20px;
    }
  `,
  chartDataStatus: css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 20px 0;
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 20px;
    }
  `,
  colorStatus: css`
    width: 20px;
    height: 20px;
    padding: 0 10px;
    border-radius: 5px;
    background: #ffb016;
  `,
  percentageStatus: css`
    color: #37474f;
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
