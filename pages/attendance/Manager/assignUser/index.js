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
  const [modal, setModal] = useState(false);
  const {sites, getSites} = siteStore();
  const {shifts, getShifts} = shiftStore();
  const { createAssignedUser } = attendenceStore();
  const [dutyDates, setDutyDates] = useState([]);

  useEffect(() => {
    getSites();
    getShifts();
    getAllUsers({
      apolloClient,
      where: {},
    })
  },[])
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

  const userOptions = userInfo?.map((eachOption) => ({
    value: eachOption?.id,
    label: eachOption?.username,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dates = []
    const assingnedUserLists = []
   
    if(dutyDates){
      dutyDates?.map((date)=> {
        const formattedDay = String(date.day).padStart(2, '0');
        const formattedMonth = String(date.month).padStart(2, '0');
        return dates.push(`${date.year}-${formattedMonth}-${formattedDay}`)
      })
    }
    if(assignedUsers){
      assignedUsers?.map((user) => {
        return assingnedUserLists.push(`${user.value}`)
      })
    }
     if(assingnedUserLists){
      createAssignedUser({
        "data": {
          "dates":dates,
          "site":selectedSite?.value,
          "shift":selectedShiftName?.value,
          "users":assingnedUserLists
        }
      })
      setModal(false)
    }
  }
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
          <div style={{marginTop:"15px"}}>
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
          <div style={{marginTop:"15px"}}>
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
      <SuccessModal isOpen={modal} setModal={setModal} handleSubmit={handleSubmit}/>
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
    width:'34vh'
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
    borderBottom: "1px solid rgba(0, 0, 0, 0.10);",
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
    max-height:60vh;
    margin: 9px;
    overflow-y:auto;
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
  selectUserStyle:css`
   margin-top:10px;
  .css-3w2yfm-ValueContainer, .css-13cymwt-control, .css-1p3m7a8-multiValue{
    display:flex;
    flex-direction:row !important;
    justify-content:start !important;
  }
  .css-13cymwt-control{
    border-left:none;
    border-right:none;
    border-top:none;
    flex-wrap:nowrap !important;
    outline: none !important;
    border-bottom:1px solid rgba(0, 0, 0, 0.1);
  }
  .css-t3ipsp-control{
    flex-wrap:nowrap !important;
    flex-direction: row;
  }
  .css-1p3m7a8-multiValue{
    border-radius: 9px;
    background-color: rgba(0, 171, 209, 0.10);
  }
  .css-1fdsijx-ValueContainer{
    align-items:start;
    justify-content:start !important;
  }
  `
};
