/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";
import EditPencil from "../../public/icons/editPencil";
import BinIcon from "../../public/icons/binIcon";
import EditIcon from "../../public/icons/editIcon";
import DeleteIcon from "../../public/icons/deleteIcon";
import Card from "../../components/checklist/Card";
import { useRouter } from "next/router";

const SiteCheckList = () => {
  const router = useRouter();
  const [isEdit, setIsEdit] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  return (
    <Layout>
      <HeaderNoti title={"Site Checklist"} href={"/home"} />
      <div css={styles.wrapper}>
        <div css={styles.actions}>
          <button
            css={styles.actionBtn(true)}
            onClick={() => router.push("/checklist/createCheckList")}>
            ADD NEW CHECKLIST
          </button>
          <button
            css={styles.actionBtn(isEdit)}
            onClick={() => setIsEdit(!isEdit)}>
            {isEdit ? <EditIcon /> : <EditPencil />}
          </button>
          <button
            css={styles.actionBtn(isDelete)}
            onClick={() => setIsDelete(!isDelete)}>
            {isDelete ? <DeleteIcon /> : <BinIcon />}
          </button>
        </div>
        <div css={styles.cardContainer}>
          <Card
            isEdit={isEdit}
            isDelete={isDelete}
            isChecked={true}
            handleSelect={() => {}}
          />
          <Card
            isEdit={isEdit}
            isDelete={isDelete}
            isChecked={true}
            handleSelect={() => {}}
          />
          <Card
            isEdit={isEdit}
            isDelete={isDelete}
            isChecked={true}
            handleSelect={() => {}}
          />
          <Card
            isEdit={isEdit}
            isDelete={isDelete}
            isChecked={true}
            handleSelect={() => {}}
          />
        </div>
      </div>
    </Layout>
  );
};

export default SiteCheckList;
const styles = {
  wrapper: css`
    margin: 20px;
    position: relative;
  `,
  actions: css`
    display: flex;
    flex-direction: row;
    margin-bottom: 9px;
    justify-content: space-between;
    align-items: center;
    button {
      padding: 10px 23px;
    }
  `,
  actionBtn: (active) => css`
    border-radius: 10px;
    color: #fff;
    background: ${active ? "var(--primary)" : "#E3F3FF"};
    cursor: pointer;
    padding: 12px;
    border: none;
    font-size: 14px;
    font-weight: 700;
    height: 46px;
    align-items: center;
  `,
  actionButton: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 10px;
    button {
      border-radius: 10px;
      padding: 3px 40px;
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      min-width: 120px;
      box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.08),
        0px 4px 6px 0px rgba(50, 50, 93, 0.11);
    }
  `,
  cardContainer: css`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-height: 63vh;
    overflow-y: scroll;
  `,
};
