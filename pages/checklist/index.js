/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";
import EditPencil from "../../public/icons/editPencil";
import BinIcon from "../../public/icons/binIcon";
import EditIcon from "../../public/icons/editIcon";
import DeleteIcon from "../../public/icons/deleteIcon";
import NoDataIcon from "../../public/icons/noDataIcon";
import Card from "../../components/checklist/Card";
import { useRouter } from "next/router";
import siteCheckListStore from "../../store/siteCheckList";
import useAuth from "../../store/auth";
import DeleteModal from "../../components/Modal/DeleteModal";
import NotificationBox from "../../components/notification/NotiBox";

const SiteCheckList = () => {
  const router = useRouter();
  console.log(router.query)
  const [isEdit, setIsEdit] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const { fetchCheckList, siteCheckLists } = siteCheckListStore();
  const { user } = useAuth();
  const { deleteCheckLists, errorDeleteCheckLists } = siteCheckListStore();
  const [selectedDeletedData, setSelectedDeletedData] = useState([]);
  useEffect(() => {
    fetchCheckList(user?.jwt);
  }, [router.query, setDeleteModal, isEdit, setIsEdit]);

  //delete announcements
  const handleSelect = (selectedId) => {
    setSelectedDeletedData((prevData) => {
      if (prevData?.includes(selectedId)) {
        return prevData?.filter((id) => id !== selectedId);
      } else {
        return [...prevData, selectedId];
      }
    });
  };

  //handle delete
  const handleDelete = async (id) => {
    await deleteCheckLists(id, user?.jwt);
    await fetchCheckList(user?.jwt);
    router.push({
      pathname: `/checklist`,
      query: {
        message: !errorDeleteCheckLists ? "Success!" : "Apologies!",
        belongTo: !errorDeleteCheckLists ? "Site Checklists" : "error",
        label: "Checklist has successfully deleted.",
        userId: user?.id,
      },
    });
  };

  return (
    <Layout>
      <HeaderNoti title={"Site Checklist"} href={"/operation"} />
      <div css={styles.wrapper}>
        <div style={{ position: "relative", margin: "2px 10px" }}>
          <NotificationBox
            message={router.query.message}
            timeout={1000}
            label={router.query.label}
          />
        </div>
        <div css={styles.actions}>
          <button
            css={styles.actionBtn(true)}
            onClick={() => router.push("/checklist/createCheckList")}
          >
            ADD NEW CHECKLIST
          </button>
          <button
            css={styles.actionBtn(isEdit)}
            onClick={() => setIsEdit(!isEdit)}
          >
            {isEdit ? <EditIcon /> : <EditPencil />}
          </button>
          <button
            css={styles.actionBtn(isDelete)}
            onClick={() =>
              selectedDeletedData && selectedDeletedData.length > 0
                ? setDeleteModal(true)
                : setIsDelete(!isDelete)
            }
          >
            {isDelete ? <DeleteIcon /> : <BinIcon />}
          </button>
        </div>
        <div css={styles.cardContainer}>
          {siteCheckLists &&
            siteCheckLists.length > 0 &&
            siteCheckLists.map((checklist) => {
              return (
                <div
                  key={checklist.id}
                  onClick={() => {
                    !isDelete && !isEdit &&
                      router.push({
                        pathname: "/checklist/viewCheckList",
                        query: { id: checklist.id },
                      });
                  }}
                >
                  <Card
                    isEdit={isEdit}
                    isDelete={isDelete}
                    data={checklist}
                    isChecked={selectedDeletedData?.includes(checklist.id)}
                    handleSelect={() => handleSelect(checklist.id)}
                  />
                </div>
              );
            })}
          {siteCheckLists && siteCheckLists.length === 0 && (
            <div css={styles.noDataContainer} className="primary-text">
              <NoDataIcon />
              <label>Nothing Here to show</label>
              <label>You don’t have any data.</label>
            </div>
          )}
        </div>
        <DeleteModal
          isOpen={deleteModal}
          close={() => setDeleteModal(!deleteModal)}
          handleDeleteConfirm={handleDelete}
          selectedData={selectedDeletedData}
          belongTo={"CheckLists"}
        />
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
  noDataContainer: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
};
