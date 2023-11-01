/** @jsxImportSource @emotion/react */
import Layout from "../../components/layout/Layout";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useApolloClient } from "@apollo/client";
import dayjs from "dayjs";

import NotiIcon from "/public/icons/notiIcon";
import profileStore from "../../store/profile";
import userStore from "../../store/auth";
import attendenceStore from "../../store/attendance";
import { useState } from "react";
import SiteIcon from "../../public/icons/siteIcon";
import ArrowUpIcon from "/public/icons/ArrowUpIcon";
import ArrowDownIcon from "/public/icons/ArrowDownIcon";
import SuperVisorIcon from "../../public/icons/superVisorIcon";
import { siteData } from "../../utils/mock";
import DocumentIcon from "/public/icons/documentIcon";
import EsuperVisorIcon from "../../public/icons/eSuperVisorIcon";
import SopIcon from "../../public/icons/sopIcon";

const Home = () => {
  const router = useRouter();
  const apolloClient = useApolloClient();
  const {
    getAllProfiles,
    ProfileInfo: profileInfo,
    loading,
  } = profileStore((state) => state);

  const { user } = userStore((state) => state);

  const [userData, setUserData] = useState();
  const [openhandle, setOpenHandle] = useState(false);
  const [sopHandle, setSopHandle] = useState(false);
  const [eHandle, setEHandle] = useState(false);

  const {
    locationData: locationData,
    getAddressData,
    getLocationData,
    addressData,
  } = attendenceStore((state) => state);

  useEffect(() => {
    setUserData(user);
  }, []);

  useEffect(() => {
    getAllProfiles({
      apolloClient,
      where: { userId: user.id },
    });
  }, [user]);

  return (
    <Layout>
      <div css={styles.wrapper}>
        <div css={styles.headerContainer}>
          <div>
            <div className="d-flex" css={styles.profileInfo}>
              <label>
                <img
                  src={
                    profileInfo[0]?.photo?.url
                      ? `${process.env.NEXT_PUBLIC_APP_URL}${profileInfo[0]?.photo.url}`
                      : "images/defaultImage.jpg"
                  }
                />
              </label>
              <div className="d-flex" style={{ flexDirection: "column" }}>
                <span css={styles.welcomeText}>Welcome !</span>
                <span className="header-text">{userData?.username}</span>
              </div>
            </div>
            <div css={styles.timeText}>
              {dayjs(new Date()).format(" dddd, DD MMMM YYYY")}
            </div>
          </div>
          <div
            onClick={() => router.push("/notifications")}
            style={{ cursor: "pointer" }}
          >
            <NotiIcon />
          </div>
        </div>

        <div css={styles.bodyContainer}>
          <h1 css={styles.headerHrm}>Operations</h1>
          <div css={styles.buttonContainer}>
            <div css={styles.buttonWarp}>
              <div css={styles.buttonDiv}>
                <div css={styles.iconWarp}>
                  <SiteIcon />
                  <p css={styles.labelText}>Sites</p>
                </div>
                <div onClick={() => setOpenHandle(!openhandle)}>
                  {openhandle ? <ArrowUpIcon /> : <ArrowDownIcon />}
                </div>
              </div>

              {openhandle ? (
                <>
                  {siteData?.map((data, index) => (
                    <div css={styles.formFlexDiv} key={index}>
                      <div css={styles.formFlexChildDiv}>
                        <button
                        // onClick={() => {
                        //   router.push({
                        //     pathname: data?.router,
                        //   });
                        // }}
                        >
                          {data?.icon}
                          {data.name}
                        </button>
                      </div>
                    </div>
                  ))}
                  <div css={styles.formFlexDiv}>
                    <div css={styles.formFlexChildDiv}>
                      <button
                      // onClick={() => {
                      //   router.push({
                      //     pathname: data?.router,
                      //   });
                      // }}
                      >
                        <SopIcon />
                        SOP
                      </button>
                      <div
                        style={{ marginRight: 20 }}
                        onClick={() => setSopHandle(!sopHandle)}
                      >
                        {sopHandle ? <ArrowUpIcon /> : <ArrowDownIcon />}
                      </div>
                    </div>
                  </div>
                  {sopHandle ? (
                    <>
                      <div css={styles.formFlexDiv}>
                        <div css={styles.formFlexChildDiv2}>
                          <button
                          // onClick={() => {
                          //   router.push({
                          //     pathname: data?.router,
                          //   });
                          // }}
                          >
                            Standard SOP
                          </button>
                        </div>
                      </div>
                      <div css={styles.formFlexDiv}>
                        <div css={styles.formFlexChildDiv2}>
                          <button
                          // onClick={() => {
                          //   router.push({
                          //     pathname: data?.router,
                          //   });
                          // }}
                          >
                            Client SOP
                          </button>
                        </div>
                      </div>
                    </>
                  ) : null}
                </>
              ) : null}
            </div>
            <div css={styles.buttonWarp}>
              <div css={styles.buttonDiv}>
                <div css={styles.iconWarp}>
                  <SuperVisorIcon />
                  <p css={styles.labelText}>E-Supervisor</p>
                </div>
                <div onClick={() => setEHandle(!eHandle)}>
                  {eHandle ? <ArrowUpIcon /> : <ArrowDownIcon />}
                </div>
              </div>
              {eHandle ? (
                <div css={styles.formFlexDiv}>
                  <div css={styles.formFlexChildDiv}>
                    <button
                    // onClick={() => {
                    //   router.push({
                    //     pathname: data?.router,
                    //   });
                    // }}
                    >
                      <EsuperVisorIcon />
                      E-Supervisor
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

const styles = {
  wrapper: css`
    flex: 1 1 auto;
    height: 0px;
    display: flex;
    flex-direction: column;
    margin: 0;
    background: var(--background);
  `,
  headerContainer: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    font-size: 20px;
    font-weight: 700;
    padding: 20px;
    color: var(--white);
    background: var(--primary);
    line-height: 20px;
    height: 90px;
  `,
  profileInfo: css`
    padding-top: 5px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 40px;
    }
    span {
      padding-left: 15px;
    }
  `,
  welcomeText: css`
    font-size: 12px;
    font-weight: 500;
  `,
  timeText: css`
    font-size: 14px;
    padding-top: 5px;
  `,

  headerHrm: css`
    color: var(-primary);
    font-family: Inter;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
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
    @media (max-width: 1400px) {
      margin: 20px;
    }
    @media (min-width: 1400px) {
      margin: 30px;
    }
  `,

  buttonContainer: css`
    width: 100%;
    height: 100%;
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    gap: 20px;
  `,
  buttonWarp: css`
    display: flex;
    flex-direction: column;
    width: 100%;
  `,
  buttonDiv: css`
    display: flex;
    flex-direction: row;
    width: 95%;
    margin-bottom: 15px;
    cursor: pointer;
  `,
  iconWarp: css`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    gap: 10px;
    align-items: center;
  `,

  labelText: css`
    color: var(--primary);
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    margin-bottom: 0px;
    font-family: Open Sans;
  `,
  formFlexDiv: css`
    display: flex;
    justify-content: fit-content;
    width: 100%;
    flex-direction: row;
    margin: 5px 0;
  `,
  formFlexChildDiv: css`
    width: 100%;
    display: flex;
    border-radius: 15px;
    border: none;
    background: var(--white);
    flex-direction: row;
    align-items: center;
    button {
      color: var(--primary-font);
      text-align: center;
      font-family: Open Sans;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      padding: 15px;
      border-radius: 10px;
      border: none;
      background: var(--white);
      display: flex;
      flex-direction: row;

      align-items: center;
      height: 56px;
      gap: 15px;
      box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.08);
      @media (max-width: 1400px) {
        width: 100%;
      }
      @media (min-width: 1400px) {
        width: 100%;
      }
    }
    @media (max-width: 1400px) {
      width: 100%;
    }
    @media (max-width: 1200px) {
      width: 100%;
    }
    @media (max-width: 992px) {
      width: 100%;
    }
  `,

  formFlexChildDiv2: css`
    width: 100%;
    display: flex;
    border-radius: 15px;
    border: none;
    background: var(--white);
    flex-direction: row;
    align-items: center;
    margin-left: 20px;
    button {
      color: var(--primary-font);
      text-align: center;
      font-family: Open Sans;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      padding: 15px;
      border-radius: 10px;
      border: none;
      background: var(--white);
      display: flex;
      flex-direction: row;

      align-items: center;
      height: 50px;
      gap: 15px;
      box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.08);
      @media (max-width: 1400px) {
        width: 100%;
      }
      @media (min-width: 1400px) {
        width: 100%;
      }
    }
    @media (max-width: 1400px) {
      width: 100%;
    }
    @media (max-width: 1200px) {
      width: 100%;
    }
    @media (max-width: 992px) {
      width: 100%;
    }
  `,
  transitionDiv: css`
    transition: max-height 0.3s ease-in-out;
    overflow: hidden;
    max-height: 0;
  `,
};
