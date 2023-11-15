/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";
import { css } from "@emotion/react";
import { MdKeyboardArrowRight } from "react-icons/md";
import ViewSopModal from "../../components/checklist/ViewSopModal";
import CheckListImageModal from "../../components/checklist/CheckListImageModal";
import ViewEquipModal from "../../components/checklist/ViewEquipModal";
import siteCheckListStore from "../../store/siteCheckList";
import useAuth from "../../store/auth";
import { useRouter } from "next/router";
import dayjs from "dayjs";

const ViewCheckList = () => {
  const [viewSopModal, setViewSopModal] = useState(false);
  const [viewEquipModal, setViewEquipModal] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedSopData, setSelectedSopData] = useState([]);
  const [selectedEquipData, setSelectedEquipData] = useState([]);
  const router = useRouter();
  const checklistId = router.query.id;
  const { fetchFilteredCheckList, filterCheckList } = siteCheckListStore();
  const { user } = useAuth();

  const handleViewSop = (data) => {
    setSelectedSopData(data)
    setViewSopModal(true)
  }
  const handleViewEquip = (data) => {
    setSelectedEquipData(data)
    setViewEquipModal(true)
  }
  const imageModal = () => {
    setOpenImageModal(!openImageModal);
    setViewSopModal(false);
  };
  useEffect(() => {
    fetchFilteredCheckList(
      {
        input: {
          eq: checklistId,
        },
      },
      user?.jwt
    );
  }, []);
  const attachment = [
    { id: "2", src: "" },
    { id: "3", src: "" },
    { id: "4", src: "" },
  ];
  // console.log(filterCheckList)
  return (
    <Layout>
      <HeaderNoti title={"Site Checklist"} href={"/checklist"} />
      <div css={styles.container}>
        <div css={styles.wrapper}>
          <h3>Initiate evacuation procedures</h3>
          <div>
            <span>Time Visited </span>
            <b>{filterCheckList?.[0].attributes?.timeVisited}</b>
          </div>
          <div>
            <span>Date Visited </span>
            <b>
              {dayjs(filterCheckList?.[0].attributes?.dateVisited)?.format(
                "D MMM YYYY"
              )}
            </b>
          </div>
          <div>
            <span>Visited By </span>
            <b>{filterCheckList?.[0].attributes?.visitedBy}</b>
          </div>
          <div>
            <span>Location</span>
            <b>{filterCheckList?.[0].attributes?.location}</b>
          </div>
        </div>
        <div
          style={{
            borderBottom: "0.9px solid lightgrey",
            paddingBottom: "20px",
          }}>
          {filterCheckList?.[0].attributes?.sop &&
            filterCheckList?.[0].attributes?.sop.length > 0 &&
            filterCheckList?.[0].attributes?.sop?.map((sop) => {
              return (
                <div
                  css={styles.box}
                  onClick={() => handleViewSop(sop)}
                  key={sop.id}>
                  <span>{sop?.Name}</span>
                  <MdKeyboardArrowRight size={28} />
                </div>
              );
            })}
          {filterCheckList?.[0].attributes?.equipment &&
            filterCheckList?.[0].attributes?.equipment.length > 0 &&
            filterCheckList?.[0].attributes?.equipment?.map((equip) => {
              return (
                <div
                  css={styles.box}
                  onClick={() => handleViewEquip(equip)}
                  key={equip.id}>
                  <span>{equip?.Name}</span>
                  <MdKeyboardArrowRight size={28} />
                </div>
              );
            })}
        </div>
        {filterCheckList?.[0].attributes?.reasonForProperUniform ||
          (filterCheckList?.[0].attributes?.actionTakenForProperUniform && (
            <div css={styles.paragraphContainer}>
              <h4>All Officers Are in Proper Uniforms.</h4>
              {filterCheckList?.[0].attributes?.reasonForProperUniform && (
                <p>
                  <b>Reason :</b>{" "}
                  {filterCheckList?.[0].attributes?.reasonForProperUniform}
                </p>
              )}
              {filterCheckList?.[0].attributes?.actionTakenForProperUniform && (
                <p>
                  <b>Action Taken :</b>{" "}
                  {filterCheckList?.[0].attributes?.actionTakenForProperUniform}
                </p>
              )}
            </div>
          ))}
        {filterCheckList?.[0].attributes?.actionTakenForWelfare && (
          <div css={styles.paragraphContainer}>
            <h4>Presence of Welfare at site. (eg. Kettle, fan etc.)</h4>
            <p>
              <b>Action Taken :</b>{" "}
              {filterCheckList?.[0].attributes?.actionTakenForWelfare}
            </p>
          </div>
        )}
        {filterCheckList?.[0].attributes?.suggestions && (
          <div css={styles.paragraphContainer}>
            <h4>Comments on Improvement/Suggestions</h4>
            <p>{filterCheckList?.[0].attributes?.suggestions}</p>
          </div>
        )}
        {filterCheckList?.[0].attributes?.guardOnDuty && (
          <div css={styles.paragraphContainer}>
            <h4>Guards on Duty at Site</h4>
            <p>{filterCheckList?.[0].attributes?.guardOnDuty}</p>
          </div>
        )}
        {filterCheckList?.[0].attributes?.remarks && (
          <div css={styles.paragraphContainer}>
            <h4>Remarks</h4>
            <p>{filterCheckList?.[0].attributes?.remarks}</p>
          </div>
        )}
      </div>
      <ViewSopModal
        isOpen={viewSopModal}
        setModal={setViewSopModal}
        imageModal={imageModal}
        selectedSopData={selectedSopData}
      />
      <ViewEquipModal
        isOpen={viewEquipModal}
        setModal={setViewEquipModal}
        imageModal={imageModal}
        selectedEquipData={selectedEquipData}
      />
      {openImageModal && (
        <CheckListImageModal
          attachment={selectedSopData?.Attachments || selectedEquipData?.Attachments}
          isOpen={openImageModal}
          close={() => setOpenImageModal(!openImageModal)}
        />
      )}
    </Layout>
  );
};

export default ViewCheckList;

const styles = {
  container: css`
    background: #fff;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
    min-height: 70vh;
    max-height: 75vh;
    overflow-y: auto;
    h4 {
      color: #000;
      font-size: 16px;
      font-weight: 700;
    }
  `,
  wrapper: css`
    color: #576b77;
    padding: 5px;
    display: flex;
    flex-direction: column;
    border-bottom: 0.9px solid lightgrey;
    h3 {
      display: flex;
      align-items: center;
      text-align: center;
      justify-content: center;
      font-weight: 700;
      color: #000;
      word-break: break-word;
    }
    div {
      margin-top: 4px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      font-size: 16px;
      font-weight: 400;
    }
    b {
      word-break: break-word;
      width: 60%;
      text-align: end;
    }
  `,
  box: css`
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    color: #576b77;
    justify-content: space-between;
    padding: 8px;
    background: #fff;
    border: 1px solid #a0aec0;
    border-radius: 8px;
    cursor: pointer;
    span {
      width: 60%;
      word-break: break-word;
    }
  `,
  paragraphContainer: css`
    border-bottom: 0.9px solid lightgrey;
    padding-bottom: 20px;
    color: #576b77;
    margin-top: 9px;
  `,
};
