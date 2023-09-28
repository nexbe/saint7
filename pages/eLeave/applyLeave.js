/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
require("react-datepicker/dist/react-datepicker.css");
import Select, { components } from "react-select";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BiCalendarAlt } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";

import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";

const ApplyLeave = () => {
  const haldDayOptions = [
    { value: "firstHalf", label: "First Half (AM)" },
    { value: "secondHalf", label: "Second Half (PM)" },
  ];
  const sendRequestOptions = [
    { value: "all", label: "All" },
    { value: "admin", label: "Ken Ling (Admin)" },
    { value: "manager1", label: "John Smith (Manager)" },
    { value: "manager2", label: "Thin Thin (Manager)" },
  ];
  const leaveTypeOptions = [
    { value: "annual", label: "Annual Leave (Vacation Leave)" },
    { value: "sick", label: "Sick Leave" },
    { value: "maternity", label: "Maternity Leave" },
    { value: "paternity", label: "Paternity Leave" },
    { value: "parental", label: "Parental Leave" },
    { value: "bereavement", label: "Bereavement Leave" },
    { value: "compensatory", label: "Compensatory Time Off (Comp Time)" },
    { value: "unpaid", label: "Unpaid Leave" },
    { value: "educational", label: "Educational Leave" },
    { value: "juryDuty", label: "Jury Duty Leave" },
    { value: "military", label: "Military Leave" },
    { value: "sabbatical", label: "Sabbatical Leave" },
    { value: "emergency", label: "Emergency Leave" },
    { value: "family", label: "Family and Medical Leave Act (FMLA) Leave" },
  ];
  const router = useRouter();
  const [chosenType, setChosenType] = useState(null);
  const [checkHalfDay, setCheckHalfDay] = useState(false);
  const [selectedHalfDayOption, setSelectedHalfDayOption] = useState(
    haldDayOptions[0]
  );
  const [selectedLeaveTypeOption, setSelectedLeaveTypeOption] = useState();
  const [selectedSendRequestOption, setSelectedSendRequestOption] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };
  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleSelectHalfDayChange = (selectedOption) => {
    setSelectedHalfDayOption(selectedOption);
  };
  const handleSelectLeaveTypeChange = (selectedOption) => {
    setSelectedLeaveTypeOption(selectedOption);
  };
  const handleSendRequestChange = (selectedOption) => {
    setSelectedSendRequestOption(selectedOption);
  };

  const CustomOption = ({ children, ...props }) => (
    <div css={styles.selectBoxOptions} {...props.innerProps}>
      <input type="checkbox" checked={props.isSelected} />
      {children}
    </div>
  );
  const DropdownIndicator = (props) => {
    return (
      components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>
          <MdOutlineKeyboardArrowDown color={"#2F4858"} size={25} />
        </components.DropdownIndicator>
      )
    );
  };

  return (
    <Layout>
      <div css={styles.wrapper}>
        <HeaderNoti title={"Apply Leave"} href={"/home"} />
        <div css={styles.bodyContainer}>
          <div>
            <div css={styles.formContent}>
              <div className="formFlex" style={{ border: "none" }}>
                <div css={styles.dateContent}>
                  <div className="secondary-text">
                    Start Date
                    <label className="d-flex">
                      <BiCalendarAlt size={20} />
                      <DatePicker
                        selected={startDate}
                        onChange={handleStartDateChange}
                        dateFormat="MMM / dd / yy"
                      />
                    </label>
                  </div>
                  <span>
                    <BsArrowRight color="black" />
                  </span>
                  <div className="secondary-text">
                    End Date
                    <label className="d-flex">
                      <BiCalendarAlt size={20} />
                      <DatePicker
                        selected={endDate}
                        onChange={handleEndDateChange}
                        dateFormat="MMM / dd / yy"
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="formFlex" style={{ border: "none" }}>
                <div className="d-flex">
                  <label css={styles.radioLabel} className="secondary-text">
                    <input
                      type="radio"
                      name="fullDay"
                      value="fullDay"
                      css={styles.radioInput}
                      onChange={(event) =>
                        setChosenType(event.currentTarget.value)
                      }
                      checked={chosenType == "fullDay"}
                      onClick={() => {
                        setCheckHalfDay(false);
                      }}
                    />
                    <span
                      style={{
                        color:
                          !!chosenType && !checkHalfDay
                            ? "var(--primary)"
                            : "var(--darker-gray)",
                      }}
                    >
                      Full Day
                    </span>
                  </label>
                  <label css={styles.radioLabel} className="secondary-text">
                    <input
                      type="radio"
                      name="halfDay"
                      value="halfDay"
                      css={styles.radioInput}
                      onChange={(event) =>
                        setChosenType(event.currentTarget.value)
                      }
                      checked={chosenType == "halfDay"}
                      onClick={() => {
                        setCheckHalfDay(true);
                      }}
                    />
                    <span
                      style={{
                        color:
                          !!chosenType && checkHalfDay
                            ? "var(--primary)"
                            : "var(--darker-gray)",
                      }}
                    >
                      Half Day
                    </span>
                  </label>
                </div>
              </div>
              {checkHalfDay && (
                <div className="formFlex">
                  <div className="d-flex">
                    <label className="secondary-text">Half Day Options</label>
                  </div>
                  <Select
                    value={selectedHalfDayOption}
                    onChange={handleSelectHalfDayChange}
                    options={haldDayOptions}
                    placeholder="Add or Select Category"
                    styles={selectBoxStyle}
                    components={{
                      DropdownIndicator: () => null,
                      IndicatorSeparator: () => null,
                      DropdownIndicator,
                      Option: CustomOption,
                    }}
                    isClearable={false}
                  />
                </div>
              )}
              <div className="formFlex">
                <div className="d-flex">
                  <label className="secondary-text">No of Days</label>
                </div>
                <label>
                  <input
                    type={"number"}
                    className="secondary-text"
                    placeholder="0"
                    defaultValue={checkHalfDay ? 0.5 : 0}
                  />
                </label>
              </div>
              <div className="formFlex">
                <div className="d-flex">
                  <label className="secondary-text">Leave Types</label>
                </div>
                <Select
                  value={selectedLeaveTypeOption}
                  onChange={handleSelectLeaveTypeChange}
                  options={leaveTypeOptions}
                  placeholder="Select leave type"
                  styles={selectBoxStyle}
                  components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                    DropdownIndicator,
                    Option: CustomOption,
                  }}
                  isClearable={false}
                />
              </div>
              <div className="formFlex">
                <div className="d-flex">
                  <label className="secondary-text">Remaining Leaves</label>
                </div>
                <label>
                  <input
                    type={"number"}
                    className="secondary-text"
                    placeholder=""
                  />
                </label>
              </div>
              <div className="formFlex">
                <div className="d-flex">
                  <label className="secondary-text">Leave Reason</label>
                </div>
                <input type={"text"} className="secondary-text" />
              </div>
              <div className="formFlex">
                <div className="d-flex">
                  <label className="secondary-text">
                    Send Request To (For Approval)
                  </label>
                </div>
                <Select
                  value={selectedSendRequestOption}
                  onChange={handleSendRequestChange}
                  options={sendRequestOptions}
                  placeholder="Please select"
                  styles={selectBoxStyle}
                  isMulti
                  components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                    DropdownIndicator,
                    Option: CustomOption,
                  }}
                  isClearable={false}
                />
              </div>
            </div>
            <div css={styles.actionButton}>
              <button
                css={styles.cancelBtn}
                onClick={() => router.push("/eLeave")}
              >
                Cancel
              </button>
              <button
                css={styles.addBtn}
                onClick={() => router.push("/eLeave/leaveHistory")}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ApplyLeave;

const selectBoxStyle = {
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "rgba(0, 0, 0, 0.30)",
      fontWeight: "600",
      fontSize: "14px",
      marginLeft: "-5px",
    };
  },
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: "rgba(0, 171, 209, 0.10)",
      borderRadius: "10px",
    };
  },
  menu: (provided, state) => ({
    ...provided,
    width: "100%",
    outline: "none",
  }),

  control: (base) => ({
    ...base,
    border: "none",
    outline: "none",
    backgroundColor: "none",
    fontSize: "14px",
    height: "10px",
    color: "var(--primary-font)",
    fontWeight: "400",
    marginLeft: "-5px",
  }),
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
      margin: 20px;
    }
    @media (min-width: 1400px) {
      margin: 30px;
    }
    svg {
      cursor: pointer;
    }
  `,
  formContent: css`
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    background: var(--white);
    padding: 5px 20px 30px;
    line-height: 20px;
    .formFlex {
      display: flex;
      flex-direction: column;
      padding-top: 20px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      span {
        color: #ec1c24;
      }
      input {
        border: none;
        outline: none;
      }
    }
  `,
  dateContent: css`
    display: flex;
     justify-content: space-between;
    padding; 10px;
    gap: 3px;
    
    @media (max-width: 345px) {
        background: red;
        flex-direction: column;
      }
    span {
        display: flex;
    justify-content: center;
      align-items: center;
      margin-top: 30px;
    }
    label {
      justify-content: center;
      align-items: center;
      cursor: pointer;
      border-radius: 8px;
      background: var(--white);
      box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.2);
      padding: 3px 10px;
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
      width: 85px;
      font-size: 14px;
      font-weight: 400;
      :focus {
        outline: none;
        border: none;
      }
      ::placeholder {
        color: var(--darker-gray);
        font-size: 10px;
        font-weight: 400;
        line-height: normal;
      }
    }
  `,
  radioLabel: css`
    cursor: pointer;
    margin-right: 16px;
    align-items: center;
    display: inline-flex;
  `,
  radioInput: css`
    width: 15px;
    height: 15px;
    cursor: pointer;
    margin-right: 10px;
    align-items: center;
  `,
  selectBox: css`
    border: none;
    background: red;
  `,
  selectBoxOptions: css`
    display: flex;
    gap: 10px;
    margin: 0 20px;
    line-height: 20px;
    font-size: 13px;
    color: #37474f;
  `,
  actionButton: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
    button {
      border-radius: 10px;
      padding: 0 40px;
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      min-width: 120px;
      box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.08),
        0px 4px 6px 0px rgba(50, 50, 93, 0.11);
    }
  `,
  cancelBtn: css`
    border: 1px solid rgba(160, 174, 192, 1);
    color: var(--dark-gray);
  `,
  addBtn: css`
    border: none;
    color: var(--white);
    background: var(--primary);
  `,
};
