/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

import NoDataIcon from "/public/icons/noDataIcon";

const Card = ({ expenseList }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {}, [expenseList]);

  return (
    <>
      {expenseList && expenseList.length > 0 && (
        <>
          {expenseList?.map((eachResult, index) => {
            return (
              <div css={styles.cardContainer} key={index}>
                <div className="secondary-text">
                  <label>{eachResult[0]} </label>
                  <span>{eachResult[1].length}</span>
                </div>
                {eachResult[1]?.map((eachNote, index) => {
                  return (
                    <div
                      style={{
                        display: index < 3 ? "block" : open ? "block" : "none",
                      }}
                      key={index}
                    >
                      <div
                        css={styles.expenseList}
                        className="primary-text"
                        style={{ background: index % 2 ? "" : "#f7f7f7" }}
                      >
                        <label>{eachNote.category}</label>
                        <label>
                          {eachNote.currency} {eachNote.amount}{" "}
                          <span
                            className="expenseStatus"
                            style={{
                              color:
                                eachNote.status == "Pending"
                                  ? "#FFB016"
                                  : eachNote.status == "Rejected"
                                  ? "#E53E3E"
                                  : "",
                            }}
                          >
                            {eachNote.status}
                          </span>
                        </label>
                      </div>
                    </div>
                  );
                })}
                {eachResult[1].length > 3 && (
                  <button
                    css={styles.viewMoreBtn}
                    onClick={() => setOpen(!open)}
                  >
                    {open ? (
                      <MdOutlineKeyboardArrowUp
                        color="var(--white)"
                        size={30}
                      />
                    ) : (
                      <MdOutlineKeyboardArrowDown
                        color="var(--white)"
                        size={30}
                      />
                    )}{" "}
                    View {open ? "Less" : "More"}
                  </button>
                )}
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
    justify-content: space-between;
    background: var(--white);
    box-shadow: 0 4px 20px rgba(5, 14, 37, 0.05);
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 12px;
    .secondary-text {
      color: var(--primary);
      font-weight: 700;
      font-size: 16px;
      position: relative;
      display: flex;
      gap: 5px;
      label {
        display: flex;
      }
      span {
        position: relative;
        color: var(--white);
        font-size: 10px;
        background: var(--primary);
        width: 10px;
        height: 10px;
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 30px;
      }
    }
  `,
  expenseList: css`
    display: flex;
    flex-direction: row;
    padding: 10px 12px;
    justify-content: space-between;
    border-bottom: 1px solid #e2e8f0;
    line-height: 20px;
    label {
      display: flex;
      flex-direction: column;
    }
    .expenseStatus {
      font-size: 12px;
      color: #28bd41;
      text-transform: capitalize;
    }
  `,
  viewMoreBtn: css`
    background: none;
    border: none;
    color: #2d6db7;
    font-size: 14px;
    margin-top: 7px;
    svg {
      background: #2d6db7;
      border-radius: 50px;
      width: 18px;
      height: 18px;
      color: var(--white);
    }
  `,
  noDataContainer: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
};
