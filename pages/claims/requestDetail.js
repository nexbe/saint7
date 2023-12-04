/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { useApolloClient, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import dayjs from "dayjs";

import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";
import PlusIcon from "/public/icons/plusIcon";
import InvoiceImageModal from "../../components/claims/InvoiceImageModal";
import userStore from "../../store/auth";
import claimStore from "../../store/claim";
import Loading from "../../components/Loading";

const RequestDetail = () => {
  const router = useRouter();
  const apolloClient = useApolloClient();
  const {
    getAllClaims,
    ClaimInfo: claimInfo,
    loading,
  } = claimStore((state) => state);
  const { user } = userStore((state) => state);
  const [activeTab, setActiveTab] = useState(1);
  const [openImageModal, setOpenImageModal] = useState(false);

  const imageModal = () => {
    setOpenImageModal(!openImageModal);
  };

  useEffect(() => {
    getAllClaims({
      apolloClient,
      where: { userId: user.id },
    });
  }, [user]);

  const [selectedExpense, setSelectedExpense] = useState(claimInfo || []);

  const handleExpenseChange = (id) => {
    const filteredResults = claimInfo.filter(
      (item) => item?.id?.toLowerCase() === id?.toLowerCase()
    );
    setSelectedExpense(filteredResults);
  };

  useEffect(() => {
    handleExpenseChange(router.query.expenseId);
  }, [router.query]);

  return (
    <Layout>
      <div css={styles.wrapper}>
        <HeaderNoti
          title={"Claims"}
          href={
            user?.role?.name.toLowerCase() != "guard"
              ? "/claims/claimApproval/expenseRequest"
              : "/claims/expenseRequestStatus"
          }
        />
        <div css={styles.bodyContainer}>
          <div className="d-flex" css={styles.cardWrapper}>
            <label className="primary-text">
              Total
              <label className="amount">$ {selectedExpense[0]?.amount}</label>
              <label className="date">
                {dayjs(selectedExpense[0]?.expenseDate).format("DD.MM.YYYY")}
              </label>
            </label>
            <div onClick={imageModal} style={{ cursor: "pointer" }}>
              <img
                src={`${process.env.NEXT_PUBLIC_APP_URL}${selectedExpense[0]?.attachment[0]?.url}`}
                alt="Inovice Sample"
                width={80}
                height={80}
                style={{
                  border: "1px solid var(--primary)",
                  borderRadius: "8px",
                }}
              />
              <span css={styles.imageCount}>
                {selectedExpense[0]?.attachment?.length}
              </span>
              {openImageModal && (
                <InvoiceImageModal
                  attachment={selectedExpense[0]?.attachment}
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
                    <label> #ER-0000{selectedExpense[0]?.id}</label>
                  </div>
                  <div>
                    <label className="detailLabel">Expense Date</label>
                    <label>
                      {dayjs(selectedExpense[0]?.expenseDate).format(
                        "DD/MM/YYYY"
                      )}
                    </label>
                  </div>
                  <div>
                    <label className="detailLabel">Transaction Time</label>
                    <label>
                      {dayjs(selectedExpense[0]?.expenseDate).format(
                        "DD/MM/YYYY hh:mm:ss"
                      )}
                    </label>
                  </div>
                  <div>
                    <label className="detailLabel">Category</label>
                    <label>{selectedExpense[0]?.category?.label}</label>
                  </div>
                  <div>
                    <label className="detailLabel">Amount</label>
                    <label>$ {selectedExpense[0]?.amount}</label>
                  </div>
                  <div>
                    <label className="detailLabel">Purpose</label>
                    <label>{selectedExpense[0]?.purpose}</label>
                  </div>
                </>
              )}
              {activeTab == 2 && (
                <>
                  {selectedExpense[0]?.status != "pending" && (
                    <>
                      <div
                        css={styles.historyBox}
                        style={{
                          lineHeight: "22px",
                          fontSize: "13px",
                          gap: "5px",
                        }}
                      ></div>
                      <div
                        style={{
                          lineHeight: "20px",
                          marginTop: "-25px",
                          fontSize: "13px",
                          gap: "5px",
                        }}
                      >
                        <label
                          className="labelText"
                          style={{
                            width: "50%",
                            alignItems: "flex-end",
                          }}
                        >
                          Report Updated
                          <label className="detailValue">
                            <span style={{ textTransform: "capitalize" }}>
                              {selectedExpense[0]?.status}
                            </span>{" "}
                            by {selectedExpense[0]?.actionBy?.username}
                          </label>
                        </label>
                        <div css={styles.messageRow}>
                          <div css={styles.lineStyle}></div>
                          <div css={styles.circleStyle}></div>
                        </div>
                        <label
                          className="labelText"
                          style={{
                            width: "45%",
                          }}
                        >
                          {dayjs(selectedExpense[0]?.updatedAt).format(
                            "DD MMMM, YYYY"
                          )}
                          <label className="detailValue">
                            {dayjs(selectedExpense[0]?.updatedAt).format(
                              "HH:MM A"
                            )}
                          </label>
                        </label>
                      </div>
                    </>
                  )}
                  <div
                    style={{
                      lineHeight: "20px",
                      marginTop: "-25px",
                      gap: "5px",
                      fontSize: "13px",
                    }}
                  >
                    <label
                      className="labelText"
                      style={{
                        width: "50%",
                        alignItems: "flex-end",
                      }}
                    >
                      Report Created
                      <label className="detailValue">
                        {router?.query?.userName}
                      </label>
                    </label>
                    <div css={styles.messageRow}>
                      <div
                        css={styles.lineStyle}
                        style={{ background: "none" }}
                      ></div>
                      <div css={styles.circleStyle}></div>
                    </div>
                    <label
                      className="labelText"
                      style={{
                        width: "45%",
                      }}
                    >
                      {dayjs(selectedExpense[0]?.createdAt).format(
                        "DD MMMM, YYYY"
                      )}
                      <label className="detailValue">
                        {dayjs(selectedExpense[0]?.createdAt).format("HH:MM A")}
                      </label>
                    </label>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {user?.role?.name?.toLowerCase() != "admin" && (
          <div css={styles.addReport}>
            <button onClick={() => router.push("/claims/addExpenseRequest")}>
              <PlusIcon />
            </button>
          </div>
        )}
      </div>
      {loading && <Loading isOpen={loading} />}
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
    margin: 10px;
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
    display: flex;
    justify-content: flex-end;
    margin-right: 10px;
    position: relative;
    button {
      background: var(--primary);
      width: 50px;
      height: 50px;
      border-radius: 50px;
      padding: 3px;
      cursor: pointer;
      border: none;
    }
  `,
};
