/** @jsxImportSource @emotion/react */
import Layout from "../../../../components/layout/Layout";
import HeaderNoti from "../../../../components/layout/HeaderNoti";
import { css } from "@emotion/react";
import Select, { components } from "react-select";
import { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import SuccessModal from "../../../../components/attendence/SuccessModal";
import { useRouter } from "next/router";
import DatePicker from "react-multi-date-picker";
import siteStore from "../../../../store/sites";
import shiftStore from "../../../../store/shift";
import { useApolloClient } from "@apollo/client";
import userStore from "../../../../store/user";
import attendenceStore from "../../../../store/attendance";

const AssignUser = () => {
  const router = useRouter();
  const apolloClient = useApolloClient();
  const { getAllUsers, UserInfo: userInfo } = userStore((state) => state);
  const [selectedShiftName, setSelectedShiftName] = useState();
  const [selectedSite, setSelectedSite] = useState();
  const [assignedUsers, setAssignedUsers] = useState();
  const [assignedUsersCount, setAssignedUsersCount] = useState();
  const [modal, setModal] = useState(false);
  const { sites, getSites } = siteStore();
  const { shifts, getShifts } = shiftStore();
  const { createAssignedUser } = attendenceStore();
  const [dutyDates, setDutyDates] = useState([]);
  useEffect(() => {
    getSites();
    getShifts();
    getAllUsers({
      apolloClient,
      where: {},
    });
  }, []);

  useEffect(() => {
    const assingnedUserLists = [];
    if (assignedUsers) {
      assignedUsers?.map((user) => {
        return assingnedUserLists.push(`${user.value}`);
      });
    }
    setAssignedUsersCount(assingnedUserLists.length);
  }, [assignedUsers]);

  const handleSiteChange = (selectedOption) => {
    setSelectedSite(selectedOption);
  };

  const handleShiftsChange = (selectedOption) => {
    setSelectedShiftName(selectedOption);
  };

  const handleUsersChange = (selectedOption) => {
    setAssignedUsers(selectedOption);
  };
  //console.log(selectedShiftName.value,selectedSite.value,assignedUsers,dutyDates)
  const siteOptions = sites?.map((eachOption) => ({
    value: eachOption?.id,
    label: eachOption?.attributes?.name,
  }));

  const shiftsOptions = shifts?.map((eachOption) => ({
    value: eachOption?.id,
    label: eachOption?.attributes?.title,
  }));

  const userOptions = userInfo?.filter((eachOption) => eachOption?.role?.name === "guard")
  ?.map((eachOption) => ({
    value: eachOption?.id,
    label: eachOption?.username,
  }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dates = [];
    const assingnedUserLists = [];

    if (dutyDates) {
      dutyDates?.map((date) => {
        const formattedDay = String(date.day).padStart(2, "0");
        const formattedMonth = String(date.month).padStart(2, "0");
        return dates.push(`${date.year}-${formattedMonth}-${formattedDay}`);
      });
    }
    if (assignedUsers) {
      assignedUsers?.map((user) => {
        return assingnedUserLists.push(`${user.value}`);
      });
    }
    if (assingnedUserLists && dates) {
      createAssignedUser({
        data: {
          dates: dates,
          site: selectedSite?.value,
          shift: selectedShiftName?.value,
          users: assingnedUserLists,
        },
      });
      setModal(false);
      router.push("/attendance/Manager");
    }
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

  const ValueContainer = ({ children, hasValue, ...props }) => {
    if (!hasValue) {
      return (
        <components.ValueContainer {...props}>
          {children}
        </components.ValueContainer>
      );
    }
    const [chips, otherChildren] = children;
    const CHIPS_LIMIT = 11;
    const overflowCounter = chips.slice(CHIPS_LIMIT).length;
    const displayChips = chips.slice(
      overflowCounter,
      overflowCounter + CHIPS_LIMIT
    );
    return (
      <components.ValueContainer {...props}>
        <div>
          {displayChips?.map((displayChip, index) => (
            <label key={index}>{displayChip}</label>
          ))}
          {overflowCounter === 0 ? (
            ""
          ) : (
            <label
              style={{
                color: "#293991",
                borderRadius: "9px",
                background: "rgba(0, 171, 209, 0.1)",
                padding: "3px",
                fontSize: "12px",
                fontWeight: 400,
              }}
            >{`+ ${overflowCounter}`}</label>
          )}
        </div>
      </components.ValueContainer>
    );
  };

  return (
    <Layout>
      <HeaderNoti title={"Assign User"} href={"/attendance/Manager"} />
      <div css={styles.container}>
        <form css={styles.formContent}>
          <div css={styles.datePickerStyle} className="formFlex">
            <label>
              Date <span>*</span>
            </label>
            <DatePicker
              multiple
              value={dutyDates}
              onChange={setDutyDates}
              format="DD/MM/YYYY"
              inputClass="custom-calendar"
              required
            />
          </div>
          <div style={{ marginTop: "15px" }}>
            <label>Site Name</label>
            <Select
              id="site_name"
              name="site_name"
              onChange={handleSiteChange}
              value={selectedSite}
              options={siteOptions}
              placeholder="Select Site"
              styles={selectBoxStyle}
              components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null,
                DropdownIndicator,
              }}
              isClearable={false}
            />
          </div>
          <div className="formFlex">
            <label>Shift Name</label>
            <Select
              id="shift_name"
              name="shift_name"
              onChange={handleShiftsChange}
              value={selectedShiftName}
              options={shiftsOptions}
              placeholder="Select Shift"
              styles={selectBoxStyle}
              components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null,
                DropdownIndicator,
              }}
              isClearable={false}
            />
          </div>
          <div css={styles.selectUserStyle}>
            <label>Assign User</label>
            <Select
              id="assign_user"
              name="assign_user"
              onChange={handleUsersChange}
              value={assignedUsers}
              options={userOptions}
              blurInputOnSelect={false}
              closeMenuOnSelect={false}
              components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null,
                DropdownIndicator,
                ValueContainer,
              }}
              isMulti
              isClearable={false}
            />
          </div>
        </form>
      </div>
      <div css={styles.btns}>
        <button
          onClick={() => router.push("/attendance/Manager")}
          css={styles.cancelBtn}
        >
          Cancel
        </button>
        <button
          disabled={dutyDates?.length === 0}
          css={styles.addBtn}
          onClick={() => setModal(true)}
        >
          Assign
        </button>
      </div>
      <SuccessModal
        isOpen={modal}
        setModal={setModal}
        handleSubmit={handleSubmit}
        count={assignedUsersCount}
      />
    </Layout>
  );
};

export default AssignUser;

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
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
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
  container: css`
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    height: 78%;
    label {
      color: #37474f;
      font-size: 16px;
      font-weight: 600;
    }
  `,
  formContent: css`
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    background: var(--white);
    padding: 5px 20px 30px;
    line-height: 20px;
    span {
      color: #ec1c24;
    }
    .formFlex {
      display: flex;
      flex-direction: column;
      padding-top: 20px;
      input {
        border-top: none;
        border-left: none;
        border-right: none;
        outline: none !important;
        padding: 7px 0;
        width: 100%;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }
    }
  `,
  datePickerStyle: css`
    .custom-calendar.rmdp-wrapper,
    .rmdp-container .custom-calendar.ep-arrow::after {
      background-color: #fff;
    }
    .rmdp-calendar {
      width: 100%;
    }
    .rmdp-input {
      width: 100%;
    }
    .rmdp-header div {
      flex-direction: row !important;
      padding: 6px;
    }
    .rmdp-week,
    .rmdp-ym,
    .rmdp-header-values {
      display: flex;
      flex-direction: row !important;
      justify-content: space-evenly;
    }
    div span {
      color: #000 !important;
      display: flex;
      flex-direction: row !important;
      justify-content: space-evenly;
    }
  `,
  btns: css`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    padding: 20px;
    gap: 7px;
    button {
      text-align: center;
      border-radius: 10px;
      padding: 3px 55px;
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      min-width: 120px;
    }
  `,
  cancelBtn: css`
    border: 1px solid rgba(41, 57, 145, 1);
    color: var(--primary);
    background: var(--white);
  `,
  addBtn: css`
    border: 1px solid rgba(41, 57, 145, 1);
    color: var(--white);
    background: var(--primary);
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
    .css-wsp0cs-MultiValueGeneric {
      color: var(--Primary, #293991);
      font-size: 12px;
      font-weight: 400;
    }
    .css-tj5bde-Svg {
      color: var(--Primary, #293991);
    }
    .css-1jbwqn3-ValueContainer {
      align-items: start;
      flex-direction: row;
      outline: none !important;
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
      width: 96%;
    }
  `,
};
