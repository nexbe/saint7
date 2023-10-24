/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useApolloClient } from "@apollo/client";
import dayjs from "dayjs";

import Layout from "../../components/layout/Layout";
import NotiIcon from "/public/icons/notiIcon";
import SearchIcon from "../../public/icons/searchIcon";
import AnnouncementIcon from "../../public/icons/announcementIcon";
import TeamIcon from "../../public/icons/teamIcon";
import profileStore from "../../store/profile";
import userStore from "../../store/auth";

const MorePage = () => {
  const router = useRouter();
  const apolloClient = useApolloClient();
  const {
    getAllProfiles,
    ProfileInfo: profileInfo,
    loading,
  } = profileStore((state) => state);
  const { user } = userStore((state) => state);

  useEffect(() => {
    getAllProfiles({
      apolloClient,
      where: { userId: user.id },
    });
  }, [user]);
  console.log("user...", user);

  return (
    <Layout>
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
              <span className="header-text">
                {profileInfo[0]?.firstName} {profileInfo[0]?.lastName}
              </span>
            </div>
          </div>
          <div css={styles.timeText}>
            {dayjs(new Date()).format(" dddd, DD MMMM YYYY")}
          </div>
        </div>
        <div
          css={styles.notiIcon}
          onClick={() => router.push("/notifications")}
        >
          {" "}
          <NotiIcon />
        </div>
      </div>
      <div css={styles.bodyContainer}>
        <Link href={"/announcement"} css={styles.navLink}>
          <AnnouncementIcon />
          <span>Announcement</span>
        </Link>
        {user?.role?.name.toLowerCase() != "guard" && (
          <Link href={"/team"} css={styles.navLink}>
            <TeamIcon />
            <span>Team</span>
          </Link>
        )}
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
  bodyContainer: css`
    display: flex;
    gap: 30px;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
    background: #fff;
    height: 70vh;
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
