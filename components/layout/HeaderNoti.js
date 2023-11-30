/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import BackArrow from "../../public/icons/backArrow";
import NotiIcon from "../../public/icons/notiIcon";
import Link from "next/link";
import { useRouter } from "next/router";

const HeaderNoti = ({ title, href }) => {
  const router = useRouter();

  return (
    <div css={styles.wrapper}>
      <div onClick={() => router.back()} style={{ cursor: "pointer" }}>
        <BackArrow />
      </div>
      {title}
      <Link href={"/notifications"}>
        <NotiIcon />
      </Link>
    </div>
  );
};

export default HeaderNoti;

const styles = {
  wrapper: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    white-space: nowrap;
    gap: 5px;
    font-size: 20px;
    font-weight: 700;
    padding: 10px;
    height: 90px;
    color: var(--white);
    background: var(--primary);
  `,
};
