/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineArrowBackIosNew,
} from "react-icons/md";

import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";
import Card from "../../components/claims/ExpenseStatusCard";
import FilterModal from "../../components/claims/FilterModal";
import DateFilterModal from "../../components/claims/DateFilterModal";

import FilterIcon from "/public/icons/filterIcon";
import CalendarIcon from "/public/icons/calendarIcon";
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
      category: "Telephone Expense",
      subCategory: "COMMUNICATION",
      amount: "$ 200",
      status: "Pending",
      date: "2023-09-15",
    },
    {
      id: "#ER-00002",
      category: "Air Travel Expense",
      subCategory: "Travel",
      amount: "$ 300",
      status: "Pending",
      date: "2023-08-15",
    },
    {
      id: "#ER-00003",
      category: "Parking",
      subCategory: "COMMUNICATION",
      amount: "$ 400",
      status: "Pending",
      date: "2023-07-15",
    },
    {
      id: "#ER-00001",
      category: "Telephone Expense",
      subCategory: "COMMUNICATION",
      amount: "$ 200",
      status: "Approved",
      date: "2023-09-15",
    },
    {
      id: "#ER-00002",
      category: "Air Travel Expense",
      subCategory: "Travel",
      amount: "$ 300",
      status: "Approved",
      date: "2023-08-15",
    },
    {
      id: "#ER-00003",
      category: "Parking",
      subCategory: "COMMUNICATION",
      amount: "$ 400",
      status: "Approved",
      date: "2023-07-15",
    },
    {
      id: "#ER-00001",
      category: "Telephone Expense",
      subCategory: "COMMUNICATION",
      amount: "$ 200",
      status: "Rejected",
      date: "2023-09-15",
    },
    {
      id: "#ER-00002",
      category: "Air Travel Expense",
      subCategory: "Travel",
      amount: "$ 300",
      status: "Rejected",
      date: "2023-08-15",
    },
    {
      id: "#ER-00003",
      category: "Parking",
      subCategory: "COMMUNICATION",
      amount: "$ 400",
      status: "Rejected",
      date: "2023-07-15",
    },
  ];

  const [filterTerm, setFilterTerm] = useState("");
  const [filteredData, setFilteredData] = useState(expenseData);

  const handleFilterChange = (event) => {
    const term = event.target.value;
    setFilterTerm(term);

    // Filter the data based on the filterTerm
    const filteredResults = expenseData.filter(
      (item) =>
        item?.category?.toLowerCase().includes(term?.toLowerCase()) ||
        item?.subCategory?.toLowerCase().includes(term?.toLowerCase()) ||
        item?.status?.toLowerCase().includes(term?.toLowerCase()) ||
        item?.id?.toLowerCase().includes(term?.toLowerCase()) ||
        item?.amount?.toLowerCase().includes(term?.toLowerCase())
    );

    setFilteredData(filteredResults);
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
              <div css={styles.cardContainer}>
                {filteredData.map(
                  (item, index) =>
                    item.status == "Pending" && (
                      <div
                        css={styles.eachCard}
                        className="primary-text"
                        style={{ cursor: "pointer" }}
                        onClick={() => router.push("/claims/requestDetail")}
                      >
                        <label>
                          <label css={styles.expenseId}>{item.id}</label>
                          {item.category}
                          <label css={styles.expenseDetail}>
                            {item.subCategory}
                          </label>
                        </label>
                        <label>
                          {item.amount}
                          <label css={styles.expenseStatus}>
                            {item.status}
                          </label>
                        </label>
                      </div>
                    )
                )}
              </div>
            )}
            {activeTab == 2 && (
              <div css={styles.cardWrapper}>
                <Card
                  date={"September 2022"}
                  count={3}
                  amount={"$ 900.00"}
                  expenseData={filteredData}
                />

                <Card
                  date={"August 2022"}
                  count={3}
                  amount={"$ 900.00"}
                  expenseData={filteredData}
                />
                <Card
                  date={"July 2022"}
                  count={3}
                  amount={"$ 900.00"}
                  expenseData={filteredData}
                />
              </div>
            )}
            {activeTab == 3 && (
              <div css={styles.noDataContainer} className="primary-text">
                <NoDataIcon />
                <label>Nothing Here to show</label>
                <label>You don’t have any report request</label>
              </div>
            )}
          </div>
          <button
            css={styles.dateButton}
            style={{ display: activeTab == 3 ? "none" : "block" }}
          >
            <MdOutlineKeyboardDoubleArrowLeft size={"20"} onClick={decrement} />
            <label className="primary-text">{count}</label>
            <MdOutlineKeyboardDoubleArrowRight
              size={"20"}
              onClick={increment}
            />
          </button>
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
      width: 70%;
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
