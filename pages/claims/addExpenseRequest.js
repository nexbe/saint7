/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
require("react-datepicker/dist/react-datepicker.css");
import Select, { components } from "react-select";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import _ from "lodash";

import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";
import userStore from "../../store/auth";
import claimStore from "../../store/claim";
import { Upload } from "../../components/upload/uploadFile";
import { UploadedFiles } from "../../components/upload/uploadFiles";
import { uploadFile } from "../../components/upload/upload";
import { CREATE_CLAIM } from "../../graphql/mutations/claim";

const Claims = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { user } = userStore((state) => state);
  const { createClaim } = claimStore((state) => state);
  const [createClaimAction, errCreateClaim] = useMutation(CREATE_CLAIM);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState(null);
  const [fileList, setFileList] = useState([]);
  let fileListArr = _.entries(fileList);
  const [saveAction, setSaveAction] = useState(false);

  const categoryOptions = [
    {
      id: 1,
      name: "Advanced Tax",
    },
    {
      id: 2,
      name: "Air Travel Expense",
    },
    {
      id: 3,
      name: "Automobile Expense",
    },
    {
      id: 4,
      name: "Employee Advance",
    },
    {
      id: 5,
      name: "Fuel/Mileage Expense",
    },
    {
      id: 6,
      name: "Furniture and Equipment",
    },
    {
      id: 7,
      name: "IT and Internet Expense",
    },
    {
      id: 8,
      name: "Lodging",
    },
    {
      id: 9,
      name: " Meals and Entertainment",
    },
    {
      id: 10,
      name: "Office Supplies",
    },
    {
      id: 11,
      name: "Air Travel Expense",
    },
    {
      id: 12,
      name: "Telephone Expense",
    },
    {
      id: 13,
      name: "Parking",
    },
  ];

  const options = categoryOptions?.map((eachOption) => ({
    value: eachOption?.id,
    label: eachOption?.name,
  }));

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const DropdownIndicator = (props) => {
    return (
      components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>
          <MdOutlineKeyboardArrowDown color={"#2F4858"} size={35} />
        </components.DropdownIndicator>
      )
    );
  };

  const onChange = async (e) => {
    const selectedFiles = [...e.target.files];
    const uploadedFiles = {};
    selectedFiles?.map((eachFile, index) => {
      return (uploadedFiles[index] = eachFile);
    });
    setFileList({ ...fileList, ...uploadedFiles });
  };

  const onSubmit = async (data) => {
    if (!!saveAction) {
      let filesArrToSend = [];
      for (let file of fileListArr) {
        const formData = new FormData();
        formData.append("files", file[1]);
        await uploadFile(formData).then(async (response) => {
          const json = await response.json();
          if (response.status === 200) {
            filesArrToSend.push(json[0]);
          }
        });
      }
      await createClaim({
        createClaimAction,
        data: {
          amount: parseFloat(data.amount),
          purpose: data.purpose,
          category: selectedOption,
          expenseDate: new Date(selectedDate).toISOString(),
          users_permissions_user: user?.id,
          attachment: filesArrToSend?.map((eachFile) => {
            return +eachFile?.id;
          }),
          status: "pending",
          publishedAt: new Date().toISOString(),
        },
      });
      // router.push("/claims/expenseRequestStatus");
      router.push({
        pathname: "/claims/expenseRequestStatus",
        query: {
          userId: user?.id,
          message: "Success!",
          belongTo: "Claims",
          label: "Expense report successfully created.",
        },
      });
    }
  };

  return (
    <Layout>
      <div css={styles.wrapper}>
        <HeaderNoti title={"Claims"} href={"/home"} />
        <div css={styles.bodyContainer}>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                  required
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
                  styles={selectBoxStyle}
                  components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                    DropdownIndicator,
                  }}
                  isClearable={false}
                  required
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
                    type={"amount"}
                    className="secondary-text"
                    placeholder="0.00"
                    required
                    {...register("amount", {
                      required: true,
                    })}
                  />
                </label>
              </div>
              <div className="formFlex">
                <div className="d-flex">
                  <label className="primary-text">Purpose</label>
                </div>
                <input
                  type={"text"}
                  className="secondary-text"
                  {...register("purpose", {
                    required: false,
                  })}
                />
              </div>
              <div className="formFlex">
                {fileListArr?.length > 0 ? (
                  <UploadedFiles
                    fileList={fileList}
                    setFileList={setFileList}
                  />
                ) : (
                  <div className={styles.addNoteUploadContainer}>
                    <Upload onChange={onChange} belongTo={"addExpense"} />
                  </div>
                )}
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
                onClick={() => {
                  setSaveAction(true);
                }}
              >
                Add to report
              </button>
            </div>
          </form>
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
  singleValue: (styles, { data }) => {
    return {
      ...styles,
    };
  },
  menu: (provided, state) => ({
    ...provided,
    width: "100%",
    height: "150px",
    overflowY: "scroll",
    outline: "none",
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    padding: "0",
    "&:focus": {
      backgroundColor: "none",
      outline: "none",
      border: "none",
    },
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
    "&:focus": {
      backgroundColor: "none",
      outline: "none",
      border: "none",
    },
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
    border: 1px solid rgba(41, 57, 145, 1);
    color: var(--primary);
    background: var(--white);
  `,
  addBtn: css`
    border: none;
    color: var(--white);
    background: var(--primary);
  `,
};
