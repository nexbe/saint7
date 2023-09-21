/** @jsxImportSource @emotion/react */
import React from "react";
import Link from "next/link";
import HomeIcon from "../../public/icons/HomeIcon";
import EmergencyIcon from "../../public/icons/EmergencyIcon";
import IssueIcon from "../../public/icons/IssueIcon";
import PatrolIcon from "../../public/icons/PatrolIcon";
import MoreIcon from "../../public/icons/MoreIcon";
import { css } from "@emotion/react";

const RenderNavLinkItems = ({ href, label, icon }) => {
  return (
    <Link href={href} css={styles.navLink}>
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const Navbar = () => {
  const icons = [
    {
      id: 0,
      href: "/home",
      label: "Home",
      icon: <HomeIcon />,
    },
    {
      id: 1,
      href: "/emergency",
      label: "Emergency",
      icon: <EmergencyIcon />,
    },
    {
      id: 2,
      href: "/issues",
      label: "Issues",
      icon: <IssueIcon />,
    },
    {
      id: 3,
      href: "/patrol",
      label: "Patrol",
      icon: <PatrolIcon />,
    },
    {
      id: 4,
      href: "/more",
      label: "More",
      icon: <MoreIcon />,
    },
  ];
  return (
    <nav css={styles.wrapper}>
      {icons &&
        icons.map((icon) => {
          return (
            <RenderNavLinkItems
              href={icon.href}
              label={icon.label}
              icon={icon.icon}
              key={icon.id}
            />
          );
        })}
    </nav>
  );
};

export default Navbar;

const styles = {
  wrapper: css`
    display: flex;
    flex-direction: row;
    gap: 30px;
    justify-content: center;
    align-items: center;
    background: #fff;
    color: #2f4858;
    padding: 20px;
    box-shadow: 1px 1px 5px 3px rgba(0, 0, 0, 0.08);
    border-radius: 0px 0px 30px 30px;
    position: absolute;
    bottom: 0;
    width: 100%;

    @media (min-width: 440px) {
      width: 100%;
      justify-content: space-evenly;
    }
  `,
  navLink: css`
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 4px;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    text-decoration: none;
    color: #2f4858;

    @media (min-width: 440px) {
      font-size: 16px;
    }
  `,
};
