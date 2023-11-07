/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { useApolloClient } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
require("react-datepicker/dist/react-datepicker.css");
import Select, { components } from "react-select";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BiCalendarAlt } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";

import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";
import userStore from "../../store/user";
import authStore from "../../store/auth";
import leavestore from "../../store/eLeave";
import { CREATE_LEAVE } from "../../graphql/mutations/eLeave";

const ApplyLeave = () => {
  const haldDayOptions = [
    { value: "Firsthalf", label: "First Half (AM)" },
    { value: "Secondhalf", label: "Second Half (PM)" },
  ];
  const leaveTypeOptions = [
    { value: "Annual_Leave", label: "Annual Leave (Vacation Leave)" },
    { value: "Sick_Leave", label: "Sick Leave" },
    { value: "Maternity_Leave", label: "Maternity Leave" },
    { value: "Paternity_Leave", label: "Paternity Leave" },
    { value: "Parental_Leave", label: "Parental Leave" },
    { value: "Bereavement_Leave", label: "Bereavement Leave" },
    {
      value: "Compensatory_Time_Off",
      label: "Compensatory Time Off (Comp Time)",
    },
    { value: "Unpaid_Leave", label: "Unpaid Leave" },
    { value: "Educational_Leave", label: "Educational Leave" },
    { value: "Jury_Duty_Leave", label: "Jury Duty Leave" },
    { value: "Military_Leave", label: "Military Leave" },
    { value: "Sabbatical_Leave", label: "Sabbatical Leave" },
    { value: "Emergency_Leave", label: "Emergency Leave" },
    {
      value: "Leave_Act_FMLA_Leave",
      label: "Family and Medical Leave Act (FMLA) Leave",
    },
  ];
  const router = useRouter();
  const apolloClient = useApolloClient();
  const {
    register,
    reset,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const { getAllUsers, UserInfo: userInfo } = userStore((state) => state);
  const { user } = authStore((state) => state);
  const { createLeave } = leavestore((state) => state);
  const [createLeaveAction, errCreateLeave] = useMutation(CREATE_LEAVE);
  const [chosenType, setChosenType] = useState("Fullday");
  const [checkHalfDay, setCheckHalfDay] = useState(false);
  const [selectedHalfDayOption, setSelectedHalfDayOption] = useState(
    haldDayOptions[0]
  );
  const [selectedLeaveTypeOption, setSelectedLeaveTypeOption] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [refetch, setRefetch] = useState(1);
  const [requestTosOptionList, setRequestTosOptionList] = useState();
  const [selectedRequestTosOptions, setSelectedRequestTosOptions] = useState();
  const [numOfDay, setNumOfDay] = useState(1);
  const [saveAction, setSaveAction] = useState(false);

  useEffect(() => {
    getAllUsers({
      apolloClient,
      where: {},
    });
  }, [user]);

  const calculateNumOfMaxDays = (startDate, endDate) => {
    const totalDays = dayjs(endDate).date() - dayjs(startDate).date() + 1;
    let numOfDays = 0;
    if (totalDays >= 7) {
      numOfDays = parseInt(totalDays / 7) * 5 + (totalDays % 7);
      if (new Date(endDate).getDay() == 6) numOfDays = numOfDays - 1;
      if (new Date(endDate).getDay() == 0) numOfDays = numOfDays - 2;
      if (
        new Date(startDate).getDay() > new Date(endDate).getDay() &&
        new Date(endDate).getDay() != 0 &&
        startDate.getDay() - endDate.getDay() > 1
      ) {
        numOfDays = numOfDays - 2;
      }
    } else {
      numOfDays =
        new Date(startDate).getDay() > new Date(endDate).getDay()
          ? 6 - new Date(startDate).getDay() + new Date(endDate).getDay()
          : new Date(endDate).getDay() == 6
          ? dayjs(endDate).date() - dayjs(startDate).date()
          : dayjs(endDate).date() - dayjs(startDate).date() + 1;
    }
    return numOfDays;
  };

  const calculateNumOfDays = useCallback(async () => {
    if (
      (endDate == null || new Date(endDate) < new Date(startDate)) &&
      refetch != 1
    ) {
      setEndDate(startDate);
    }

    let totalDays = 0;
    let numOfDays = 0;
    if (dayjs(endDate).isSame(dayjs(startDate), "month")) {
      numOfDays = calculateNumOfMaxDays(startDate, endDate);
    } else if (dayjs(endDate).isAfter(dayjs(startDate), "month")) {
      totalDays =
        dayjs(startDate).daysInMonth() -
        dayjs(startDate).date() +
        dayjs(endDate).date() +
        1;

      if (totalDays > 7) {
        numOfDays = parseInt(totalDays / 7) * 5 + (totalDays % 7);
        if (new Date(endDate).getDay() == 6) numOfDays = numOfDays - 1;
        else if (new Date(endDate).getDay() == 0 && totalDays % 7 != 0)
          numOfDays = numOfDays - 2;
        else if (
          new Date(startDate).getDay() > new Date(endDate).getDay() &&
          new Date(endDate).getDay() != 0 &&
          startDate.getDay() - endDate.getDay() > 1
        ) {
          numOfDays = numOfDays - 2;
        }
      } else {
        numOfDays =
          new Date(startDate).getDay() > new Date(endDate).getDay()
            ? 6 - new Date(startDate).getDay() + new Date(endDate).getDay()
            : new Date(endDate).getDay() == 6
            ? dayjs(startDate).daysInMonth() -
              dayjs(startDate).date() +
              dayjs(endDate).date()
            : dayjs(startDate).daysInMonth() -
              dayjs(startDate).date() +
              dayjs(endDate).date() +
              1;
      }
    }

    setNumOfDay(numOfDays);
  }, [startDate, endDate]);

  const requestTosOption = async () => {
    const options = [];
    userInfo?.map((users) => {
      if (
        users?.role?.name == "Admin" ||
        (users?.role?.name == "Manager" && users?.id != user?.id)
      ) {
        options.push({
          value: parseInt(users?.id),
          label: users?.username + " (" + users?.role?.name + ")",
        });
      }
    });
    setRequestTosOptionList(options);
  };

  const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
          />{" "}
          <label>{props.label}</label>
        </components.Option>
      </div>
    );
  };

  const ValueContainer = ({ children, hasValue, ...props }) => {
    if (!hasValue) {
      return (
        <components.ValueContainer {...props}>
          {children}
        </components.ValueContainer>
      );
    }
    const [chips, otherChildren] = children;
    const CHIPS_LIMIT = 1;
    const overflowCounter = chips.slice(CHIPS_LIMIT).length;
    const displayChips = chips.slice(
      overflowCounter,
      overflowCounter + CHIPS_LIMIT
    );
    return (
      <components.ValueContainer {...props}>
        <div
          style={{
            display: "flex",
            width: "100%",
            color: "#293991",
          }}
        >
          {displayChips.map((displayChip, index) => (
            <label style={{ color: "#293991", width: "80%" }} key={index}>
              {displayChip}
            </label>
          ))}
          {overflowCounter === 0 ? (
            ""
          ) : (
            <label style={{ color: "#293991" }}>{`+ ${overflowCounter}`}</label>
          )}
        </div>
      </components.ValueContainer>
    );
  };
  const handleRequestTosSelect = (data) => {
    setSelectedRequestTosOptions(data);
  };

  useEffect(() => {
    requestTosOption();
    calculateNumOfDays();
  }, [userInfo, calculateNumOfDays, checkHalfDay, errors]);

  const handleSelectHalfDayChange = (selectedOption) => {
    setSelectedHalfDayOption(selectedOption);
  };
  const handleSelectLeaveTypeChange = (selectedOption) => {
    setSelectedLeaveTypeOption(selectedOption);
  };

  const DropdownIndicator = (props) => {
    return (
      components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>
          <MdOutlineKeyboardArrowDown color={"#2F4858"} size={25} />
        </components.DropdownIndicator>
      )
    );
  };

  const onSubmit = async (data) => {
    if (!!saveAction) {
      await createLeave({
        createLeaveAction,
        data: {
          from: dayjs(startDate).locale("en-US").format("YYYY-MM-DD"),
          to: dayjs(endDate).locale("en-US").format("YYYY-MM-DD"),
          status: "Pending",
          reason: data.reason,
          numberOfDays: chosenType === "Halfday" ? 0.5 : numOfDay,
          leaveDuration: chosenType,
          leaveType: selectedLeaveTypeOption?.value,
          halfdayOptions: selectedHalfDayOption?.value,
          users_permissions_user: user?.id,
          requestedTos: selectedRequestTosOptions?.map((eachRequest) => {
            return +eachRequest?.value;
          }),
          publishedAt: new Date().toISOString(),
        },
      });
      router.push({
        pathname: "/eLeave/leaveHistory",
        query: {
          userId: user?.id,
          message: "Success!",
          label: "Your leave request has been successfully sent.",
        },
      });
    }
  };

  return (
    <Layout>
      <div css={styles.wrapper}>
        <HeaderNoti title={"Apply Leave"} href={"/eLeave"} />
        <div css={styles.bodyContainer}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div css={styles.formContent}>
              <div className="formFlex" style={{ border: "none" }}>
                <div css={styles.dateContent}>
                  <div className="secondary-text">
                    Start Date
                    <label className="d-flex">
                      <BiCalendarAlt size={20} />
                      <DatePicker
                        selected={startDate}
                        minDate={new Date()}
                        shouldCloseOnSelect={true}
                        onChange={(date) => {
                          setStartDate(date);
                          checkHalfDay === true || date > endDate
                            ? setEndDate(date)
                            : "";
                        }}
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
                        minDate={startDate}
                        shouldCloseOnSelect={true}
                        onChange={(date) => {
                          checkHalfDay === false
                            ? setEndDate(date)
                            : setEndDate(startDate);
                        }}
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
                      name="Fullday"
                      value="Fullday"
                      css={styles.radioInput}
                      onChange={(event) =>
                        setChosenType(event.currentTarget.value)
                      }
                      checked={chosenType == "Fullday"}
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
                      name="Halfday"
                      value="Halfday"
                      css={styles.radioInput}
                      onChange={(event) =>
                        setChosenType(event.currentTarget.value)
                      }
                      checked={chosenType == "Halfday"}
                      onClick={() => {
                        setCheckHalfDay(true);
                        setEndDate(startDate);
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
                    readOnly={true}
                    value={checkHalfDay ? 0.5 : numOfDay}
                  />
                </label>
              </div>
              <div className="formFlex">
                <div className="d-flex">
                  <label className="secondary-text">Leave Types</label>
                </div>

                <Select
                  minMenuHeight={10}
                  value={selectedLeaveTypeOption}
                  onChange={handleSelectLeaveTypeChange}
                  options={leaveTypeOptions}
                  placeholder="Select leave type"
                  styles={selectBoxStyle}
                  components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                    DropdownIndicator,
                  }}
                  isClearable={false}
                />
              </div>
              {/* <div className="formFlex">
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
              </div> */}
              <div className="formFlex">
                <div className="d-flex">
                  <label className="secondary-text">Leave Reason</label>
                </div>
                <input
                  type={"text"}
                  className="secondary-text"
                  {...register("reason", {
                    required: false,
                  })}
                />
              </div>
              <div className="formFlex">
                <div className="d-flex">
                  <label className="secondary-text">
                    Send Request To (For Approval)
                  </label>
                </div>
                <Select
                  isMulti
                  allowSelectAll={true}
                  placeholder="Please select"
                  closeMenuOnSelect={false}
                  hideSelectedOptions={false}
                  options={requestTosOptionList}
                  components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                    DropdownIndicator,
                    Option,
                    ValueContainer,
                  }}
                  value={selectedRequestTosOptions}
                  onChange={handleRequestTosSelect}
                  styles={selectBoxStyle}
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
                onClick={() => {
                  setSaveAction(true);
                }}
              >
                Apply
              </button>
            </div>
          </form>
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
    };
  },
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: "rgba(0, 171, 209, 0.10)",
      borderRadius: "10px",
      color: "#293991",
      width: "100%",
      display: "flex",
    };
  },
  singleValue: (styles, { data }) => {
    return {
      ...styles,
    };
  },
  menu: (provided, state) => ({
    ...provided,
    width: "100%",
    maxHeight: "150px",
    overflowY: "scroll",
    outline: "none",
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    padding: "0",
  }),
  control: (base) => ({
    ...base,
    border: "none",
    outline: "none",
    background: "none",
    fontSize: "14px",
    height: "10px",
    color: "var(--primary-font)",
    fontWeight: "400",
    display: "flex",
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
    .react-datepicker__triangle {
        display: none;
      }
      .react-datepicker__navigation-icon--next {
        top: -4px;
       left: -10px;
      }
      .react-datepicker__navigation-icon--previous {
        top: -4px;
        left: 10px;
        
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
