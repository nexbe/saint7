/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";
import { css } from "@emotion/react";
import SearchIcon from "../../public/icons/searchIcon";
import Card from "../../components/announcement/Card";
import useAnnouncement from "../../store/announcement";

const Announcement = () => {
  const { announcements, fetchAnnouncements, markAnnouncementAsRead } =
    useAnnouncement();
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState([]);
  // console.log("=>", announcements);
  useEffect(() => {
    fetchAnnouncements();
  }, []);
 
  useEffect(() => {
    setData(announcements);
  }, [announcements]);
  
  useEffect(() => {
    const filteredData = data.filter((data) => {
      return data.attributes?.title?.toLowerCase()?.includes(searchValue?.toLowerCase())
    })
    //console.log(searchValue)
    setData(searchValue === "" ? announcements : filteredData);

  },[searchValue])

  return (
    <Layout>
      <HeaderNoti title={"Announcement"} href={"/more"} />
      <div css={styles.wrapper}>
        <div css={styles.searchBox}>
          <input type="text" placeholder="Search fields" onChange={(e) => setSearchValue(e.target.value)} value={searchValue} />
          <label css={styles.searchIcon}>
            <SearchIcon />
          </label>
        </div>
        <div css={styles.cardContainer}>
          {data?.map((announcement) => {
            return (
              <Card
                isActive={announcement?.isRead}
                data={announcement}
                markAsRead={() => markAnnouncementAsRead(announcement.id)}
                key={announcement.id}
              />
            );
          })}
        </div>
      </div>
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
    max-height: 72vh;
    overflow-y: scroll;
  `,
};
