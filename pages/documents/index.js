/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";
import Card from "../../components/documents/Card";
import BatteryWarningIcon from "../../public/icons/batteryWarningIcon";
import LightningIcon from "../../public/icons/lightningIcon";
import EditIcon from "../../public/icons/editIcon";
import DeleteIcon from "../../public/icons/deleteIcon";
import { css } from "@emotion/react";
import AddDocModal from "../../components/documents/AddDocModal";
import EditDocModal from "../../components/documents/EditDocModal";

const index = () => {
  const [addModal, setAddModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  return (
    <Layout>
      <HeaderNoti title={"Documents"} href={"/home"} />
      <div css={styles.actions}>
        <button css={styles.actionBtn(true)} onClick={() => setAddModal(true)}>
          ADD NEW DOCUMENT
        </button>
        <button
          css={styles.actionBtn(isEdit)}
          onClick={() => setIsEdit(!isEdit)}>
          <EditIcon />
        </button>
        <button
          css={styles.actionBtn(isDelete)}
          onClick={() => setIsDelete(!isDelete)}>
          <DeleteIcon />
        </button>
      </div>
      <div css={styles.wrapper}>
        <Card
          id={0}
          title={"Initiate evacuation procedures"}
          body={
            "Activate the building evacuation alarm or PA system to alert occupants to evacuate Follow predetermined evacuation routes and assist others in exiting the building safely.Close doors and windows to help contain the fire, if safe to do so"
          }
          isEdit={isEdit}
          setEditModal={setEditModal}
          isDelete={isDelete}
          icon={<BatteryWarningIcon />}
        />
        <Card
          id={1}
          title={"Notify emergency services"}
          body={
            "Activate the building evacuation alarm or PA system to alert occupants to evacuate Follow predetermined evacuation routes and assist others in exiting the building safely.Close doors and windows to help contain the fire, if safe to do so"
          }
          isEdit={isEdit}
          setEditModal={setEditModal}
          isDelete={isDelete}
          icon={<LightningIcon />}
        />
        <Card
          id={2}
          title={"Initiate evacuation procedures"}
          body={
            "Activate the building evacuation alarm or PA system to alert occupants to evacuate Follow predetermined evacuation routes and assist others in exiting the building safely.Close doors and windows to help contain the fire, if safe to do so"
          }
          isEdit={isEdit}
          setEditModal={setEditModal}
          isDelete={isDelete}
          icon={<BatteryWarningIcon />}
        />
        <Card
          id={3}
          title={"Notify emergency services"}
          body={
            "Activate the building evacuation alarm or PA system to alert occupants to evacuate Follow predetermined evacuation routes and assist others in exiting the building safely.Close doors and windows to help contain the fire, if safe to do so"
          }
          isEdit={isEdit}
          setEditModal={setEditModal}
          isDelete={isDelete}
          icon={<LightningIcon />}
        />
      </div>
      <div>
        {isDelete && (
          <div css={styles.actions}>
            <button onClick={() => setIsDelete(false)} css={styles.cancelBtn}>
              Cancel
            </button>
            <button css={styles.deleteBtn}>Delete</button>
          </div>
        )}
      </div>
      <AddDocModal modal={addModal} setModal={setAddModal} />
      <EditDocModal modal={editModal} setModal={setEditModal} />
    </Layout>
  );
};

export default index;

const styles = {
  wrapper: css`
    max-height: 60vh;
    overflow-y: scroll;
  `,
  actions: css`
    display: flex;
    flex-direction: row;
    gap: 9px;
    margin: 20px;
  `,
  actionBtn: (active) => css`
    border-radius: 10px;
    color: #fff;
    background: ${active ? "var(--primary)" : "#A0AEC0"};
    cursor: pointer;
    padding: 12px;
    border: none;
    font-size: 18px;
    font-weight: 700;
  `,

  cancelBtn: css`
    border: 2px solid #a0aec0;
    color: #a0aec0;
    border-radius: 10px;
    cursor: pointer;
    width: 40%;
    padding: 12px;
    background: transparent;
  `,
  deleteBtn: css`
    border: none;
    color: #fff;
    background: var(--primary);
    border-radius: 10px;
    cursor: pointer;
    width: 40%;
    padding: 12px;
  `,
};
