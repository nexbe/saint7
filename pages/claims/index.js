/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import Chart from "chart.js/auto";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";

import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";
import Card from "../../components/claims/ExpenseListCard";
import FilterModal from "../../components/claims/FilterModal";
import DateFilterModal from "../../components/claims/DateFilterModal";

import FilterIcon from "/public/icons/filterIcon";
import CalendarIcon from "/public/icons/calendarIcon";
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
            data: [20, 32, 48],
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
        responsive: true,
        aspectRatio: 2.3,
        plugins: {
          legend: false,
          tooltips: {
            callbacks: {
              label: function (tooltipItem, data) {
                // Customize the tooltip label

                const percentage =
                  (
                    (value / data.datasets[0].data.reduce((a, b) => a + b, 0)) *
                    100
                  ).toFixed(2) + "%";
                return `${percentage}`;
              },
            },
          },
        },
        cutoutPercentage: 1,
      },
    });
  }, []);

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
            <input type="text" placeholder="Search fields" />
            <label css={styles.searchIcon}>
              <SearchIcon />
            </label>
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
              <BackIcon />
              <label className="primary-text">March 2023</label>
              <ForwardIcon />
            </div>
            <div style={{ textAlign: "center" }}>
              <canvas id="myChart" ref={canvas}></canvas>
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
                  <span css={styles.percentageStatus}>800.00 USD - 48% </span>
                  <span css={styles.percentageStatus}>800.00 USD - 48% </span>
                  <span css={styles.percentageStatus}>800.00 USD - 48% </span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: showChart ? "none" : "block" }}>
            <Card title={"January"} count={30} />
            <Card title={"February"} count={20} />
            <Card title={"March"} count={10} />
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
  requestContent: css`
    display: flex;
    align-items: center;
    gap: 30px;
    @media (min-width: 400px) {
      gap: 50px;
    }
    @media (min-width: 1400px) {
      gap: 30px;
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
      width: 70%;
      padding: 9px 12px;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      flex-shrink: 0;
      border-radius: 10px;
      border: 1px solid var(--dark-gray);
      background: var(--white);
      ::placeholder {
        color: var(--dark-gray);
        font-family: Open Sans;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        padding-left: 18px;
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
    .primary-text {
      color: #497c8a;
    }
  `,
  dataPercent: css`
    position: absolute;
    margin-top: -70px;
  `,
  chartDataStatus: css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-top: 10px;
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
