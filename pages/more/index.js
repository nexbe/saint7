/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import Layout from "../../components/layout/Layout";
import ProfileIcon from "/public/icons/profileIcon";
import NotiIcon from "/public/icons/notiIcon";
import SearchIcon from "../../public/icons/searchIcon";
import AnnouncementIcon from "../../public/icons/announcementIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";

const MorePage = () => {
  const router = useRouter();

  return (
    <Layout>
      <div css={styles.headerContainer}>
        <div>
          <div css={styles.profileInfo}>
            <label>
              <ProfileIcon />
              <span css={styles.welcomeText}>Welcome !</span>
            </label>
            <span className="header-text">John Smith</span>
          </div>
          <div css={styles.timeText}>Friday, 26th May 2023</div>
        </div>
        <div css={styles.notiIcon} onClick={() => router.push("/notifications")}>
          {" "}
          <NotiIcon />
        </div>
      </div>
      <div css={styles.searchBox}>
        <input type="text" placeholder="Search fields" />
        <label css={styles.searchIcon}>
          <SearchIcon />
        </label>
      </div>
      <div css={styles.bodyContainer}>
        <Link href={"/announcement"} css={styles.navLink}>
          <AnnouncementIcon />
          <span>Announcement</span>
        </Link>
      </div>
    </Layout>
  );
};

export default MorePage;

const styles = {
  headerContainer: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 30px;
    margin: 0;
    background: var(--primary);
    min-height: 90px;
    color: var(--white);
    font-family: Inter;
    font-style: normal;
    border-radius: 20px 20px 0 0;
  `,
  profileInfo: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: 600;
    width: 100%;
    .header-text {
      margin-left: 50px;
      margin-top: -20px;
    }
    svg {
      align-items: center;
      width: 50px;
      height: 50px;
    }
    span {
      padding-left: 10px;
    }
  `,
  notiIcon: css`
    cursor: pointer;
  `,
  welcomeText: css`
    font-size: 12px;
    font-weight: 500;
  `,
  timeText: css`
    font-size: 14px;
  `,
  searchBox: css`
    margin: 20px;
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
  bodyContainer: css`
    margin: 20px;
    border-radius: 10px;
    padding: 20px;
    background: #fff;
    height:50vh;
    box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.08);
  `,
  navLink: css`
    display: flex;
    flex-direction: column;
    margin-top: 8px;
    align-items: center;
    font-size: 12px;
    text-decoration: none;
    color: #2f4858;

    @media (min-width: 440px) {
      font-size: 16px;
    }
  `,
};
