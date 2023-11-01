import React from "react";

function EclockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="#2F4858"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 6.75V12h5.25"
      ></path>
      <path
        stroke="#2F4858"
        strokeMiterlimit="10"
        strokeWidth="1.5"
        d="M12 20.25a8.25 8.25 0 100-16.5 8.25 8.25 0 000 16.5z"
      ></path>
      <path
        stroke="#2F4858"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M18.363 2.454l3.182 3.182M2.453 5.636l3.182-3.182"
      ></path>
    </svg>
  );
}

export default EclockIcon;
