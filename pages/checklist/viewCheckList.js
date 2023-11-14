/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";
import { css } from "@emotion/react";
import { MdKeyboardArrowRight } from "react-icons/md";
import ViewSopModal from "../../components/checklist/ViewSopModal";
import CheckListImageModal from "../../components/checklist/CheckListImageModal";
import ViewEquipModal from "../../components/checklist/ViewEquipModal";

const ViewCheckList = () => {
  const [viewSopModal, setViewSopModal] = useState(false);
  const [viewEquipModal, setViewEquipModal] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);
  const imageModal = () => {
    setOpenImageModal(!openImageModal);
    setViewSopModal(false)
  };
  const attachment = [
    { id: "2", src: "" },
    { id: "3", src: "" },
    { id: "4", src: "" },
  ];
  return (
    <Layout>
      <HeaderNoti title={"Site Checklist"} href={"/checklist"} />
      <div css={styles.container}>
        <div css={styles.wrapper}>
          <h3>Initiate evacuation procedures</h3>
          <div>
            <span>Time Visited </span>
            <b>Severe </b>
          </div>
          <div>
            <span>Date Visited </span>
            <b>4 August 2022 </b>
          </div>
          <div>
            <span>Visited By </span>
            <b>John Doe</b>
          </div>
          <div>
            <span>Location</span>
            <b>Building XYZ Tower B Zone C Level B1 </b>
          </div>
        </div>
        <div
          style={{
            borderBottom: "0.9px solid lightgrey",
            paddingBottom: "20px",
          }}>
          <div css={styles.box} onClick={() => setViewSopModal(true)}>
            <span>SOP 2</span>
            <MdKeyboardArrowRight size={28} />
          </div>
          <div css={styles.box} onClick={() => setViewSopModal(true)}>
            <span>SOP 3</span>
            <MdKeyboardArrowRight size={28} />
          </div>
          <div css={styles.box} onClick={() => setViewEquipModal(true)}>
            <span>Equipment 2</span>
            <MdKeyboardArrowRight size={28} />
          </div>
          <div css={styles.box} onClick={() => setViewEquipModal(true)}>
            <span>Equipment 4</span>
            <MdKeyboardArrowRight size={28} />
          </div>
        </div>
        <div css={styles.paragraphContainer}>
          <h4>All Officers Are in Proper Uniforms.</h4>
          <p>
            <b>Reason :</b> Neque porro quisquam est qui dolorem ipsum quia
            dolor sit amet consectetur adipisci velit sed qu
          </p>
          <p>
            <b>Action Taken :</b> Neque porro quisquam est qui dolorem ipsum
            quia dolor sit amet consectetur adipisci velit sed qu
          </p>
        </div>
        <div css={styles.paragraphContainer}>
          <h4>Presence of Welfare at site. (eg. Kettle, fan etc.)</h4>
          <p>
            <b>Action Taken :</b> Action Taken : Neque porro quisquam est qui
            dolorem ipsum quia dolor sit amet consectetur adipisci velit sed
            quporro quisquam est qui dolorem ipsum quia dolor sit amet
            consectetur adipisci velit sed quporro quisquam est qui dolorem
            ipsum quia dolor sit amet consectetur adipisci velit sed quporro
            quisquam est qui dolorem ipsum quia dolor sit amet consectetur
            adipisci velit sed qu
          </p>
        </div>
        <div css={styles.paragraphContainer}>
          <h4>Comments on Improvement/Suggestions</h4>
          <p>
            Neque porro quisquam est qui dolorem ipsum quia dolor sit amet
            consectetur adipisci velit sed quporro quisquam est qui dolorem
            ipsum quia dolor sit amet consectetur adipisci velit sed quporro
            quisquam est qui dolorem ipsum quia dolor sit amet consectetur
            adipisci velit sed quporro quisquam est qui dolorem ipsum quia dolor
            sit amet consectetur adipisci velit sed qu
          </p>
        </div>
        <div css={styles.paragraphContainer}>
          <h4>Guards on Duty at Site</h4>
          <p>
            Neque porro quisquam est qui dolorem ipsum quia dolor sit amet
            consectetur adipisci velit sed quporro quisquam est qui dolorem
            ipsum quia dolor sit amet consectetur adipisci velit sed quporro
            quisquam est qui dolorem ipsum quia dolor sit amet consectetur
            adipisci velit sed quporro quisquam est qui dolorem ipsum quia dolor
            sit amet consectetur adipisci velit sed qu
          </p>
        </div>
        <div css={styles.paragraphContainer}>
          <h4>Remarks</h4>
          <p>
            Neque porro quisquam est qui dolorem ipsum quia dolor sit amet
            consectetur adipisci velit sed quporro quisquam est qui dolorem
            ipsum quia dolor sit amet consectetur adipisci velit sed quporro
            quisquam est qui dolorem ipsum quia dolor sit amet consectetur
            adipisci velit sed quporro quisquam est qui dolorem ipsum quia dolor
            sit amet consectetur adipisci velit sed qu
          </p>
        </div>
      </div>
      <ViewSopModal
        isOpen={viewSopModal}
        setModal={setViewSopModal}
        imageModal={imageModal}
      />
      <ViewEquipModal 
         isOpen={viewEquipModal}
         setModal={setViewEquipModal}
         imageModal={imageModal}
      />
      {openImageModal && (
        <CheckListImageModal
          attachment={attachment}
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
