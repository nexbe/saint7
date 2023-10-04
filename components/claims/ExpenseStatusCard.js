/** @jsxImportSource @emotion/react */
import { useState, useEffect, useMemo } from "react";
import { css } from "@emotion/react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

import NoDataIcon from "/public/icons/noDataIcon";

const Card = ({ expenseList }) => {
  const [selectedIndex, setSelectedIndex] = useState();
  const [openCard, setOpenCard] = useState([]);

  useEffect(() => {}, [expenseList, openCard]);

  useMemo(() => {
    setOpenCard(
      expenseList?.map((eachData) => {
        return false;
      })
    );
  }, [expenseList]);

  let total = expenseList?.map((eachExpense, index) => {
    let sum = 0;
    eachExpense[1]?.map((eachData) => {
      sum += eachData.amount;
    });
    return sum;
  });

  const handleOpen = (index) => {
    let open = openCard;
    open[index] = !openCard[index];
    setOpenCard([...open]);
  };

  return (
    <>
      {expenseList && expenseList.length > 0 && (
        <>
          {expenseList?.map((eachResult, index) => {
            return (
              <div css={styles.cardContainer} key={index}>
                <div
                  css={styles.approvedCard}
                  style={{
                    color: openCard[index] ? "var(--white)" : "",
                    background: openCard[index] ? "var(--primary)" : "",
                    borderRadius: openCard[index] ? "10px 10px 0 0" : "",
                  }}
                  className="primary-text"
                >
                  <label>{eachResult[0]}</label>
                  <label
                    className="count"
                    style={{
                      border: openCard[index] ? "1px solid var(--white)" : "",
                    }}
                  >
                    {eachResult[1].length}
                  </label>
                  <label>
                    {"$"} {total[index]}
                  </label>
                  <label
                    onClick={() => {
                      setSelectedIndex(index);
                      handleOpen(index);
                    }}
                  >
                    {openCard[index] ? (
                      <MdOutlineKeyboardArrowUp
                        color="var(--white)"
                        size={30}
                      />
                    ) : (
                      <MdOutlineKeyboardArrowDown
                        color="var(--primary)"
                        size={30}
                      />
                    )}
                  </label>
                </div>
                {eachResult[1]?.map((eachNote, nestedIndex) => {
                  return (
                    <div
                      style={{
                        display: openCard[index] ? "block" : "none",
                      }}
                      className="detailWrapper"
                      key={nestedIndex}
                    >
                      <div
                        css={styles.detailContainer}
                        className="primary-text"
                        key={nestedIndex}
                      >
                        <label>
                          <label css={styles.expenseId}>{eachNote.id}</label>
                          {eachNote.category}
                        </label>
                        <label>
                          {eachNote.currency} {eachNote.amount}
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </>
      )}
      {expenseList && expenseList.length == 0 && (
        <div css={styles.noDataContainer} className="primary-text">
          <NoDataIcon />
          <label>Nothing Here to show</label>
          <label>You don’t have any report request</label>
        </div>
      )}
    </>
  );
};

export default Card;

const styles = {
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
  approvedCard: css`
    display: flex;
    padding: 15px 12px;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    opacity: 0.8;
    background: #e3f3ff;
    color: var(--primary);
    box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.08);
    @media (max-width: 700px) {
      font-size: 13px;
    }
    .count {
      border: 1px solid var(--primary);
      border-radius: 50px;
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `,
  detailContainer: css`
    display: flex;
    flex-direction: row;
    line-height: 25px;
    padding: 5px 10px;
    justify-content: space-between;
    background: var(--white);
    box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.08);
    border-bottom: 1px solid #e2e8f0;
    label {
      display: flex;
      flex-direction: column;
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
    padding: 0px 10px;
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
  noDataContainer: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
};
