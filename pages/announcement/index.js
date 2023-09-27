/** @jsxImportSource @emotion/react */
import React from "react";
import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";
import { css } from "@emotion/react";
import SearchIcon from "../../public/icons/searchIcon";
import Card from "../../components/announcement/Card";

const Announcement = () => {
  return (
    <Layout>
      <HeaderNoti title={"Announcement"} href={"/more"} />
      <div css={styles.wrapper}>
        <div css={styles.searchBox}>
          <input type="text" placeholder="Search fields" />
          <label css={styles.searchIcon}>
            <SearchIcon />
          </label>
        </div>
        <div css={styles.cardContainer}>
        <Card isActive={true}/>
        <Card isActive={true}/>
        <Card isActive={false}/>
        <Card isActive={false}/>
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
  cardContainer:css`
    display:flex;
    flex-direction:column;
    gap:20px;
    max-height: 72vh;
    overflow-y: scroll;
  `
};
