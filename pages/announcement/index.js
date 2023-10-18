/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";
import { css } from "@emotion/react";
import Card from "../../components/announcement/Card";
import useAnnouncement from "../../store/announcement";
import useAuth from "../../store/auth";
import EditIcon from "../../public/icons/editIcon";
import DeleteIcon from "../../public/icons/deleteIcon";
import SearchIcon from "../../public/icons/searchIcon";
import AddAnnouncementModal from "../../components/announcement/AddAnnouncementModal";
import EditAnnouncementModal from "../../components/announcement/EditAnnouncementModal";
import DeleteModal from "../../components/Modal/DeleteModal";
import useLongPress from "../useLongPress";

const Announcement = () => {
  const { announcements, fetchAnnouncements, markAnnouncementAsRead } =
    useAnnouncement();
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [longPressCount, setlongPressCount] = useState(0);
  const { user } = useAuth();
  console.log("=>", user.role?.name);
  console.log("del", isDelete)
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  useEffect(() => {
    setData(announcements);
  }, [announcements]);

  useEffect(() => {
    const filteredData = data.filter((data) => {
      return data.attributes?.title
        ?.toLowerCase()
        ?.includes(searchValue?.toLowerCase());
    });
    //console.log(searchValue)
    setData(searchValue === "" ? announcements : filteredData);
  }, [searchValue]);

  // long press
  const options = {
    shouldPreventDefault: true,
    delay: 1000,
  };

  const onLongPress = () => {
    console.log("pressing");
    setIsDelete(!isDelete);
    setlongPressCount(longPressCount + 1);
  };

  console.log(longPressCount);
  const longPressEvent = useLongPress({ onLongPress, options });

  return (
    <Layout>
      <HeaderNoti title={"Announcement"} href={"/more"} />
      <div css={styles.wrapper}>
        {/* {(user?.role?.name === "Manager" || user?.role?.name === "Admin") && (
          <div css={styles.actions}>
            <button
              css={styles.actionBtn(true)}
              onClick={() => setAddModal(true)}>
              ADD ANNOUNCEMENT
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
        )} */}
        <div css={styles.searchBox}>
          <input
            type="text"
            placeholder="Search fields"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          <label css={styles.searchIcon}>
            <SearchIcon />
          </label>
        </div>
        <div css={styles.cardContainer}>
          {data?.map((announcement) => {
            return (
                <button style={{border:"none"}}>
                <Card
                  isActive={announcement?.isRead}
                  data={announcement}
                  setEditModal={setEditModal}
                  isEdit={isEdit}
                  isDelete={isDelete}
                  markAsRead={() => markAnnouncementAsRead(announcement.id)}
                  key={announcement.id}
                />
                </button>
            );
          })}
          {data && data.length === 0 && <b css={styles.notFound}>No Results</b>}
        </div>
      </div>
      <AddAnnouncementModal modal={addModal} setModal={setAddModal} />
      <EditAnnouncementModal modal={editModal} setModal={setEditModal} />
      {deleteModal && (
        <DeleteModal
          isOpen={deleteModal}
          close={() => setDeleteModal(!deleteModal)}
        />
      )}
    </Layout>
  );
};

export default Announcement;

const styles = {
  wrapper: css`
    margin: 20px;
  `,
  searchBox: css`
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    @media (min-width: 900px) {
      margin: 40px;
      width: 80%;
    }

    input {
      height: 30px;
      width: 100%;
      padding: 20px 12px;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      flex-shrink: 0;
      border-radius: 10px;
      border: 1px solid var(--dark-gray);
      background: var(--white);
      ::placeholder {
        color: var(--dark-gray);
        font-family: Open Sans;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        padding-left: 18px;
      }
      :focus {
        border: 1px solid var(--primary);
        outline: none;
      }
    }
  `,
  searchIcon: css`
    position: absolute;
    margin: 10px;
  `,
  cardContainer: css`
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-height: 63vh;
    height: 100%;
    overflow-y:scroll;
  `,
  notFound: css`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #b3b3b3;
    font-size: 20px;
    font-weight: 600;
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
};
