/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";
import { css } from "@emotion/react";
import DatePicker from "react-datepicker";
require("react-datepicker/dist/react-datepicker.css");
import { BiCalendarAlt } from "react-icons/bi";
import ClockIcon from "../../public/icons/clockIcon";
import Select, { components } from "react-select";
import {
  MdOutlineKeyboardArrowDown,
  MdRemoveCircleOutline,
} from "react-icons/md";
import { UploadedFiles } from "../../components/upload/uploadFiles";
import { Upload } from "../../components/upload/uploadFile";
import { uploadFile } from "../../components/upload/upload";
import _ from "lodash";
import { FaPlus } from "react-icons/fa";
import sopStore from "../../store/sop";
import useAuth from "../../store/auth";
import { useRouter } from "next/router";
import siteCheckListStore from "../../store/siteCheckList";

const CreateCheckList = () => {
  const [fileList, setFileList] = useState([]);
  const [equipFileList, setEquipFileList] = useState([]);
  const { fetchSopTypes, sopTypes } = sopStore();
  const [selectedSopType, setSelectedSopTypes] = useState();
  const [sopData, setSopData] = useState([
    {
      id: 1,
      Name: "",
      Attachments: "",
      sop_type: "",
    },
  ]);
  const [equipmentData, setEquipmentData] = useState([
    {
      id: 1,
      Name: "",
      Remarks: "",
      Attachments: "",
    },
  ]);
  const { user } = useAuth();
  const router = useRouter();
  let equipListArr = _.values(equipFileList);
  let fileListArr = _.values(fileList);
  const { createCheckList,errorCreateCheckList } = siteCheckListStore();
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    dateVisited: '',
    timeVisited: "",
    visitedBy: "",
    sop: "",
    equipment: "",
    suggestions: "",
    guardOnDuty: "",
    remarks: "",
    reasonForProperUniform: "",
    actionTakenForProperUniform: "",
    actionTakenForWelfare: "",
    createdUser: user?.id,
  });

  useEffect(() => {
    fetchSopTypes(user?.jwt);
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
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

  const onSOPChange = async (e, index) => {
    const selectedFiles = [...e.target.files];
    const uploadedFiles = {};

    for (let file of selectedFiles) {
      uploadedFiles[index] = file;
    }
    setFileList({ ...fileList, ...uploadedFiles });
  };

  const onEquipChange = async (e, index) => {
    const selectedFiles = [...e.target?.files];
    const uploadedFiles = {};

    for (let file of selectedFiles) {
      uploadedFiles[index] = file;
    }
    setEquipFileList({ ...equipFileList, ...uploadedFiles });
  };

  // sop handler
  const handleSOPAddMoreClick = () => {
    const lastId = sopData[sopData.length - 1]?.id || 0;
    let newRow = {
      id: lastId + 1,
      Name: "",
      Attachments: "",
      sop_type: "",
    };
    setSopData((prevBoxes) => [...prevBoxes, newRow]);
  };
  const handleSOPDeleteClick = (index) => {
    let data = [...sopData];
    data.splice(index, 1);
    setSopData(data);
  };

  // equipment handler
  const handleEquipAddMoreClick = () => {
    const lastId = equipmentData[equipmentData.length - 1]?.id || 0;
    let newRow = {
      id: lastId + 1,
      Name: "",
      Remarks: "",
      Attachments: [],
    };
    setEquipmentData((prevBoxes) => [...prevBoxes, newRow]);
  };
  const handleEquipDeleteClick = (index) => {
    let data = [...equipmentData];
    data.splice(index, 1);
    setEquipmentData(data);
  };
  const handleTimeChange = (time) => {
    setFormData({
      ...formData,
      timeVisited: time,
    });
  };
  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      dateVisited: date,
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSopChange = (index, event) => {
    let data = [...sopData];
    console.log(event)
    data[index][event?.target?.name ] =
      event?.target?.value || event.value;
      
    const attachments = fileList[index] || [];
    data[index].Attachments = attachments;
    data[index].sop_type = ''
    
    setFormData({
      ...formData,
      sop: [
        ...data,
      ],
    });
  };

  const handleEquipChange = (index, event) => {
    let data = [...equipmentData];
    data[index][event?.target?.name || event.label] =
    event?.target?.value || event.value

    const attachments = equipFileList[index] || [];
    data[index].Attachments = attachments;
    
    setFormData({
      ...formData,
      equipment: [
        ...data,
      ],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (formData) {
      createCheckList(formData, user?.jwt);
      router.push({
        pathname: `/checklist`,
        query: {
          message: !errorCreateCheckList ? "Success!" : "Apologies!",
          belongTo: !errorCreateCheckList ? "Checklists" : "error",
          action: "create",
          userId: user?.id,
        },
      })
    }
  };
  return (
    <Layout>
      <HeaderNoti title={"Site Checklist"} href={"/checklist"} />
      <form css={styles.bodyContainer} onSubmit={handleSubmit}>
        <div css={styles.inputStyle}>
          <div>
            <label className="secondary-text" htmlFor="title">
              Tilte <span>*</span>
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="secondary-text" htmlFor="location">
              Location <span>*</span>
            </label>
            <textarea
              name="location"
              id="location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div css={styles.formContent}>
          <div className="formFlex" style={{ border: "none" }}>
            <div css={styles.dateContent}>
              <div className="secondary-text">
                Date Visited <span>*</span>
                <label className="d-flex" htmlFor="dateVisited">
                  <BiCalendarAlt size={20} />
                  <DatePicker
                    name="dateVisited"
                    id="dateVisited"
                    selected={ formData?.dateVisited ? new Date(formData?.dateVisited) : new Date()  }
                    onChange={(date) => {
                      const formattedDate = formatDate(date);
                      handleDateChange(formattedDate);
                    }}
                    dateFormat="yyyy-MM-dd"
                  />
                </label>
              </div>
              <div className="secondary-text">
                Time Visited <span>*</span>
                <label className="d-flex">
                  <ClockIcon size={20} />
                  <DatePicker
                    selected={formData.timeVisited ? new Date(`2000-01-01T${formData.timeVisited}`) : null}
                    onChange={(time) => {
                      const formattedDate = formatTime(time);
                      handleTimeChange(formattedDate);
                    }}
                    showTimeSelect
                    showTimeSelectOnly
                    dateFormat="HH:mm:ss"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div css={styles.inputStyle}>
          <div>
            <label className="secondary-text" htmlFor="visitedBy">
              Visited By <span>*</span>
            </label>
            <input
              type="text"
              name="visitedBy"
              id="visitedBy"
              value={formData.visitedBy}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div style={{ margin: "0px 20px 0px 20px" }}>
          <label className="secondary-text">
            SOP <span style={{ color: "#ec1c24" }}>*</span>
          </label>
          {/* sop */}
          <div css={styles.box}>
            {sopData &&
              sopData.map((data, index) => {
                return (
                  <div key={data.id}>
                    {sopData && sopData.length > 1 && (
                      <div css={styles.boxHeader}>
                        <h6 style={{ margin: 0, flex: 1 }}>SOP - {data.id}</h6>
                        <div onClick={() => handleSOPDeleteClick(index)}>
                          <MdRemoveCircleOutline color="#EB0F0A" size={23} />
                        </div>
                      </div>
                    )}
                    <div className="formFlex">
                      <div className="d-flex">
                        <label className="secondary-text" htmlFor="Name">
                          Name <span style={{ color: "#ec1c24" }}>*</span>
                        </label>
                      </div>
                      <label>
                        <input
                          type="text"
                          id="Name"
                          name="Name"
                          value={formData.sop.Name}
                          onChange={(e) => handleSopChange(index, e)}
                          className="secondary-text"
                          css={styles.inputBox}
                          required
                        />
                      </label>
                    </div>
                    <div className="formFlex">
                      <div className="d-flex">
                        <label className="secondary-text" htmlFor="sop_type">
                          Type
                        </label>
                      </div>
                      <Select
                        id="sop_type"
                        name="sop_type"
                        value={selectedSopType}
                        onChange={(e) => handleSopChange(index, e)}
                        options={sopTypes?.map((data) => {
                          return {
                            value: data.id,
                            label: data.attributes.name,
                          };
                        })}
                        placeholder="Add or Select SOP type"
                        styles={selectBoxStyle}
                        components={{
                          DropdownIndicator: () => null,
                          IndicatorSeparator: () => null,
                          DropdownIndicator,
                        }}
                        isClearable={false}
                      />
                    </div>
                    {fileListArr?.length > 0 ? (
                      <UploadedFiles
                        fileList={fileList}
                        setFileList={setFileList}
                      />
                    ) : (
                      <div>
                        <Upload onChange={(e) => onSOPChange(e, index)} />
                      </div>
                    )}
                    {sopData && sopData.length > 1 && <hr />}
                  </div>
                );
              })}
            <div css={styles.addMoreAction} onClick={handleSOPAddMoreClick}>
              <div css={styles.actionBtn}>
                <FaPlus color={"#293991"} />
              </div>
              <span>Add More SOP</span>
            </div>
          </div>
        </div>
        {/* EQUIPMENT */}
        <div style={{ margin: "0px 20px 0px 20px" }}>
          <label className="secondary-text">Equipment</label>
          <div css={styles.box}>
            {equipmentData &&
              equipmentData.map((data, index) => {
                return (
                  <div key={data.id}>
                    {equipmentData && equipmentData.length > 1 && (
                      <div css={styles.boxHeader}>
                        <h6 style={{ margin: 0, flex: 1 }}>
                          Equipment - {data.id}
                        </h6>
                        <div onClick={() => handleEquipDeleteClick(index)}>
                          <MdRemoveCircleOutline color="#EB0F0A" size={23} />
                        </div>
                      </div>
                    )}
                    <div className="formFlex">
                      <div className="d-flex">
                        <label className="secondary-text" htmlFor="Name">
                          Name
                        </label>
                      </div>
                      <label>
                        <input
                          type="text"
                          id="Name"
                          name="Name"
                          value={formData.equipment.Name}
                          onChange={(e) => handleEquipChange(index, e)}
                          className="secondary-text"
                          placeholder="Enter Equipment name"
                          css={styles.inputBox}
                        />
                      </label>
                    </div>
                    <div className="formFlex">
                      <div className="d-flex">
                        <label className="secondary-text" htmlFor="Remarks">
                          Remarks
                        </label>
                      </div>
                      <label>
                        <input
                          type="text"
                          id="Remarks"
                          name="Remarks"
                          value={formData.equipment.Remarks}
                          onChange={(e) => handleEquipChange(index, e)}
                          className="secondary-text"
                          css={styles.inputBox}
                        />
                      </label>
                    </div>

                    {equipListArr?.length > 0 ? (
                      <UploadedFiles
                        fileList={equipFileList}
                        setFileList={setEquipFileList}
                      />
                    ) : (
                      <div>
                        <Upload onChange={(e) => onEquipChange(e, index)} belongTo={"checklist"} />
                      </div>
                    )}
                    {equipmentData && equipmentData.length > 1 && <hr />}
                  </div>
                );
              })}
            <div css={styles.addMoreAction} onClick={handleEquipAddMoreClick}>
              <div css={styles.actionBtn}>
                <FaPlus color={"#293991"} />
              </div>
              <span>Add More Equipment</span>
            </div>
          </div>
        </div>
        {/* uniform */}
        <div style={{ margin: "0px 20px 0px 20px" }}>
          <label className="secondary-text">
            All officers are in proper uniforms.
          </label>
          <div css={styles.box}>
            <div css={styles.inputStyle}>
              <div>
                <label
                  className="secondary-text"
                  htmlFor="reasonForProperUniform">
                  Reason
                </label>
                <input
                  type="text"
                  name="reasonForProperUniform"
                  id="reasonForProperUniform"
                  value={formData.reasonForProperUniform}
                  onChange={handleInputChange}
                  placeholder="Enter reason"
                />
              </div>
            </div>
            <div css={styles.inputStyle}>
              <div>
                <label
                  className="secondary-text"
                  htmlFor="actionTakenForProperUniform">
                  Action Taken
                </label>
                <input
                  type="text"
                  name="actionTakenForProperUniform"
                  id="actionTakenForProperUniform"
                  value={formData.actionTakenForProperUniform}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Presence */}
        <div style={{ margin: "0px 20px 0px 20px" }}>
          <label className="secondary-text">
            Presence of Welfare at site.(eg. Kettle, fan etc.)
          </label>
          <div css={styles.box}>
            <div css={styles.inputStyle}>
              <div>
                <label
                  className="secondary-text"
                  htmlFor="actionTakenForWelfare">
                  Action Taken
                </label>
                <input
                  type="text"
                  name="actionTakenForWelfare"
                  id="actionTakenForWelfare"
                  value={formData.actionTakenForWelfare}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        {/* comment */}
        <div css={styles.inputStyle}>
          <div>
            <label className="secondary-text" htmlFor="suggestions">
              Comments on Improvement/Suggestions
            </label>
            <input
              type="text"
              name="suggestions"
              id="suggestions"
              value={formData.suggestions}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div css={styles.inputStyle}>
          <div>
            <label className="secondary-text" htmlFor="guardOnDuty">
              Guards on Duty at Site
            </label>
            <input
              type="text"
              name="guardOnDuty"
              id="guardOnDuty"
              value={formData.guardOnDuty}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div css={styles.inputStyle}>
          <div>
            <label className="secondary-text" htmlFor="remarks">
              Remarks
            </label>
            <input
              type="text"
              name="remarks"
              id="remarks"
              value={formData.remarks}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div css={styles.btnContainer}>
          <button
            css={styles.cancelBtn}
            onClick={() => router.push("/checklist")}>
            Cancel
          </button>
          <button css={styles.createBtn} type="submit">
            Create
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default CreateCheckList;

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
  }),
};

const styles = {
  inputStyle: css`
    div {
      display: flex;
      flex-direction: column;
      margin: 0px 20px 0px 20px;
      padding-bottom: 10px;
      gap: 9px;
    }

    span {
      color: #ec1c24;
    }

    input,
    textarea {
      border-radius: 5px;
      border: 1px solid #718096;
      background: var(--white);
      padding: 9px;
    }
  `,
  inputBox: css`
    border-radius: 5px;
    border: 1px solid #718096;
    background: var(--white);
    padding: 9px;
    width: 160%;
  `,
  bodyContainer: css`
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 6px;
    overflow-y: auto;
    overflow-x: hidden;
    gap: 12px;
    max-height: 78vh;
    overflow-y: scroll;
  `,
  formContent: css`
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    padding: 9px 20px 30px;
    line-height: 20px;

    .formFlex {
      display: flex;
      flex-direction: column;
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
    gap: 3px;

    @media (max-width: 345px) {
      flex-direction: column;
    }
    label {
      justify-content: center;
      align-items: center;
      cursor: pointer;
      border-radius: 8px;
      background: var(--white);
      border: 1px solid #718096;
      padding: 3px 10px;
      gap: 7px;
      height: 50px;
      width: 167px;
    }
  `,
  box: css`
    border-radius: 5px;
    border: 1px solid #718096;
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
    flex-direction: row;
    align-items: center;
  `,
  actionBtn: css`
    border-radius: 5px;
    color: #fff;
    width: 9%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #e3f3ff;
    cursor: pointer;
    padding: 5px;
    border: none;
    font-weight: 700;
  `,
  addMoreAction: css`
    display: flex;
    gap: 9px;
    span {
      font-size: 14px;
      font-weight: 600;
      margin-top: 9px;
    }
  `,
  btnContainer: css`
    display: flex;
    flex-direction: row;
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
};
