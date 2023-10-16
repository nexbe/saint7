/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { useApolloClient } from "@apollo/client";
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

const Documents = () => {
  const router = useRouter();
  const apolloClient = useApolloClient();
  const { getAllDocuments, DocumentInfo: documentInfo } = documentStore(
    (state) => state
  );
  const { user } = userStore((state) => state);

  useEffect(() => {
    getAllDocuments({
      apolloClient,
      where: { userId: user.id },
    });
  }, [user, router]);

  const [addModal, setAddModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  return (
    <Layout>
      <div css={styles.wrapper}>
        <HeaderNoti title={"Documents"} href={"/home"} />
        <div css={styles.bodyContainer}>
          <div css={styles.actions} style={{ display: "none" }}>
            <button
              css={styles.actionBtn(true)}
              onClick={() => setAddModal(true)}
            >
              ADD NEW DOCUMENT
            </button>
            <button
              css={styles.actionBtn(isEdit)}
              onClick={() => setIsEdit(!isEdit)}
            >
              <EditIcon />
            </button>
            <button
              css={styles.actionBtn(isDelete)}
              onClick={() => setIsDelete(!isDelete)}
            >
              <DeleteIcon />
            </button>
          </div>
          <div>
            {documentInfo &&
              documentInfo?.map((eachDocument, index) => {
                return (
                  <Card
                    key={index}
                    id={eachDocument.id}
                    title={eachDocument.title}
                    body={eachDocument.description}
                    attachment={eachDocument?.attachment[0]?.url}
                    isEdit={isEdit}
                    setEditModal={setEditModal}
                    isDelete={isDelete}
                    icon={<BatteryWarningIcon />}
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
              <button css={styles.cancelBtn} onClick={() => setIsDelete(false)}>
                Cancel
              </button>
              <button
                css={styles.deleteBtn}
                onClick={() => {
                  setDeleteModal(!deleteModal);
                }}
              >
                Delete
              </button>
            </div>
          )}
          <AddDocModal
            modal={addModal}
            setModal={setAddModal}
            userId={user?.id}
          />
          <EditDocModal modal={editModal} setModal={setEditModal} />
          {deleteModal && (
            <DeleteModal
              isOpen={deleteModal}
              close={() => setDeleteModal(!deleteModal)}
            />
          )}
        </div>
      </div>
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
    background: ${active ? "var(--primary)" : "#A0AEC0"};
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
    border: 1px solid rgba(160, 174, 192, 1);
    color: var(--dark-gray);
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
