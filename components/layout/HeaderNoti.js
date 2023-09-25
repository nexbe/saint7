/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import BackArrow from "../../public/icons/backArrow";
import NotiIcon from "../../public/icons/notiIcon";
import Link from "next/link";

const HeaderNoti = ({ title, href }) => {
  return (
    <div css={styles.wrapper}>
      <Link href={href}>
        <BackArrow />
      </Link>
      {title}
      <NotiIcon />
    </div>
  );
};

export default HeaderNoti;

const styles = {
  wrapper: css`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    gap: 20%;
    font-size: 20px;
    font-weight: 700;
    padding: 30px;
    color: var(--white);
    background: var(--primary);
  `,
};
