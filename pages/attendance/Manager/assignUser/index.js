/** @jsxImportSource @emotion/react */
import Layout from "../../../../components/layout/Layout";
import HeaderNoti from "../../../../components/layout/HeaderNoti";
import { css } from "@emotion/react";
import Select, { components } from "react-select";
import { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import SuccessModal from "../../../../components/attendence/SuccessModal";
import { useRouter } from "next/router";
import DatePicker from "react-multi-date-picker";

const AssignUser = () => {
  const router = useRouter();
  const [selectedShiftName, setSelectedShiftName] = useState();
  const [selectedSite, setSelectedSite] = useState();
  const [assignedUsers, setAssignedUsers] = useState();
  const [modal, setModal] = useState(false);
  const today = new Date();
  const tomorrow = new Date();

  tomorrow.setDate(tomorrow.getDate() + 1);
  const [dutyDates, setDutyDates] = useState([today, tomorrow]);

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

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
      <HeaderNoti title={"Assign User"} href={"/attendance/Manager"} />
      <div css={styles.container}>
        <form css={styles.formStyle}>
          <div css={styles.datePickerStyle}>
            <label>
              Date <span>*</span>
            </label>
            <DatePicker
              multiple
              value={dutyDates}
              onChange={setDutyDates}
              className="custom-calendar"
              format="DD/MM/YYYY"
            />
          </div>
          <div>
            <label>Site Name</label>
            <Select
              id="site_name"
              name="site_name"
              value={selectedSite}
              options={options}
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
          <div>
            <label>Shift Name</label>
            <Select
              id="shift_name"
              name="shift_name"
              value={selectedShiftName}
              options={options}
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
          <div>
            <label>Assign User</label>
            <Select
              id="assign_user"
              name="assign_user"
              value={assignedUsers}
              options={options}
              styles={selectBoxStyle}
              components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null,
                DropdownIndicator,
              }}
              isMulti
              isClearable={false}
            />
          </div>
        </form>
      </div>
      <div css={styles.btns}>
        <div onClick={() => router.push("/attendance/Manager")}>Cancel</div>
        <div
          style={{ background: "#293991", color: "#fff" }}
          onClick={() => setModal(true)}>
          Assign
        </div>
      </div>
      <SuccessModal isOpen={modal} setModal={setModal} />
    </Layout>
  );
};

export default AssignUser;

const selectBoxStyle = {
  singleValue: (styles, { data }) => {
    return {
      ...styles,
    };
  },
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      padding: "5px",
      height: "80px",
      borderRadius: "9px",
      backgroundColor: "rgba(0, 171, 209, 0.10)",
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: "#293991",
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: "#293991",
    marginLeft: "auto",
    marginTop: "-35px",
  }),
  menu: (provided, state) => ({
    ...provided,
    width: "100%",
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    padding: "0px",
  }),
  control: (base) => ({
    ...base,
    outline: "none",
    background: "none",
    fontSize: "16px",
    height: "10px",
    paddingLeft: "0px",
    borderTop: "0px",
    borderLeft: "0px",
    borderRight: "0px",
    borderBottom: "2px solid rgba(0, 0, 0, 0.10);",
    color: "var(--primary-font)",
    fontWeight: "400",
    display: "flex",
  }),
};

const styles = {
  container: css`
    border-radius: 8px;
    background: #fff;
    padding: 20px;
    height: 70vh;
    margin: 9px;
  `,
  formStyle: css`
    div {
      display: flex;
      flex-direction: column;
      span {
        color: #ec1c24;
      }
      input {
        border-top: none;
        border-left: none;
        border-right: none;
        border-bottom: 2px solid rgba(0, 0, 0, 0.1);
      }
    }
  `,
  datePickerStyle: css`
    .custom-calendar.rmdp-wrapper,
    .rmdp-container .custom-calendar.ep-arrow::after {
      background-color: #fff;
    }

    .rmdp-calendar {
      width: 30vh;
    }
    .rmdp-input{
      width:100%;
    }
    .rmdp-header div{
      flex-direction: row !important;
      padding:6px;
    }
    .rmdp-week,
    .rmdp-ym, .rmdp-header-values {
      display: flex;
      flex-direction: row !important;
      justify-content: space-evenly;
    }
    div span{
      color:#000 !important;
      display:flex;
      flex-direction:row !important;
      justify-content: space-evenly;
    }
  `,
  btns: css`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 20px;
    div {
      border-radius: 10px;
      border: 1px solid #a0aec0;
      padding: 8px 30px;
    }
  `,
};
