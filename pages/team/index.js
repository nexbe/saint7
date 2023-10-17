/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { FaStar } from "react-icons/fa";
import { useEffect } from "react";
import { useApolloClient } from "@apollo/client";

import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";
import SearchIcon from "../../public/icons/searchIcon";
import userStore from "../../store/user";
import authStore from "../../store/auth";
import NoDataIcon from "/public/icons/noDataIcon";

const Team = () => {
  const router = useRouter();
  const apolloClient = useApolloClient();
  const { getAllUsers, UserInfo: userInfo } = userStore((state) => state);
  const { user } = authStore((state) => state);
  const [addFavourite, setAddFavourite] = useState(false);
  const [filterTerm, setFilterTerm] = useState("");

  useEffect(() => {
    getAllUsers({
      apolloClient,
      where: {},
    });
  }, [user]);

  const handleFilterChange = (event) => {
    const term = event.target.value;
    setFilterTerm(term);
  };

  const teamLists = !!filterTerm
    ? userInfo.filter(
        (item) =>
          item?.profile.firstName
            ?.toLowerCase()
            .includes(filterTerm?.toLowerCase()) ||
          item?.profile.lastName
            ?.toLowerCase()
            .includes(filterTerm?.toLowerCase())
      )
    : userInfo;

  return (
    <Layout>
      <div css={styles.wrapper}>
        <HeaderNoti title={"Team"} href={"/more"} />
        <div css={styles.bodyContainer}>
          <div css={styles.searchBox}>
            <input
              type="text"
              placeholder="Search fields"
              value={filterTerm}
              onChange={handleFilterChange}
            />
            <label css={styles.searchIcon}>
              <SearchIcon />
            </label>
          </div>
          <div css={styles.teamContainer}>
            <div css={styles.teamHeader}>
              <label>Team Members</label>
              <FaStar
                size={20}
                color={addFavourite ? "#FA7E0B" : "#B3B3B3"}
                onClick={() => {
                  setAddFavourite(!addFavourite);
                }}
              />
            </div>
            {teamLists &&
              teamLists?.map((eachMember, index) => {
                return (
                  <div
                    key={index}
                    css={styles.teamList}
                    onClick={() =>
                      router.push({
                        pathname: "/profile",
                        query: {
                          userId: eachMember?.id,
                          message: "Team",
                        },
                      })
                    }
                  >
                    <img
                      src={
                        eachMember?.profile?.photo?.url
                          ? `${process.env.NEXT_PUBLIC_APP_URL}${eachMember?.profile?.photo.url}`
                          : "images/defaultImage.jpg"
                      }
                    />
                    <label className="primary-text">
                      {!!eachMember?.profile?.firstName ||
                      !!eachMember?.profile?.lastName
                        ? eachMember?.profile?.firstName +
                          " " +
                          eachMember?.profile?.lastName
                        : eachMember?.username}
                    </label>
                  </div>
                );
              })}
            {teamLists && teamLists.length == 0 && (
              <div css={styles.noDataContainer} className="primary-text">
                <NoDataIcon />
                <label>Nothing Here to show</label>
                <label>You don’t have any report request</label>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Team;

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
    margin: 20px;
    gap: 12px;
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
  searchBox: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    @media (min-width: 900px) {
      margin: 40px;
      width: 80%;
    }

    input {
      height: 40px;
      width: 100%;
      padding: 5px 12px;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      flex-shrink: 0;
      border-radius: 10px;
      border: 1px solid var(--dark-gray);
      background: var(--white);
      padding-left: 35px;
      ::placeholder {
        color: var(--dark-gray);
        font-family: Open Sans;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
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
  teamContainer: css`
    display: flex;
    flex-direction: column;
    gap: 10px;
    cursor: pointer;
  `,
  teamHeader: css`
    display: flex;
    justify-content: space-between;
    color: var(--light-gray);
    font-size: 16px;
  `,
  teamList: css`
    display: flex;
    gap: 10px;
    label {
      font-weight: 400;
    }
    img {
      width: 30px;
      height: 30px;
      border-radius: 40px;
    }
  `,
  noDataContainer: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
};
