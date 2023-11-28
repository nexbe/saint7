/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import Link from "next/link";
import BackArrow from "../../public/icons/backArrow";
import NotiSearchIcon from "../../public/icons/notiSearchIcon";
import SearchIcon from "../../public/icons/searchIcon";
import Card from "../../components/notifications/Card";
import Layout from "../../components/layout/Layout";
import { useEffect } from "react";
import { useApolloClient } from "@apollo/client";
import notiStore from "../../store/notification";
import { parseCookies } from "nookies";
import { AiOutlineClose } from "react-icons/ai";

const Notifications = () => {
  const [searchBox, setSearchBox] = useState(false);
  const [name, setName] = useState();
  const [filterData, setFilterData] = useState();

  const apolloClient = useApolloClient();
  const cookies = parseCookies();
  const userData = cookies.user ? JSON.parse(cookies.user) : null;

  const { getNotibyUser, notiUser, notiFetchData } = notiStore(
    (state) => state
  );

  useEffect(() => {
    getNotibyUser({
      apolloClient,
      where: {
        userId: userData.id,
      },
    });
  }, [notiFetchData]);

  useEffect(() => {
    if (name) {
      const filteredResults = notiUser.filter((item) =>
        item?.attributes.user?.data?.attributes?.username
          ?.toLowerCase()
          .includes(name?.toLowerCase())
      );

      setFilterData(filteredResults);
    } else {
      setFilterData(notiUser);
    }
  }, [name, notiUser]);

  return (
    <Layout>
      <div css={styles.headerWrapper}>
        <Link href={"/home"}>
          <BackArrow />
        </Link>
        {searchBox ? (
          <div css={styles.searchBox}>
            <label css={styles.searchIcon}>
              <SearchIcon />
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label css={styles.crossIcon}>
              <AiOutlineClose
                color={"rgba(123, 123, 123, 1)"}
                size={16}
                onClick={() => {
                  setSearchBox(false);
                  setName("");
                }}
              />
            </label>
          </div>
        ) : (
          <div>Notifications</div>
        )}
        {!searchBox && (
          <div style={{ cursor: "pointer" }} onClick={() => setSearchBox(true)}>
            <NotiSearchIcon />
          </div>
        )}
      </div>
      <div css={styles.bodyWrapper}>
        <div>
          <h4>Notifications</h4>
          {filterData &&
            filterData?.map((noti, index) => {
              const readUsers = noti?.attributes?.read_user?.data;
              const isUserIdIncluded = readUsers.some(
                (obj) => obj.id === userData?.id
              );

              return (
                <div key={index}>
                  <Card
                    isActive={!isUserIdIncluded}
                    notiData={noti}
                    state={noti?.attributes?.status == "In" ? true : false}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;

const styles = {
  headerWrapper: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 5%;
    font-size: 20px;
    font-weight: 700;
    padding: 20px;
    height: 90px;
    color: var(--white);
    background: var(--primary);
  `,
  searchBox: css`
    display: flex;

    align-items: center;
    position: relative;
    width: 100%;

    @media (min-width: 900px) {
      margin: 9px;
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

  crossIcon: css`
    position: absolute;
    margin: 10px;
    right: 0;
  `,
  bodyWrapper: css`
    h4 {
      margin: 20px;
      font-size: 20px;
      font-weight: 600;
      color: var(--primary-font);
    }
    max-height: 82vh;
    overflow-y: scroll;
  `,
};
