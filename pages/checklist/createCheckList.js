/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
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

const CreateCheckList = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [fileList, setFileList] = useState([]);
  let fileListArr = _.entries(fileList);
  const [equipFileList, setEquipFileList] = useState([]);
  let equipListArr = _.entries(equipFileList);

  const SOPOptions = [
    { value: "value 2", label: "value 2" },
    { value: "value 3", label: "value 3" },
  ];
  const [selectedSOP, setSelectedSOP] = useState(SOPOptions[0]);
  const [sopData, setSopData] = useState([{ id: 1, name: "sop" }]);
  const [equipmentData, setEquipmentData] = useState([{ id: 1, name: "euip" }]);

  const handleSelectSOPChange = (selectedOption) => {
    setSelectedSOP(selectedOption);
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

  const onSOPChange = async (e) => {
    const selectedFiles = [...e.target.files];
    const uploadedFiles = {};

    for (let file of selectedFiles) {
      uploadedFiles[0] = file;
    }

    setFileList({ ...fileList, ...uploadedFiles });
  };

  const onEquipChange = async (e) => {
    const selectedFiles = [...e.target.files];
    const uploadedFiles = {};

    for (let file of selectedFiles) {
      uploadedFiles[0] = file;
    }

    setEquipFileList({ ...fileList, ...uploadedFiles });
  };

  // sop handler
  const handleSOPAddMoreClick = () => {
    const lastId = sopData[sopData.length - 1]?.id || 0;
    setSopData((prevBoxes) => [
      ...prevBoxes,
      { id: lastId + 1, name: `sop ${prevBoxes.length + 1}` },
    ]);
  };
  const handleSOPDeleteClick = (id) => {
    setSopData((prevData) => prevData.filter((sop) => sop.id !== id));
  };

  // equipment handler
  const handleEquipAddMoreClick = () => {
    const lastId = equipmentData[equipmentData.length - 1]?.id || 0;
    setEquipmentData((prevBoxes) => [
      ...prevBoxes,
      { id: lastId + 1, name: `equip ${prevBoxes.length + 1}` },
    ]);
  };
  const handleEquipDeleteClick = (id) => {
    setEquipmentData((prevData) => prevData.filter((equip) => equip.id !== id));
  };
  // console.log(equipmentData)

  return (
    <Layout>
      <HeaderNoti title={"Site Checklist"} href={"/checklist"} />
      <form css={styles.bodyContainer}>
        <div css={styles.inputStyle}>
          <div>
            <label className="secondary-text">
              Tilte <span>*</span>
            </label>
            <input type="text" name="title" id="title" required />
          </div>
          <div>
            <label className="secondary-text">
              Location <span>*</span>
            </label>
            <textarea name="location" id="location" required />
          </div>
        </div>
        <div css={styles.formContent}>
          <div className="formFlex" style={{ border: "none" }}>
            <div css={styles.dateContent}>
              <div className="secondary-text">
                Date Visited <span>*</span>
                <label className="d-flex">
                  <BiCalendarAlt size={20} />
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="MMM / dd / yy"
                  />
                </label>
              </div>
              <div className="secondary-text">
                Time Visited <span>*</span>
                <label className="d-flex">
                  <ClockIcon size={20} />
                  <DatePicker
                    selected={time}
                    onChange={(date) => setTime(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    dateFormat="h:mm:ss"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div css={styles.inputStyle}>
          <div>
            <label className="secondary-text">
              Visited By <span>*</span>
            </label>
            <input type="text" name="visited" id="visited" required />
          </div>
        </div>
        <div style={{ margin: "0px 20px 0px 20px" }}>
          <label className="secondary-text">
            SOP <span style={{ color: "#ec1c24" }}>*</span>
          </label>
          {/* sop */}
          <div css={styles.box}>
            {sopData &&
              sopData.map((data) => {
                return (
                  <div key={data.id}>
                    {sopData && sopData.length > 1 && (
                      <div css={styles.boxHeader}>
                        <h6 style={{ margin: 0, flex: 1 }}>SOP - {data.id}</h6>
                        <div onClick={() => handleSOPDeleteClick(data.id)}>
                          <MdRemoveCircleOutline color="#EB0F0A" size={23} />
                        </div>
                      </div>
                    )}
                    <div className="formFlex">
                      <div className="d-flex">
                        <label className="secondary-text">Name</label>
                      </div>
                      <label>
                        <input
                          type="text"
                          id="name"
                          className="secondary-text"
                          css={styles.inputBox}
                        />
                      </label>
                    </div>
                    <div className="formFlex">
                      <div className="d-flex">
                        <label className="secondary-text">Type</label>
                      </div>
                      <Select
                        id="sop"
                        value={selectedSOP}
                        onChange={handleSelectSOPChange}
                        options={SOPOptions}
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
                        <Upload onChange={onSOPChange} />
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
          <label className="secondary-text">
            Equipment <span style={{ color: "#ec1c24" }}>*</span>
          </label>
          {/* EQUIPMENT */}
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
                        <div onClick={() => handleEquipDeleteClick(data.id)}>
                          <MdRemoveCircleOutline color="#EB0F0A" size={23} />
                        </div>
                      </div>
                    )}
                    <div className="formFlex">
                      <div className="d-flex">
                        <label className="secondary-text">Name</label>
                      </div>
                      <label>
                        <input
                          type="text"
                          id="name"
                          className="secondary-text"
                          placeholder="Enter Equipment name"
                          css={styles.inputBox}
                        />
                      </label>
                    </div>
                    <div className="formFlex">
                      <div className="d-flex">
                        <label className="secondary-text">Remarks</label>
                      </div>
                      <label>
                        <input
                          type="text"
                          id="Remarks"
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
                        <Upload onChange={onEquipChange} />
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
                <label className="secondary-text">Reason</label>
                <input
                  type="text"
                  name="reason"
                  id="reason"
                  placeholder="Enter reason"
                />
              </div>
            </div>
            <div css={styles.inputStyle}>
              <div>
                <label className="secondary-text">Action Taken</label>
                <input type="text" name="action-taken" id="action-taken" />
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
                <label className="secondary-text">Action Taken</label>
                <input type="text" name="action-taken" id="action-taken" />
              </div>
            </div>
          </div>
        </div>
        {/* comment */}
        <div css={styles.inputStyle}>
          <div>
            <label className="secondary-text">
              Comments on Improvement/Suggestions
            </label>
            <input type="text" name="comments" id="comments" />
          </div>
        </div>
        <div css={styles.inputStyle}>
          <div>
            <label className="secondary-text">Guards on Duty at Site</label>
            <input type="text" name="duty" id="duty" />
          </div>
        </div>
        <div css={styles.inputStyle}>
          <div>
            <label className="secondary-text">Remarks</label>
            <input type="text" name="remarks" id="remarks" />
          </div>
        </div>
        <div css={styles.btnContainer}>
          <button css={styles.cancelBtn}>Cancel</button>
          <button css={styles.createBtn}>Create</button>
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
    border:1px solid #A0AEC0;
    color: #A0AEC0;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.08), 0px 4px 6px 0px rgba(50, 50, 93, 0.11);
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
