/** @jsxImportSource @emotion/react */
import { useState, useEffect, useMemo } from "react";
import { useApolloClient, useMutation } from "@apollo/client";
import { css } from "@emotion/react";
import { useRouter } from "next/router";

import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";
import Card from "../../components/documents/Card";
import BatteryWarningIcon from "../../public/icons/batteryWarningIcon";
import LightningIcon from "../../public/icons/lightningIcon";
import EditIcon from "../../public/icons/editIcon";
import DeleteIcon from "../../public/icons/deleteIcon";
import AddDocModal from "../../components/documents/AddDocModal";
import EditDocModal from "../../components/documents/EditDocModal";
import DeleteModal from "../../components/Modal/DeleteModal";
import documentStore from "../../store/document";
import userStore from "../../store/auth";
import NoDataIcon from "/public/icons/noDataIcon";
import NotificationBox from "../../components/notification/NotiBox";
import { DELETE_DOCUMENT } from "../../graphql/mutations/document";
import EditPencil from "../../public/icons/editPencil";
import BinIcon from "../../public/icons/binIcon";

const Documents = () => {
  const router = useRouter();
  const apolloClient = useApolloClient();
  const { getAllDocuments, DocumentInfo: documentInfo } = documentStore(
    (state) => state
  );
  const [deleteDocumentAction, { errDeleteDocument }] =
    useMutation(DELETE_DOCUMENT);
  const { user } = userStore((state) => state);

  const [addModal, setAddModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState();
  const [selectedDeletedData, setSelectedDeletedData] = useState([]);

  useEffect(() => {
    if (
      !!router?.query?.visibleFor &&
      router?.query?.visibleFor === "manager"
    ) {
      getAllDocuments({
        apolloClient,
        where: { isGuard: false },
      });
    } else {
      getAllDocuments({
        apolloClient,
        where: { isGuard: true },
      });
    }
  }, [user, router.query]);

  const handleCheck = (selectedId) => {
    setSelectedDeletedData((prevData) => {
      if (prevData?.includes(selectedId)) {
        return prevData?.filter((id) => id !== selectedId);
      } else {
        return [...prevData, selectedId];
      }
    });
  };

  const handleDeleteConfirm = async (id) => {
    await deleteDocumentAction({
      variables: { id: id },
    });
    router.push({
      pathname: `/documents`,
      query: {
        message: !errDeleteDocument ? "Success!" : "Apologies!",
        belongTo: !errDeleteDocument ? "Document" : "error",
        label:
          selectedDeletedData?.length + " documents has successfully deleted.",
        userId: user?.id,
      },
    });
  };

  return (
    <Layout>
      <div css={styles.wrapper}>
        <HeaderNoti title={"Documents"} href={"/HRM"} />
        <div style={{ position: "relative", margin: "2px 10px" }}>
          <NotificationBox
            message={router.query.message}
            timeout={3000}
            label={router?.query?.label}
          />
        </div>
        <div css={styles.bodyContainer}>
          {user?.role?.name.toLowerCase() != "guard" && (
            <div css={styles.actions}>
              <button
                css={styles.actionBtn(true)}
                onClick={() => setAddModal(true)}
              >
                ADD NEW DOCUMENT
              </button>

              <button
                css={styles.actionBtn(isEdit)}
                onClick={() => setIsEdit(!isEdit)}
                disabled={documentInfo?.length > 0 ? false : true}
              >
                {isEdit ? <EditIcon /> : <EditPencil />}
              </button>
              <button
                css={styles.actionBtn(isDelete)}
                onClick={() => setIsDelete(!isDelete)}
                disabled={documentInfo?.length > 0 ? false : true}
              >
                {isDelete ? <DeleteIcon /> : <BinIcon />}
              </button>
            </div>
          )}
          <div>
            {documentInfo &&
              documentInfo?.map((eachDocument, index) => {
                return (
                  <Card
                    key={index}
                    isEdit={isEdit}
                    setEditModal={setEditModal}
                    isDelete={isDelete}
                    icon={
                      index % 2 === 0 ? (
                        <BatteryWarningIcon />
                      ) : (
                        <LightningIcon />
                      )
                    }
                    handleCheck={handleCheck}
                    setSelectedDocument={setSelectedDocument}
                    isChecked={selectedDeletedData?.includes(eachDocument.id)}
                    eachDocument={eachDocument}
                  />
                );
              })}
            {documentInfo && documentInfo.length == 0 && (
              <div css={styles.noDataContainer} className="primary-text">
                <NoDataIcon />
                <label>Nothing Here to show</label>
                <label>You don’t have any report request</label>
              </div>
            )}
          </div>
          {isDelete && (
            <div css={styles.actionButton}>
              <button
                css={styles.cancelBtn}
                onClick={() => {
                  setIsDelete(false);
                  setSelectedDeletedData([]);
                }}
              >
                Cancel
              </button>
              <button
                css={styles.deleteBtn}
                onClick={() => {
                  setDeleteModal(!deleteModal);
                  setIsDelete(false);
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      {addModal && (
        <AddDocModal
          modal={addModal}
          setModal={setAddModal}
          userId={user?.id}
          visibleFor={router?.query?.visibleFor}
        />
      )}
      {editModal && (
        <EditDocModal
          modal={editModal}
          setModal={setEditModal}
          selectedDocument={selectedDocument}
          userId={user?.id}
        />
      )}
      {deleteModal && (
        <DeleteModal
          isOpen={deleteModal}
          close={() => setDeleteModal(!deleteModal)}
          handleDeleteConfirm={handleDeleteConfirm}
          selectedData={selectedDeletedData}
          belongTo={"document"}
        />
      )}
    </Layout>
  );
};

export default Documents;

const styles = {
  wrapper: css`
    flex: 1 1 auto;
    height: 0px;
    display: flex;
    flex-direction: column;
    margin: 0;
    background: var(--background);
    position: relative;
  `,
  bodyContainer: css`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    min-height: 200px;
    margin: 10px;
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
  actions: css`
    display: flex;
    flex-direction: row;
    gap: 9px;
    margin: 10px;
    justify-content: space-between;
    align-items: center;
    button {
      padding: 10px;
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
  cancelBtn: css`
    border: 1px solid rgba(41, 57, 145, 1);
    color: var(--primary);
    background: var(--white);
  `,
  deleteBtn: css`
    border: none;
    color: var(--white);
    background: var(--primary);
  `,
  noDataContainer: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
};
