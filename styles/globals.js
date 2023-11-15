import { css, Global } from "@emotion/react";

export default function NavStyle({ children }) {
  return (
    <>
      <Global
        styles={css`
          @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Open+Sans:wght@400;500;600&display=swap");

          :root {
            /* colors */
            --primary: #293991;
            --secondary: #e3f3ff;
            --white: #fff;
            --background: #f5f5f5;
            --primary-font: #2f4858;
            --font-gray: #383838;
            --dark-gray: #a0aec0;
            --darker-gray: #718096;
            --light-gray: #7b7b7b;
            --lighter-gray: #576b77;
            --blue: #386fff;
            --light-gray2: #d9d9d9;

            /* media breakpoints */
            --device-sm: 576px;
            --device-md: 768px;
            --device-lg: 992px;
            --device-xl: 1200px;
            --device-xxl: 1400px;
          }

          html {
            height: 100%;
          }

          body {
            font-family: "Open Sans", sans-serif;
            line-height: 2;
            /*background: #ffffff;*/
            background: #f2f5fc;
            color: var(--primary);
            overflow: auto !important;
          }

          * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
          }
          .button {
            padding: 10px 59px;
            border-radius: 16px;
            font-weight: 700;
            font-size: 18px;
            cursor: pointer;
            max-width: 400px;
            min-width: 350px;
            font-family: "Inter", sans-serif;
          }

          .button-block {
            width: 100%;
          }
          .b-primary {
            color: #fff;
            background: var(--primary);
            border: 1px solid var(--primary);
          }
          .b-secondary {
            background: #fff;
            border: 1px solid var(--primary);
            color: var(--primary);
          }

          .primary-text {
            font-size: 16px;
            color: var(--primary-font);
            font-weight: 600;
            font-family: "Inter", sans-serif;
          }

          .header-text {
            font-size: 20px;
            color: var(--white);
            font-weight: 600;
            font-family: "Inter", sans-serif;
          }
          .secondary-text {
            font-size: 14px;
            color: var(--primary-font);
            font-weight: 600;
            font-family: "Open Sans", sans-serif;
          }
        `}
      />
      {children}
    </>
  );
}
