/** @jsxImportSource @emotion/react */
import React from "react";
import Link from "next/link";
import HomeIcon from "../../public/icons/HomeIcon";
import EmergencyIcon from "../../public/icons/EmergencyIcon";
import IssueIcon from "../../public/icons/IssueIcon";
import PatrolIcon from "../../public/icons/PatrolIcon";
import MoreIcon from "../../public/icons/MoreIcon";
import { css } from "@emotion/react";
import HrmIcon from "../../public/icons/hrmIcon";
import OperationIcon from "../../public/icons/operationIcon";
import { useState } from "react";
import { useRouter } from "next/router";
import HrmNavBar from "../../public/icons/hrmNavBarIcon";

const RenderNavLinkItems = ({ href, label, icon, setHandleLink }) => {
  return (
    <Link href={href} css={styles.navLink} onClick={() => setHandleLink(label)}>
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const Navbar = () => {
  const [handleLink, setHandleLink] = useState(null);
  const router = useRouter();
  console.log("here", router);
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
      icon: <HrmNavBar disable={router.pathname == "/HRM"} />,
    },
    {
      id: 2,
      href: "/operation",
      label: "OPS",
      icon: <OperationIcon disable={router.pathname == "/operation"} />,
    },
    {
      id: 3,
      href: "/patrol",
      label: "Patrol",
      icon: <PatrolIcon disable={router.pathname == "/patrol"} />,
    },
    {
      id: 4,
      href: "/more",
      label: "More",
      icon: <MoreIcon disable={router.pathname == "/more"} />,
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
              setHandleLink={setHandleLink}
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
    margin-top: 8px;
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
