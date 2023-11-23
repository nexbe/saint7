/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useApolloClient, useMutation } from "@apollo/client";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
require("react-datepicker/dist/react-datepicker.css");
import Select, { components } from "react-select";
import CreatableSelect from "react-select/creatable";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BiCalendarAlt } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
let isBetween = require("dayjs/plugin/isBetween");

import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";
import userStore from "../../store/user";
import authStore from "../../store/auth";
import leavestore from "../../store/eLeave";
import leaveTypeStore from "../../store/leaveType";
import { CREATE_LEAVE } from "../../graphql/mutations/eLeave";
import { CREATE_LEAVE_TYPE } from "../../graphql/mutations/leaveType";

const ApplyLeave = () => {
  dayjs.extend(isBetween);
  const haldDayOptions = [
    { value: "Firsthalf", label: "First Half (AM)" },
    { value: "Secondhalf", label: "Second Half (PM)" },
  ];

  const router = useRouter();
  const apolloClient = useApolloClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    getAllLeaves,
    LeaveInfo: leaveInfo,
    createLeave,
  } = leavestore((state) => state);
  const {
    getAllLeaveTypes,
    LeaveTypeInfo: leaveTypeInfo,
    createLeaveType,
  } = leaveTypeStore((state) => state);
  const { getAllUsers, UserInfo: userInfo } = userStore((state) => state);
  const { user } = authStore((state) => state);
  const [createLeaveAction, errCreateLeave] = useMutation(CREATE_LEAVE);
  const [createLeaveTypeAction, errCreateLeaveType] =
    useMutation(CREATE_LEAVE_TYPE);
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
  const [startTaken, setStartTaken] = useState(false);
  const [endTaken, setEndTaken] = useState(false);

  useEffect(() => {
    getAllUsers({
      apolloClient,
      where: {},
    });
    getAllLeaves({
      apolloClient,
      where: { userId: user.id },
    });
  }, [user]);

  useEffect(() => {
    getAllLeaveTypes({
      apolloClient,
      where: {},
    });
  }, []);

  const leaveTypeOptions = leaveTypeInfo?.map((eachLeaveType, index) => {
    return { value: eachLeaveType?.id, label: eachLeaveType?.name };
  });

  const calculateNumOfDays = useCallback(async () => {
    if (
      (endDate == null || new Date(endDate) < new Date(startDate)) &&
      refetch != 1
    ) {
      setEndDate(startDate);
    }
    let totalDays = 0;
    if (dayjs(endDate).isSame(dayjs(startDate), "month")) {
      totalDays = dayjs(endDate).date() - dayjs(startDate).date() + 1;
    } else if (dayjs(endDate).isAfter(dayjs(startDate), "month")) {
      totalDays =
        dayjs(startDate).daysInMonth() -
        dayjs(startDate).date() +
        dayjs(endDate).date() +
        1;
    }

    setNumOfDay(totalDays);
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

  const SelectLeaveTypeMenuButton = (props) => {
    return (
      components.MenuList && (
        <components.MenuList {...props}>
          {props.children}
          <button
            css={styles.editBtn}
            className="primary-text"
            onClick={() => {
              setSaveAction(false);
              addNewLeaveType(props?.focusedOption);
            }}
          >
            <div className="icon">
              <FaPlus size={20} />
            </div>
            Add New Leave Type
          </button>
        </components.MenuList>
      )
    );
  };

  const addNewLeaveType = async (newLeaveType) => {
    await createLeaveType({
      createLeaveTypeAction,
      data: {
        name: newLeaveType?.value,
      },
    });
    setSelectedLeaveTypeOption({
      label: newLeaveType?.value,
      value: newLeaveType?.value,
    });
    getAllLeaveTypes({
      apolloClient,
      where: {},
    });
  };

  const onSubmit = async (data) => {
    if (!!saveAction && !startTaken && !endTaken) {
      await createLeave({
        createLeaveAction,
        data: {
          from: dayjs(startDate).locale("en-US").format("YYYY-MM-DD"),
          to: dayjs(endDate).locale("en-US").format("YYYY-MM-DD"),
          status: "Pending",
          reason: data.reason,
          numberOfDays: chosenType === "Halfday" ? 0.5 : numOfDay,
          leaveDuration: chosenType,
          halfdayOptions: selectedHalfDayOption?.value,
          users_permissions_user: user?.id,
          leaveType: selectedLeaveTypeOption?.value,
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

  const isValidDay = async (dayInput, flag) => {
    let isAlreadyTaken = 0;
    leaveInfo?.map((userLeave) => {
      if (
        dayjs(dayInput).isBetween(
          dayjs(userLeave.from),
          dayjs(userLeave.to),
          "day",
          "[]"
        ) == true ||
        dayjs(userLeave.from).isBetween(
          dayjs(startDate),
          dayjs(endDate),
          "day",
          "[]"
        ) == true ||
        dayjs(userLeave.to).isBetween(
          dayjs(startDate),
          dayjs(endDate),
          "day",
          "[]"
        ) == true
      ) {
        isAlreadyTaken += 1;
      }
    });

    if (flag === "start") {
      if (isAlreadyTaken > 0) {
        setStartTaken(true);
      } else {
        setStartTaken(false);
      }
    } else {
      if (isAlreadyTaken > 0) {
        setEndTaken(true);
      } else {
        setEndTaken(false);
      }
    }
  };

  useEffect(() => {
    if (!startDate && !endDate && !!leaveInfo) {
      setStartTaken(false);
      setEndTaken(false);
    } else {
      isValidDay(startDate, "start");
      isValidDay(endDate, "end");
    }
  }, [startDate, endDate, leaveInfo]);

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
                    <div className="calendar-box">
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
                    </div>
                    {startTaken && (
                      <div className="takenText">Already taken</div>
                    )}
                  </div>
                  <span
                    style={{ marginTop: (startTaken || endTaken) && "-10px" }}
                  >
                    <BsArrowRight color="black" />
                  </span>
                  <div className="secondary-text">
                    End Date
                    <div className="calendar-box">
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
                    </div>
                    {endTaken && <div className="takenText">Already taken</div>}
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
                <CreatableSelect
                  maxMenuHeight={150}
                  value={selectedLeaveTypeOption}
                  onChange={handleSelectLeaveTypeChange}
                  options={leaveTypeOptions}
                  placeholder="Select leave type"
                  styles={selectBoxStyle}
                  isSearchable={true}
                  components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                    DropdownIndicator,
                    MenuList: SelectLeaveTypeMenuButton,
                  }}
                />
              </div>
              <div className="formFlex">
                <div className="d-flex">
                  <label className="secondary-text">Leave Reason</label>
                </div>
                <textarea
                  type="text"
                  id="description"
                  className="secondary-text"
                  rows={3}
                  {...register("reason", {
                    required: false,
                  })}
                />
              </div>
              <div className="formFlex">
                <div className="d-flex">
                  <label className="secondary-text">
                    Send Request To (For Approval) <span>*</span>
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
                  required
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
    // maxHeight: "150px",
    // overflowY: "scroll",
    // outline: "none",
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
      input,
      textarea {
        border: none;
        outline: none;
        padding: 7px 0;
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
    .takenText {
      display: flex;
      color: red;
      font-size: 13px;
      align-items: center;
      justify-content: center;
      padding-top: 7px;
     margin-bottom: -15px;
    }
    .calendar-box {
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
    border: 1px solid rgba(41, 57, 145, 1);
    color: var(--primary);
    background: var(--white);
  `,
  addBtn: css`
    border: none;
    color: var(--white);
    background: var(--primary);
  `,
  editBtn: css`
    display: flex;
    align-items: center;
    gap: 10px;
    border: none;
    border-radius: 0px 0px 6px 6px;
    background: #fff;
    box-shadow: 1px -4px 8px 0px rgba(0, 0, 0, 0.08);
    color: #293991;
    padding: 12px;
    margin-bottom: -4px;
    cursor: pointer;
    width: 100%;
    .icon {
      border-radius: 4px;
      background: #e3f3ff;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 3px;
    }
  `,
};
