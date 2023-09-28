/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
require("react-datepicker/dist/react-datepicker.css");
import Select, { components } from "react-select";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { AiOutlineFilePdf } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import Image from "next/image";

import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";

const Claims = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const FILE_EXTENSIONS = [".png", ".jpg", ".jpeg"];
  const isImage = FILE_EXTENSIONS.some((extension) =>
    selectedFile?.name?.endsWith(extension)
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const options = [
    { value: "advanceTax", label: "Advance Tax" },
    { value: "airTravelExpense", label: "Air Travel Expense" },
    { value: "automobileExpense", label: "Automobile Expense" },
    { value: "lodging", label: "Lodging" },
    { value: "parking", label: "Parking" },
    { value: "officeSupplies", label: "Office Supplies" },
    { value: "telephoneExpense", label: "Telephone Expense" },
    { value: "employeeAdvance", label: "Employee Advance" },
    { value: "furnitureAndEquipment", label: "Furniture and Equipment" },
  ];

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const CustomOption = ({ children, ...props }) => (
    <div
      style={{ display: "flex", gap: "10px", margin: "0 20px" }}
      {...props.innerProps}
    >
      <input type="checkbox" checked={props.isSelected} />
      {children}
    </div>
  );
  const DropdownIndicator = (props) => {
    return (
      components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>
          <MdOutlineKeyboardArrowDown color={"#2F4858"} size={35} />
        </components.DropdownIndicator>
      )
    );
  };

  return (
    <Layout>
      <div css={styles.wrapper}>
        <HeaderNoti title={"Claims"} href={"/home"} />
        <div css={styles.bodyContainer}>
          <div>
            <div css={styles.formContent}>
              <div className="formFlex">
                <div className="d-flex">
                  <label className="primary-text">
                    Expense Date <span>*</span>
                  </label>
                </div>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                />
              </div>

              <div className="formFlex">
                <div className="d-flex">
                  <label className="primary-text">
                    Category <span>*</span>
                  </label>
                </div>
                <Select
                  value={selectedOption}
                  onChange={handleSelectChange}
                  options={options}
                  placeholder="Add or Select Category"
                  isMulti
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
                  <label className="primary-text">
                    Amount <span>*</span>
                  </label>
                </div>
                <label>
                  <span style={{ color: "#000", paddingRight: "30px" }}>
                    SGD
                  </span>
                  <input
                    type={"number"}
                    className="secondary-text"
                    placeholder="0.00"
                  />
                </label>
              </div>
              <div className="formFlex">
                <div className="d-flex">
                  <label className="primary-text">Purpose</label>
                </div>
                <input type={"text"} className="secondary-text" />
              </div>
              <div className="formFlex">
                <div>
                  <label className="primary-text">Attach Documents</label>
                  <div css={styles.attchBox}>
                    {selectedFile && (
                      <div css={styles.imageContainer}>
                        {isImage ? (
                          <Image
                            src={URL.createObjectURL(selectedFile)}
                            alt="Selected"
                            css={styles.selectedImage}
                          />
                        ) : (
                          <div css={styles.fileIconContainer}>
                            <AiOutlineFilePdf color={"#1E3C72"} size={80} />
                          </div>
                        )}

                        <div onClick={handleRemoveFile} css={styles.closeIcon}>
                          <IoCloseSharp size={20} color="#F6302B" />
                        </div>
                      </div>
                    )}
                    {!selectedFile && (
                      <label css={styles.attachBtn}>
                        Browse Picture
                        <input
                          type="file"
                          accept={`application/pdf, image/*`}
                          onChange={handleFileChange}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div css={styles.actionButton}>
              <button
                css={styles.cancelBtn}
                onClick={() => router.push("/claims")}
              >
                Cancel
              </button>
              <button
                css={styles.addBtn}
                onClick={() => router.push("/claims/expenseRequestStatus")}
              >
                Add to report
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Claims;

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
  }),
  option: (styles, { isDisabled }) => {
    return {
      ...styles,
      color: "#37474F",
      cursor: "pointer",
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
    @media (max-width: 1400px) {
      margin: 20px 20px 50px;
    }
    @media (min-width: 1400px) {
      margin: 30px 30px 50px;
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
    padding: 0px 20px 50px;
    .formFlex {
      display: flex;
      flex-direction: column;
      padding-top: 10px;
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
  actionButton: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 30px;
    button {
      border-radius: 10px;
      padding: 7px 20px;
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
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
  attchBox: css`
    border: 2px dashed #ccc;
    padding: 30px;
    margin-bottom: 20px;
    width: 100%;
    margin-top: 10px;
    justify-content: start;
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    border: 2px dashed #d6e2ea;
    background: var(--white);
    box-shadow: 0px 4px 4px 0px rgba(117, 139, 154, 0.08);
  `,
  attachBtn: css`
    display: inline-block;
    padding: 8px 16px;
    font-weight: bold;
    color: #5e72e4;
    font-weight: 600;
    font-size: 16px;
    text-align: center;
    text-decoration: underline;
    cursor: pointer;
    border: none;
    background: none;
    outline: none;

    input {
      display: none;
    }
  `,
  selectedImage: css`
    width: 125px;
    height: 130px;
    border-radius: 16px;
    background: #e3f3ff;
  `,
  imageContainer: css`
    position: relative;
    justify-content: start;
  `,
  closeIcon: css`
    position: absolute;
    top: 0;
    right: 50px;
    cursor: pointer;
    padding: 0;

    @media (min-width: 440px) {
      left: 10%;
    }
  `,
  fileIconContainer: css`
    width: 125px;
    height: 130px;
    display: grid;
    place-items: center;
    border-radius: 16px;
    background: #e3f3ff;
  `,
};
