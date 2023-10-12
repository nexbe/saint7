/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { FaStar } from "react-icons/fa";

import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";
import SearchIcon from "../../public/icons/searchIcon";

const Team = () => {
  const router = useRouter();
  const [addFavourite, setAddFavourite] = useState(false);
  const teamData = [
    {
      id: "#E-00001",
      name: "John Smith",
    },
    {
      id: "#E-00002",
      name: "William Rodriguez",
    },
    {
      id: "#E-00003",
      name: "Jonah Johnson",
    },
    {
      id: "#E-00004",
      name: "Christopher Young",
    },
    {
      id: "#E-00005",
      name: "Daniel Adams",
    },
    {
      id: "#E-00006",
      name: "Ethan Thompson",
    },
    {
      id: "#E-00007",
      name: "James Collins",
    },
    {
      id: "#E-00008",
      name: "Matthew Campbell",
    },
    {
      id: "#E-00009",
      name: "Michael Turner",
    },
  ];
  const [filterTerm, setFilterTerm] = useState("");
  const [teamList, setTeamList] = useState(teamData);

  const handleFilterChange = (event) => {
    const term = event.target.value;
    setFilterTerm(term);

    // Filter the data based on the filterTerm
    const filteredResults = teamData.filter((item) =>
      item?.name?.toLowerCase().includes(term?.toLowerCase())
    );
    setTeamList(filteredResults);
  };

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
            {teamList?.map((eachMember, index) => {
              return (
                <div
                  key={index}
                  css={styles.teamList}
                  onClick={() => router.push("/profile")}
                >
                  <img src="images/defaultImage.jpg" />
                  <label className="primary-text">{eachMember.name}</label>
                </div>
              );
            })}
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
};
