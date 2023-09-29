/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
require("react-datepicker/dist/react-datepicker.css");
import Select, { components } from "react-select";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Image from "next/image";

import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";
import PlusIcon from "/public/icons/plusIcon";
import InvoiceImageModal from "../../components/claims/InvoiceImageModal";

const RequestDetail = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(1);
  const [openImageModal, setOpenImageModal] = useState(false);

  const imageModal = () => {
    setOpenImageModal(!openImageModal);
  };

  return (
    <Layout>
      <div css={styles.wrapper}>
        <HeaderNoti title={"Claims"} href={"/home"} />
        <div css={styles.bodyContainer}>
          <div className="d-flex" css={styles.cardWrapper}>
            <label className="primary-text">
              Total<label className="amount">SGD 200.00</label>
              <label className="date">03.03.2023</label>
            </label>
            <div onClick={imageModal} style={{ cursor: "pointer" }}>
              <Image
                src="/images/invoiceSample.jpg"
                alt="Inovice Sample"
                width={80}
                height={80}
                style={{
                  border: "1px solid var(--primary)",
                  borderRadius: "8px",
                }}
              />
              <span css={styles.imageCount}>4</span>
              {openImageModal && (
                <InvoiceImageModal
                  isOpen={openImageModal}
                  close={() => setOpenImageModal(!openImageModal)}
                />
              )}
            </div>
          </div>
          <div css={styles.detailWrapper} className="d-flex">
            <div className="primary-text" css={styles.detailHeader}>
              <label
                css={activeTab == 1 ? styles.activeColor : ""}
                onClick={() => setActiveTab(1)}
              >
                Details
              </label>
              <label
                css={activeTab == 2 ? styles.activeColor : ""}
                style={{
                  borderRadius: activeTab == 2 ? "50px 0 0 0" : "",
                }}
                onClick={() => setActiveTab(2)}
              >
                History
              </label>
            </div>
            <div
              css={styles.detailBody}
              className="secondary-text"
              style={{
                borderRadius: activeTab == 2 ? "15px 0 15px 15px" : "",
              }}
            >
              {activeTab == 1 && (
                <>
                  <div>
                    <label className="detailLabel">Report Id</label>
                    <label>ER#00001</label>
                  </div>
                  <div>
                    <label className="detailLabel">Report Name</label>
                    <label>Telephone Expense</label>
                  </div>
                  <div>
                    <label className="detailLabel">Expense Date</label>
                    <label>03/03/2023</label>
                  </div>
                  <div>
                    <label className="detailLabel">Transaction Time</label>
                    <label>24/03/2023 09:27:32</label>
                  </div>
                  <div>
                    <label className="detailLabel">Category</label>
                    <label>Communication</label>
                  </div>
                  <div>
                    <label className="detailLabel">Amount</label>
                    <label>$200.00</label>
                  </div>
                  <div>
                    <label className="detailLabel">Purpose</label>
                    <label>This is the purpose.</label>
                  </div>
                </>
              )}
              {activeTab == 2 && (
                <>
                  <div
                    css={styles.historyBox}
                    style={{
                      lineHeight: "22px",
                    }}
                  >
                    <label className="labelText" style={{ width: "55%" }}>
                      Transaction Updated
                      <label className="detailValue">Telephone expense</label>
                    </label>
                    <div css={styles.messageRow}>
                      <div css={styles.lineStyle}></div>
                      <div css={styles.circleStyle}></div>
                    </div>
                    <label className="labelText" style={{ width: "40%" }}>
                      07 March, 2023
                      <label className="detailValue">01:19 PM</label>
                    </label>
                  </div>
                  <div
                    style={{
                      lineHeight: "20px",
                      marginTop: "-25px",
                    }}
                  >
                    <label className="labelText" style={{ width: "55%" }}>
                      Report Updated
                      <label className="detailValue">Approved by Han Zin</label>
                    </label>
                    <div css={styles.messageRow}>
                      <div css={styles.lineStyle}></div>
                      <div css={styles.circleStyle}></div>
                    </div>
                    <label className="labelText" style={{ width: "40%" }}>
                      05 March, 2023
                      <label className="detailValue"> 04:18 PM</label>
                    </label>
                  </div>
                  <div
                    style={{
                      lineHeight: "20px",
                      marginTop: "-25px",
                    }}
                  >
                    <label className="labelText" style={{ width: "55%" }}>
                      Report Created
                      <label className="detailValue">Nandar Moe Oo</label>
                    </label>
                    <div css={styles.messageRow}>
                      <div
                        css={styles.lineStyle}
                        style={{ background: "none" }}
                      ></div>
                      <div css={styles.circleStyle}></div>
                    </div>
                    <label className="labelText" style={{ width: "40%" }}>
                      03 March, 2023
                      <label className="detailValue">03:18 PM</label>
                    </label>
                  </div>
                </>
              )}
            </div>
          </div>
          <div
            css={styles.addReport}
            onClick={() => router.push("/claims/addExpenseRequest")}
          >
            <PlusIcon />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RequestDetail;

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
  `,
  cardWrapper: css`
    justify-content: space-between;
    align-items: center;
    border-radius: 16px;
    background: var(--white);
    box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.08);
    padding: 10px 20px;
    label {
      display: flex;
      flex-direction: column;
      line-height: 25px;
      .amount {
        font-size: 18px;
        font-weight: 700;
        color: var(--primary);
      }
      .date {
        font-size: 12px;
        line-height: 50px;
      }
    }
  `,
  imageCount: css`
    width: 25px;
    height: 25px;
    position: absolute;
    margin-top: -6rem;
    margin-left: 70px;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--white);
    background: var(--primary);
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.08);
  `,
  detailWrapper: css`
    flex-direction: column;
  `,
  detailHeader: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    label {
      cursor: pointer;
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 3px 0;
    }
  `,
  detailBody: css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 0 15px 15px 15px;
    background: var(--white);
    padding: 20px;
    div {
      display: flex;
      justify-content: space-between;
      line-height: 35px;
    }
    .detailLabel {
      color: var(--dark-gray);
    }
    .labelText {
      color: #345165;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .detailValue {
      color: var(--dark-gray);
      font-size: 13px;
    }
  `,
  activeColor: css`
    border-radius: 0 50px 0 0;
    background: var(--white);
  `,
  lineStyle: css`
    background-color: var(--light-gray);
    height: 50px;
    width: 1.5px;
    margin-left: 11px;
    margin-top: 40px;
  `,
  messageRow: css`
    width: auto;
    display: flex;
    flex-direction: row;
  `,
  circleStyle: css`
    width: 17px;
    height: 17px;
    background: none;
    border: 2px solid var(--light-gray);
    border-radius: 50px;
    justify-content: center;
    display: flex;
    margin-left: -10px;
    margin-top: 25px;
  `,
  historyBox: css`
    display: flex;
    justify-content: center;
    gap: 5px;
  `,
  addReport: css`
    background: var(--primary);
    width: 50px;
    height: 50px;
    border-radius: 50px;
    padding: 3px;
    cursor: pointer;
    position: absolute;
    bottom: 60px;
    right: 12px;
  `,
};
