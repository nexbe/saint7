import React from "react";

function BellIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="22"
      fill="none"
      viewBox="0 0 21 22"
    >
      <path fill="#DEDEDE" d="M0 0H21V22H0z"></path>
      <g>
        <g filter="url(#filter0_dd_0_1)">
          <mask id="path-1-inside-1_0_1" fill="#fff">
            <path d="M-16-6a4 4 0 014-4h404a4 4 0 014 4v52a4 4 0 01-4 4H-12a4 4 0 01-4-4V-6z"></path>
          </mask>
          <path
            fill="#fff"
            d="M-16-6a4 4 0 014-4h404a4 4 0 014 4v52a4 4 0 01-4 4H-12a4 4 0 01-4-4V-6z"
          ></path>
          <path
            fill="#599CFF"
            d="M-16-10h412-412zm412 60H-16h412zm-408 0a6 6 0 01-6-6V-4a6 6 0 016-6c-1.105 0-2 1.79-2 4v52c0 2.21.895 4 2 4zm408-60v60-60z"
            mask="url(#path-1-inside-1_0_1)"
          ></path>
        </g>
        <g>
          <path
            fill="#599CFF"
            d="M17.875 17.415v.917H2.554v-.917l1.702-1.833v-5.5c0-2.842 1.728-5.344 4.256-6.15v-.267c0-.486.18-.952.499-1.296.32-.344.752-.537 1.204-.537.451 0 .884.193 1.203.537.32.344.5.81.5 1.296v.266c2.527.807 4.255 3.31 4.255 6.151v5.5l1.702 1.833zm-5.958 1.834c0 .486-.18.952-.499 1.296-.319.344-.752.537-1.203.537-.452 0-.885-.193-1.204-.537a1.908 1.908 0 01-.499-1.296m8.3-16.326l-1.21 1.302a8.294 8.294 0 011.682 2.683 8.783 8.783 0 01.591 3.174h1.703c0-2.686-.988-5.27-2.767-7.16zM.851 10.082h1.702c0-2.2.817-4.308 2.273-5.857L3.618 2.923a10.124 10.124 0 00-2.05 3.28 10.721 10.721 0 00-.716 3.879z"
          ></path>
        </g>
      </g>
      <defs>
        <filter
          id="filter0_dd_0_1"
          width="432"
          height="80"
          x="-25"
          y="-21"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset dx="-1" dy="1"></feOffset>
          <feGaussianBlur stdDeviation="2"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"></feColorMatrix>
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_0_1"
          ></feBlend>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset dx="1" dy="-1"></feOffset>
          <feGaussianBlur stdDeviation="5"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"></feColorMatrix>
          <feBlend
            in2="effect1_dropShadow_0_1"
            result="effect2_dropShadow_0_1"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect2_dropShadow_0_1"
            result="shape"
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
}

export default BellIcon;
