/** @jsxImportSource @emotion/react */

import Link from "next/link";
import HomeIcon from "../../public/icons/HomeIcon";
import PatrolIcon from "../../public/icons/PatrolIcon";
import MoreIcon from "../../public/icons/MoreIcon";
import { css } from "@emotion/react";
import { useState } from "react";
import { useRouter } from "next/router";
import HrmNavBar from "../../public/icons/hrmNavBarIcon";
import HrmNavBarActive from "../../public/icons/hrmNavBarActive";
import OPSactiveIcon from "../../public/icons/opsActiveIcon";
import OPSIcon from "../../public/icons/opsIcon";
import UserIcon from "/public/icons/userIcon";
import NavUserIcon from "../../public/icons/navUserIcon";
import SettingIcon from "../../public/icons/settingIcon";
import NavUserActiveIcon from "../../public/icons/navUserActiveIcon";
import SettingActiveIcon from "../../public/icons/settingActiveIcon";

const RenderNavLinkItems = ({ href, label, icon }) => {
  const router = useRouter();

  return (
    <Link
      href={href}
      css={[
        styles.navLink,
        {
          color: router.pathname == href ? "#293991" : "#2f4858",
        },
      ]}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const Navbar = () => {
  const router = useRouter();

  const icons = [
    {
      id: 0,
      href: "/home",
      label: "Home",
      icon: <HomeIcon disable={router.pathname == "/home"} />,
    },
    {
      id: 1,
      href: "/HRM",
      label: "HRM",
      icon: router.pathname == "/HRM" ? <HrmNavBarActive /> : <HrmNavBar />,
    },

    {
      id: 2,
      href: "/operation",
      label: "OPS",
      icon: router.pathname == "/operation" ? <OPSactiveIcon /> : <OPSIcon />,
    },
    {
      id: 3,
      href: "/profile",
      label: "Profile",
      icon:
        router.pathname == "/profile" ? <NavUserActiveIcon /> : <NavUserIcon />,
    },
    {
      id: 4,
      href: "/settings",
      label: "Settings",
      icon:
        router.pathname == "/settings" ? (
          <SettingActiveIcon />
        ) : (
          <SettingIcon />
        ),
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
    @media (min-width: 440px) {
      width: 100%;
      justify-content: space-between;
    }
    display: flex;
    flex-direction: row;
    height: 65px;
    text-align: center;
    justify-content: space-between;
    background: var(--white);
    box-shadow: 1px 1px 5px 3px rgba(0, 0, 0, 0.08);
    margin-top: auto;
    gap: 30px;
    width: 100%;
    padding: 0 10px;
  `,
  navLink: css`
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-top: 7px;

    justify-content: center;
    align-items: center;
    font-size: 12px;
    text-decoration: none;

    @media (min-width: 440px) {
      font-size: 12px;
    }
  `,
};
