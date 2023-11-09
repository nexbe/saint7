/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { useApolloClient } from "@apollo/client";
import { useEffect, useState } from "react";
import userStore from "../../store/user";
import SearchIcon from "../../public/icons/searchIcon";
import RefreshIcon from "/public/icons/refreshIcon";
import CalendarIcon from "/public/icons/calendarIcon";
import DateFilterModal from "../../components/claims/DateFilterModal";

const PayUser = () => {
  const apolloClient = useApolloClient();
  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [filterTerm, setFilterTerm] = useState("");
  const [payData, setPayData] = useState([]);
  const { getuserByRole, roleUserData, getPaySlipData } = userStore(
    (state) => state
  );
  useEffect(() => {
    getuserByRole({
      apolloClient,
      where: { role: 3 },
    });
  }, []);

  useEffect(() => {
    if (filterTerm) {
      const filteredResults = roleUserData.filter((item) =>
        item?.attributes.username
          ?.toLowerCase()
          .includes(filterTerm?.toLowerCase())
      );

      setPayData(filteredResults);
    } else {
      setPayData(roleUserData);
    }
  }, [filterTerm, roleUserData]);

  const handleFilterChange = (event) => {
    setFilterTerm(event.target.value);
  };

  const handleRefresh = () => {
    setFilterTerm("");
  };

  const dateModal = () => {
    setDateModalOpen(!dateModalOpen);
  };

  const handleDateChange = (startDate, endDate) => {};

  const handleClick = (userData) => {
    getPaySlipData(userData?.id);
    router.push(`/payslip/Manager/history`);
  };

  const router = useRouter();
  return (
    <div style={{ height: 0 }}>
      <div css={styles.filterContainer}>
        <input
          type="text"
          placeholder="Search fields"
          value={filterTerm}
          onChange={handleFilterChange}
        />
        <label css={styles.searchIcon}>
          <SearchIcon />
        </label>
        <div>
          <button
            style={{ border: "none", background: "none" }}
            onClick={handleRefresh}
          >
            <RefreshIcon />
          </button>
        </div>

        <div>
          <button
            onClick={dateModal}
            style={{ border: "none", background: "none" }}
          >
            <CalendarIcon />
          </button>
          {dateModalOpen && (
            <DateFilterModal
              isOpen={dateModalOpen}
              close={() => setDateModalOpen(!dateModalOpen)}
              handleDateChange={handleDateChange}
            />
          )}
        </div>
      </div>

      <div css={styles.wrapper}>
        {payData.length
          ? payData?.map((userData, index) => (
              <div css={styles.listWrapper} key={index}>
                <div css={styles.nameBox}>
                  <img
                    src={
                      userData?.attributes?.facialScanImage?.data?.attributes
                        ?.url
                        ? `${process.env.NEXT_PUBLIC_APP_URL}${userData?.attributes?.facialScanImage?.data?.attributes?.url}`
                        : `${process.env.NEXT_PUBLIC_APP_URL}/uploads/default_Image_49ed37eb5a.jpg`
                    }
                    css={styles.profile}
                  />
                  <p>{userData?.attributes?.username}</p>
                </div>
                <div css={styles.viewBox} onClick={() => handleClick(userData)}>
                  <p>View Details</p>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default PayUser;

const styles = {
  wrapper: css`
    display: flex;
    flex-direction: column;
    gap: 9px;
    margin: 20px;
    max-height: 80vh;
    // overflow-y: scroll;
    color: #000;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    ::-webkit-scrollbar {
      width: 2px;
      background-color: transparent;
    }
    .bodyContainer::-webkit-scrollbar-thumb {
      border-radius: 2px;
      background-color: var(--font-gray);
    }
  `,

  listWrapper: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    p {
      margin-bottom: 0px;
    }
  `,

  nameBox: css`
    display: flex;
    align-items: center;
    p {
      margin-left: 10px;
      color: #386fff;
      font-family: Inter;
      font-size: 14px;
    }
  `,
  viewBox: css`
    color: #293991;
    pointer: cursor;
    p {
      font-size: 14px;
      font-weight: 600;
      font-family: Inter;
    }
  `,

  profile: css`
    width: 35px;
    height: 35px;
    border-radius: 50%;
  `,
  filterContainer: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 20px 25px 5px 20px;
    input {
      height: 40px;
      width: 70%;
      padding: 9px 12px;
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
};
