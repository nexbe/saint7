/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import DatePicker from "react-datepicker";
require("react-datepicker/dist/react-datepicker.css");
import { BiCalendarAlt } from "react-icons/bi";
import Select, { components } from "react-select";
import {
  MdOutlineKeyboardArrowDown,
  MdRemoveCircleOutline,
} from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { useApolloClient } from "@apollo/client";
import userStore from "../../store/user";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import payslipStore from "../../store/payslip";
import useAuth from "../../store/auth";

const CreatePayslip = () => {
  const router = useRouter();
  const { createPayslip, createPayslipError } = payslipStore();
  const { user } = useAuth();
  const apolloClient = useApolloClient();
  const [month, setMonth] = useState(new Date());
  const [year, setYear] = useState(new Date());
  const [assignedUsers, setAssignedUsers] = useState();
  const [basicSalary, setBasicSalary] = useState();
  const [allowance, setAllowance] = useState();
  const [morePayslipData, setMorePayslipData] = useState([]);
  const { getAllUsers, UserInfo: userInfo } = userStore((state) => state);
  const options = [
    { value: "deduct", label: "Deduct" },
    { value: "add", label: "Add" },
  ];
  useEffect(() => {
    getAllUsers({
      apolloClient,
      where: {},
    });
  }, []);
  const handleMonthChange = (date) => {
    setMonth(date);
  };
  const handleYearChange = (date) => {
    setYear(date);
  };

  const handleUsersChange = (selectedOption) => {
    setAssignedUsers(selectedOption);
  };
  // add more handler
  const handleAddMoreClick = () => {
    let newRow = {
      key: "",
      value: "",
    };
    setMorePayslipData((prevBoxes) => [...prevBoxes, newRow]);
  };

  const handleAddMoreDeleteClick = (index) => {
    let data = [...morePayslipData];
    data.splice(index, 1);
    setMorePayslipData(data);
  };

  const userOptions = userInfo?.map((eachOption) => ({
    value: eachOption?.id,
    label: eachOption?.username,
  }));

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const users = assignedUsers?.map((user) => user.value);
    createPayslip(
      {
        data: {
          users: users,
          month: dayjs(month).format("MMMM"),
          year: dayjs(year).year(),
          basicSalary: basicSalary,
          allowance: allowance,
          transactions: morePayslipData,
        },
      },
      user.jwt
    );
    router.push({
      pathname: `/payslip/Admin`,
      query: {
        message: !createPayslipError ? "Success!" : "Apologies!",
        belongTo: !createPayslipError ? "Payslip" : "error",
        label: dayjs(month).format("MMMM") + " has successfully created.",
      },
    });
    setMonth('');
    setYear('');
    setAssignedUsers('');
    setBasicSalary('');
    setAllowance('');
    setMorePayslipData('');
  };
  console.log(createPayslipError)
  const DropdownIndicator = (props) => {
    return (
      components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>
          <MdOutlineKeyboardArrowDown color={"#2F4858"} size={25} />
        </components.DropdownIndicator>
      )
    );
  };
  const handleAddMoreChange = (event, index) => {
    let data = [...morePayslipData];
    if (event === "deduct" || event === "add") {
      data[index]["options"] = event;
    } else {
      const { name, value } = event.target;
      if (name !== undefined && value !== undefined) {
        data[index][name] = value;
      }
    }
    console.log(data)
  };

  return (
    <form css={styles.wrapper} onSubmit={onSubmitHandler}>
      <div css={styles.container}>
        <div css={styles.dateContent}>
          <div>
            <label className="d-flex">
              <BiCalendarAlt size={20} />
              <DatePicker
                selected={month}
                onChange={handleMonthChange}
                dateFormat="MMMM"
                shouldCloseOnSelect={true}
                showMonthYearPicker
              />
            </label>
          </div>
          <div>
            <label className="d-flex">
              <BiCalendarAlt size={20} />
              <DatePicker
                selected={year}
                onChange={handleYearChange}
                showYearPicker
                dateFormat="yyyy"
                shouldCloseOnSelect={true}
              />
            </label>
          </div>
        </div>
        <div css={styles.selectUserStyle}>
          <label>Choose Employee</label>
          <Select
            id="assign_user"
            name="assign_user"
            onChange={handleUsersChange}
            value={assignedUsers}
            options={userOptions}
            components={{
              DropdownIndicator: () => null,
              IndicatorSeparator: () => null,
              DropdownIndicator,
            }}
            isMulti
            isClearable={false}
          />
        </div>
        <div css={styles.inputStyle}>
          <label>Basic Salary (+) </label>
          <div>
            <b>SGD</b>
            <input
              value={basicSalary}
              onChange={(e) => setBasicSalary(e.target.value)}
              placeholder="0.00"
              type="text"
              id="basic_salary"
              name="basic_salary"
              required
            />
          </div>
        </div>
        <div css={styles.inputStyle}>
          <label>Allowance (+)</label>
          <div>
            <b>SGD</b>
            <input
              onChange={(e) => setAllowance(e.target.value)}
              placeholder="0.00"
              type="text"
              id="Allowance"
              name="Allowance"
              required
            />
          </div>
        </div>
        {morePayslipData &&
          morePayslipData.map((data, index) => {
            console.log(morePayslipData[index]["options"])
            return (
              <div key={data.id} css={styles.box}>
                {morePayslipData && morePayslipData.length > 0 && (
                  <div
                    onClick={() => handleAddMoreDeleteClick(index)}
                    key={index}
                    css={styles.boxHeader}>
                    <MdRemoveCircleOutline color="#EB0F0A" size={23} />
                  </div>
                )}
                <div>
                  <label htmlFor="key">Title</label>
                  <input
                    type="text"
                    id="key"
                    name="key"
                    onChange={(e) => handleAddMoreChange(e, index)}
                    placeholder="Enter Title"
                    css={styles.inputBox}
                  />
                </div>
                <div style={{ position: "relative" }}>
                  <label htmlFor="options">Amount</label>
                  <div css={styles.inputStyle}>
                    <Select
                      id="options"
                      name="options"
                      onChange={(selected) =>
                        handleAddMoreChange(selected.value, index)
                      }
                      options={options}
                      styles={selectBoxStyle}
                      components={{
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null,
                        DropdownIndicator,
                      }}
                      isClearable={false}
                    />
                    <input
                      type="text"
                      id="value"
                      name="value"
                      placeholder="0.00"
                      onChange={(e) => handleAddMoreChange(e, index)}
                      style={{
                        marginTop: "-35px",
                        marginLeft: "100px",
                        position: "absolute",
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        <div css={styles.addMoreAction} onClick={handleAddMoreClick}>
          <div css={styles.actionBtn}>
            <FaPlus color={"#293991"} />
          </div>
          <span>Add More</span>
        </div>
      </div>
      <div css={styles.btnContainer}>
        <button
          css={styles.cancelBtn}
          type="button"
          onClick={() => router.push("/payslip/Admin")}>
          Cancel
        </button>
        <button css={styles.createBtn} type="submit">
          Add
        </button>
      </div>
    </form>
  );
};

export default CreatePayslip;
const selectBoxStyle = {
  singleValue: (styles, { data }) => {
    return {
      ...styles,
    };
  },
  menu: (provided, state) => ({
    ...provided,
    width: "100%",
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    padding: "0",
  }),
  control: (base) => ({
    ...base,
    outline: "none",
    background: "none",
    fontSize: "14px",
    height: "10px",
    paddingLeft: "9px",
    color: "var(--primary-font)",
    fontWeight: "400",
    display: "flex",
    border: "none",
  }),
};
const styles = {
  wrapper: css`
    margin: 10px;
  `,
  container: css`
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    min-height: 60vh;
    max-height: 62vh;
    overflow: auto;
    label {
      color: #37474f;
      font-size: 16px;
      font-weight: 600;
    }
  `,
  dateContent: css`
    display: flex;
    justify-content: space-between;
    gap: 3px;
    @media (max-width: 345px) {
      flex-direction: column;
    }
    .react-datepicker__current-month {
      color: #000;
      font-weiht: 700;
      font-size: 16px;
    }
    .react-datepicker {
      span {
        color: #000;
        font-weiht: 700;
        font-size: 16px;
      }
    }
    .react-datepicker__triangle {
      display: none;
    }
    .react-datepicker__navigation-icon--next {
      top: 11px;
      left: -10px;
      font-size: 16px;
      color: #000;
    }
    .react-datepicker__navigation-icon--previous {
      top: 11px;
      left: 5px;
      font-size: 16px;
      border-color: #000;
    }
    .react-datepicker__year-read-view--down-arrow {
      top: 7px;
      font-size: 16px;
      border-color: #000;
    }
    label {
      justify-content: center;
      align-items: center;
      cursor: pointer;
      border-radius: 8px;
      background: var(--white);
      box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.2);
      padding: 5px 10px;
      gap: 7px;
      width: 100%;
    }
    div {
      color: #37474f;
      font-size: 16px;
      font-weight: 600;
      line-height: 30px;
      font-family: Open Sans;
    }
    input {
      border: none;
      background: none;
      width: 95px;
      :focus {
        outline: none;
        border: none;
      }
      ::placeholder {
        color: var(--darker-gray);
        font-size: 13px;
        font-weight: 400;
        line-height: normal;
      }
    }
  `,
  selectUserStyle: css`
    margin-top: 20px;
    .css-3w2yfm-ValueContainer,
    .css-13cymwt-control,
    .css-1p3m7a8-multiValue {
      display: flex;
      flex-direction: row !important;
      justify-content: start !important;
    }
    .css-13cymwt-control {
      border-left: none;
      border-right: none;
      border-top: none;
      flex-wrap: nowrap !important;
      outline: none !important;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    .css-t3ipsp-control {
      flex-wrap: nowrap !important;
      flex-direction: row;
    }
    .css-1p3m7a8-multiValue {
      border-radius: 9px;
      background-color: rgba(0, 171, 209, 0.1);
    }
    .css-1fdsijx-ValueContainer {
      align-items: start;
      justify-content: start !important;
    }
  `,
  inputStyle: css`
    padding: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    .css-b62m3t-container {
      width: 70px;
    }
    b {
      font-size: 14px;
      color: #2f4858;
    }
    div {
      flex-direction: column;
    }
    input {
      border: none;
      outline: none;
      margin-left: 18px;
    }
  `,
  btnContainer: css`
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    justify-content: space-evenly;
  `,
  cancelBtn: css`
    border-radius: 10px;
    padding: 5px 50px;
    border: 1px solid #a0aec0;
    color: #a0aec0;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.08),
      0px 4px 6px 0px rgba(50, 50, 93, 0.11);
  `,
  createBtn: css`
    border-radius: 10px;
    padding: 5px 50px;
    color: var(--white);
    background: var(--primary);
    border: none;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.08),
      0px 4px 6px 0px rgba(50, 50, 93, 0.11);
  `,
  addMoreAction: css`
    display: flex;
    gap: 9px;
    margin-top: 9px;
    span {
      font-size: 18px;
      font-weight: 600;
      margin-top: 9px;
    }
  `,
  actionBtn: css`
    border-radius: 5px;
    color: #fff;
    width: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #e3f3ff;
    cursor: pointer;
    padding: 0px;
    margin-top: 3px;
    border: none;
    font-weight: 700;
  `,
  box: css`
    border-radius: 8px;
    margin-top: 15px;
    border: 1px solid #a0aec0;
    background: var(--white);
    padding: 9px;
    h6 {
      color: #4d4d4d;
      text-align: center;
      font-size: 16px;
      font-weight: 600;
    }
  `,
  boxHeader: css`
    display: flex;
    margin-left: auto;
    justify-content: end;
  `,
  inputBox: css`
    display: flex;
    flex-drection: row;
    padding: 6px;
    border: none;
    width: 100%;
    outline: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  `,
};
