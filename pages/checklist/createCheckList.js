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
import moment from "moment";

const CreateCheckList = () => {
  const [fileList, setFileList] = useState([]);
  const [equipFileList, setEquipFileList] = useState([]);
  const { fetchSopTypes, sopTypes } = sopStore();
  const [selectedSopType, setSelectedSopTypes] = useState([]);
  const [typedValue, setTypedValue] = useState("");
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
  const { createCheckList, errorCreateCheckList } = siteCheckListStore();
  const { createSopType } = sopStore();
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    dateVisited: moment().format("YYYY-MM-DD"),
    timeVisited: "",
    visitedBy: "",
    sop: [],
    equipment: [],
    suggestions: "",
    guardOnDuty: "",
    remarks: "",
    reasonForProperUniform: "",
    actionTakenForProperUniform: "",
    actionTakenForWelfare: "",
    createdUser: user?.id,
  });

  const createNewSopType = async (e) => {
    e.preventDefault();
    if (typedValue) {
      await createSopType(
        {
          data: {
            name: typedValue,
          },
        },
        user?.jwt
      );
     await fetchSopTypes(user?.jwt);
    }
    setTypedValue('')
  };

  useEffect(() => {
    fetchSopTypes(user?.jwt);
  }, []);

  const handleSOPTypeChange = (selected, index) => {
    const updatedSopTypes = [...selectedSopType];
    updatedSopTypes[index] = selected;
    setSelectedSopTypes(updatedSopTypes);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSopInputChange = (inputValue) => {
    setTypedValue(inputValue);
  };

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
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

  const SelectMenuButton = (props) => {
    return (
      <components.MenuList {...props}>
        {props.children}
        <button css={styles.createSopBtn} onClick={createNewSopType}>
          <span css={styles.actionBtn}>
            <FaPlus color={"#293991"} size={15} />
          </span>
          Add New Sop Type
        </button>
      </components.MenuList>
    );
  };

  const onSOPChange = async (e, index) => {
    const selectedFiles = [...e.target.files];
    const uploadedFiles = {};

    for (let file of selectedFiles) {
      uploadedFiles[index] = file;
    }
    const updatedFileLists = [...fileList];
    updatedFileLists[index] = uploadedFiles;
    setFileList(updatedFileLists);
  };

  const handleSOPFileListChange = (files, index) => {
    const updatedFileLists = [...fileList];
    updatedFileLists[index] = files;
    setFileList(updatedFileLists);
  };

  const handleEquipFileListChange = (files, index) => {
    const updatedFileLists = [...equipFileList];
    updatedFileLists[index] = files;
    setEquipFileList(updatedFileLists);
  };

  const onEquipChange = async (e, index) => {
    const selectedFiles = [...e.target.files];
    const uploadedFiles = {};
    for (let file of selectedFiles) {
      uploadedFiles[index] = file;
    }
    const updatedFileLists = [...equipFileList];
    updatedFileLists[index] = uploadedFiles;
    setEquipFileList(updatedFileLists);
  };
  // sop handler
  const handleSOPAddMoreClick = () => {
    const lastId = sopData[sopData.length - 1]?.id || 0;
    let newRow = {
      id: lastId + 1,
      Name: "",
      Attachments: [],
      sop_type: null,
    };
    setFileList((prevFileLists) => [...prevFileLists, []]);
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
    setEquipFileList((prevFileLists) => [...prevFileLists, []]);
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

  const handleSopChange = async (index, event) => {
    let data = [...sopData];
    data[index][event?.target?.name] = event?.target?.value || event.value;
    const sopType = selectedSopType[index]?.value || null;
    const updatedSop = data.map((sop, i) => {
      if (i === index) {
        return {
          Name: sop.Name,
          id: sop.id,
          sop_type: sopType,
        };
      }
      return sop;
    });

    setFormData({
      ...formData,
      sop: updatedSop,
    });
  };

  const handleEquipChange = (index, event) => {
    let data = [...equipmentData];
    data[index][event?.target?.name || event.label] =
      event?.target?.value || event.value;
    setFormData({
      ...formData,
      equipment: [...data],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let sopFilesArrToSend = [];
    let equpFileArrToSend = [];
    if (fileList) {
      for (const [index, file] of fileListArr.entries()) {
        const formData = new FormData();
        formData.append("files", file[index]);
        await uploadFile(formData).then(async (response) => {
          const json = await response.json();
          if (response.status === 200) {
            sopFilesArrToSend.push(json[0].id);
          }
        });
      }
    }
    const sopResponse = formData?.sop?.map((data, index) => {
      const sopLists = {
        ...data,
        Attachments: sopFilesArrToSend[index],
      };
      return sopLists;
    });
    //for equip docs
    if (equipFileList) {
      for (const [index, file] of equipListArr.entries()) {
        const formData = new FormData();
        formData.append("files", file[index]);
        await uploadFile(formData).then(async (response) => {
          const json = await response.json();
          if (response.status === 200) {
            equpFileArrToSend.push(json[0].id);
          }
        });
      }
    }

    const equipResponse = formData?.equipment?.map((data, index) => {
      const equipLists = {
        ...data,
        Attachments: equpFileArrToSend[index],
      };
      return equipLists;
    });
    console.log(formData);
    if (formData) {
      await createCheckList(
        {
          data: {
            actionTakenForProperUniform: formData?.actionTakenForProperUniform,
            actionTakenForWelfare: formData?.actionTakenForWelfare,
            createdUser: user?.id,
            dateVisited: formData?.dateVisited,
            equipment: [...equipResponse],
            guardOnDuty: formData?.guardOnDuty,
            location: formData?.location,
            reasonForProperUniform: formData?.reasonForProperUniform,
            remarks: formData?.remarks,
            sop: [...sopResponse],
            suggestions: formData?.suggestions,
            timeVisited: formData?.timeVisited,
            title: formData?.title,
            visitedBy: formData?.visitedBy,
          },
        },
        user?.jwt
      );
      await router.push({
        pathname: `/checklist`,
        query: {
          message: !errorCreateCheckList ? "Success!" : "Apologies!",
          belongTo: !errorCreateCheckList ? "Checklists" : "error",
          action: "create",
          userId: user?.id,
        },
      });
    }
  };
  return (
    <Layout>
      <HeaderNoti title={"Site Checklist"} href={"/checklist"} />
      <form css={styles.bodyContainer} onSubmit={handleSubmit}>
        <div css={styles.inputStyle}>
          <div>
            <label className="secondary-text" htmlFor="title">
              Title <span>*</span>
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
                    selected={
                      formData?.dateVisited
                        ? new Date(formData?.dateVisited)
                        : new Date()
                    }
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
                    selected={
                      formData.timeVisited
                        ? new Date(`2000-01-01T${formData.timeVisited}`)
                        : null
                    }
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
                    <div css={styles.inputStyle}>
                      <div>
                        <label className="secondary-text" htmlFor="Name">
                          Name
                        </label>
                        <input
                          type="text"
                          id="Name"
                          name="Name"
                          value={formData.sop.Name}
                          onChange={(e) => handleSopChange(index, e)}
                          placeholder="Enter SOP name"
                        />
                      </div>
                    </div>
                    <div className="formFlex" style={{ margin: "0 20px" }}>
                      <div className="d-flex">
                        <label className="secondary-text" htmlFor="sop_type">
                          Type
                        </label>
                      </div>
                      <Select
                        id="sop_type"
                        name="sop_type"
                        value={selectedSopType}
                        onChange={(e) => handleSOPTypeChange(e, index)}
                        onInputChange={handleSopInputChange}
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
                          MenuList: SelectMenuButton,
                        }}
                        isClearable={false}
                      />
                    </div>
                    {fileList &&
                    fileList[index] &&
                    Object?.keys(fileList[index]).length > 0 ? (
                      <UploadedFiles
                        fileList={fileList[index]}
                        setFileList={(files) =>
                          handleSOPFileListChange(files, index)
                        }
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
                    {/* <div className="formFlex">
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
                      
                    </div> */}
                    <div css={styles.inputStyle}>
                      <div>
                        <label className="secondary-text" htmlFor="Name">
                          Name
                        </label>
                        <input
                          className="secondary-text"
                          type="text"
                          id="Name"
                          name="Name"
                          value={formData.equipment.Name}
                          onChange={(e) => handleEquipChange(index, e)}
                          placeholder="Enter Equipment name"
                        />
                      </div>
                    </div>
                    {/* <div className="formFlex">
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
                    </div> */}
                    <div css={styles.inputStyle}>
                      <div>
                        <label className="secondary-text" htmlFor="Remarks">
                          Remarks
                        </label>
                        <input
                          type="text"
                          id="Remarks"
                          name="Remarks"
                          value={formData.equipment.Remarks}
                          onChange={(e) => handleEquipChange(index, e)}
                          className="secondary-text"
                        />
                      </div>
                    </div>
                    {equipFileList &&
                    equipFileList[index] &&
                    Object?.keys(equipFileList[index]).length > 0 ? (
                      <UploadedFiles
                        fileList={equipFileList[index]}
                        setFileList={(files) =>
                          handleEquipFileListChange(files, index)
                        }
                      />
                    ) : (
                      <div>
                        <Upload onChange={(e) => onEquipChange(e, index)} />
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
                  htmlFor="reasonForProperUniform"
                >
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
                  htmlFor="actionTakenForProperUniform"
                >
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
                  htmlFor="actionTakenForWelfare"
                >
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
            onClick={() => router.push("/checklist")}
          >
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
    max-height: 76vh;
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
    gap: 20px;

    @media (max-width: 450px) {
      flex-direction: column;
    }
    label {
      justify-content: center;
      align-items: center;
      cursor: pointer;
      border-radius: 8px;
      background: #fff;
      border: 1px solid #718096;
      padding: 20px 10px;
      gap: 7px;
      height: 50px;
      width: 170px;
      @media (max-width: 450px) {
        width: 100%;
        justify-content: start;
      }
    }
    .react-datepicker__input-container {
      width: 80%;
      background: transparent !important;
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
    margin-top: 3px;
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
    justify-content: space-between;
    padding: 0 20px;
  `,
  cancelBtn: css`
    border-radius: 10px;
    padding: 5px 50px;
    border: 1px solid #293991;
    color: #293991;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.08),
      0px 4px 6px 0px rgba(50, 50, 93, 0.11);

    height: 46px;
    font-size: 18px;
    font-family: "Inter";
    font-weight: 700;
  `,
  createBtn: css`
    border-radius: 10px;
    padding: 5px 50px;
    color: var(--white);
    background: var(--primary);
    border: none;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.08),
      0px 4px 6px 0px rgba(50, 50, 93, 0.11);

    font-size: 18px;
    font-family: "Inter";
    font-weight: 700;
  `,
  createSopBtn: css`
    border: none;
    display: flex;
    background: #fff;
    width: 100%;
    padding: 5px;
    margin: auto;
    flex-direction: row;
    box-shadow: 1px -4px 8px 0px rgba(0, 0, 0, 0.08);
    border-radius: 0px 0px 10px 10px;
    justify-content: center;
    gap: 9px;
    text-align: center;
    color: var(--primary);
    font-size: 18px;
    font-weight: 600;
  `,
};
