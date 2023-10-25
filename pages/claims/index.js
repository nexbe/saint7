/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import Chart from "chart.js/auto";
import { useRef, useEffect, useState, useMemo } from "react";
import { useApolloClient, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import moment from "moment";
import _ from "lodash";

import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";
import Card from "../../components/claims/ExpenseListCard";
import FilterModal from "../../components/claims/FilterModal";
import DateFilterModal from "../../components/claims/DateFilterModal";
import NoDataIcon from "/public/icons/noDataIcon";
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
import userStore from "../../store/auth";
import claimStore from "../../store/claim";

const Claims = () => {
  const router = useRouter();
  const apolloClient = useApolloClient();
  const { getAllClaims, ClaimInfo: claimInfo } = claimStore((state) => state);
  const { user } = userStore((state) => state);

  const [showChart, setShowChart] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);

  const filterModal = () => {
    setModalOpen(!modalOpen);
  };
  const dateModal = () => {
    setDateModalOpen(!dateModalOpen);
  };

  useEffect(() => {
    getAllClaims({
      apolloClient,
      where: { userId: user.id },
    });
  }, [user]);

  const monthName = (item) =>
    moment(item.expenseDate, "YYYY-MM-DD").format("MMMM");
  const [filterTerm, setFilterTerm] = useState("");
  const [expenseList, setExpenseList] = useState();

  useMemo(() => {
    if (!!claimInfo) {
      const result = _.groupBy(claimInfo, monthName);
      const resultArr = _.entries(result);
      setExpenseList(resultArr);
    }
  }, [claimInfo]);

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
    const result = _.groupBy(filteredResults, monthName);
    const resultArr = _.entries(result);
    setExpenseList(resultArr);
  };

  const handleDateChange = (startDate, endDate) => {
    const filteredResults = claimInfo.filter(
      (item) =>
        new Date(item.expenseDate).getTime() >= new Date(startDate).getTime() &&
        new Date(item.expenseDate).getTime() <= new Date(endDate).getTime()
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

    const result = _.groupBy(filteredResults, monthName);
    const resultArr = _.entries(result);
    setExpenseList(resultArr);
  };

  const handleRefresh = () => {
    getAllClaims({
      apolloClient,
      where: { userId: user.id },
    });
    setFilterTerm("");
    const result = _.groupBy(claimInfo, monthName);
    const resultArr = _.entries(result);
    setExpenseList(resultArr);
    setCurrentMonth(new Date().getMonth() + 1);
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
  claimInfo?.map((eachExpense, index) => {
    if (eachExpense.status === "approved") {
      approvedTotal += parseFloat(eachExpense.amount);
      approvedCount += 1;
    } else if (eachExpense.status === "rejected") {
      rejectedTotal += parseFloat(eachExpense.amount);
      rejectedCount += 1;
    } else {
      pendingTotal += parseFloat(eachExpense.amount);
      pendingCount += 1;
    }
  });
  const canvas = useRef();
  const chartRef = useRef(null);
  useEffect(() => {
    const ctx = canvas.current;
    let chartStatus = Chart.getChart(ctx);
    if (chartStatus !== undefined) {
      chartStatus.destroy();
    }
    if (chartRef.current) {
      // If the chart already exists, update the data
      chartRef.current.data.datasets[0].data = [
        pendingCount,
        approvedCount,
        rejectedCount,
      ];
    } else {
      new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Pending", "Approved", "Rejected"],
          datasets: [
            {
              data: [pendingCount, approvedCount, rejectedCount],
              labels: ["Pending", "Approved", "Rejected"],
              backgroundColor: ["orange", "green", "red"],
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
    }
  }, [claimInfo]);

  useEffect(() => {
    if (!!claimInfo) {
      const filteredData = claimInfo.filter((item) => {
        const itemDate = new Date(item.expenseDate);
        const itemYear = itemDate.getFullYear();
        const itemMonth = itemDate.getMonth() + 1;
        return itemYear === currentYear && itemMonth === currentMonth;
      });

      const result = _.groupBy(filteredData, monthName);
      const resultArr = _.entries(result);
      setExpenseList(resultArr);
    }
  }, [currentYear, currentMonth]);

  const changeYearMonth = (increment) => {
    if (increment) {
      if (currentMonth === 12) {
        setCurrentMonth(1);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    } else {
      if (currentMonth === 1) {
        setCurrentMonth(12);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    }
  };

  return (
    <Layout>
      <div css={styles.wrapper}>
        <HeaderNoti
          title={"Claims"}
          href={user?.role?.name === "Manager" ? "/claims/Manager" : "/home"}
        />
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
            {expenseList && expenseList.length > 0 && (
              <>
                <div css={styles.dateContainer}>
                  <button onClick={() => changeYearMonth(false)}>
                    <BackIcon />
                  </button>
                  <label className="primary-text">
                    {dayjs()
                      .month(currentMonth - 1)
                      .format("MMMM")}{" "}
                    {currentYear}
                  </label>
                  <button onClick={() => changeYearMonth(true)}>
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
                        {pendingTotal} $ -{" "}
                        {Math.round((pendingCount / expenseCount) * 100)}%{" "}
                      </span>
                      <span css={styles.percentageStatus}>
                        {approvedTotal} $ -{" "}
                        {Math.round((approvedCount / expenseCount) * 100)}%{" "}
                      </span>
                      <span css={styles.percentageStatus}>
                        {rejectedTotal} $ -{" "}
                        {Math.round((rejectedCount / expenseCount) * 100)}%{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div style={{ display: showChart ? "none" : "block" }}>
            <Card expenseList={expenseList} />
          </div>
          {expenseList && expenseList.length == 0 && (
            <div css={styles.noDataContainer} className="primary-text">
              <NoDataIcon />
              <label>Nothing Here to show</label>
              <label>You don’t have any report request</label>
            </div>
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
  noDataContainer: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
};
