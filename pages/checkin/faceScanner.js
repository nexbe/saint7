/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";
import { css } from "@emotion/react";
import NotificationBox from "../../components/notification/NotiBox";
import { useRouter } from "next/router";

const FaceScanner = (props) => {
  const router = useRouter();

  return (
    <Layout className="container ">
      <HeaderNoti title={"Check In"} href={"/attendance"} />
      <div className="text-center container">
        {/* <div style={{ position: "relative", margin: "2px 10px" }}>
          <NotificationBox
            message={router.query.message}
            belongTo={router.query.belongTo}
            timeout={5000}
            action={router.query.action}
            label={router.query.action}
          />
        </div> */}
        <div className="text-start">
          <h3 style={{ textAlign: "center", color: "#000", marginTop: "20px" }}>
            Step 2{" "}
          </h3>
          <label for="image-description" className="m-3 ">
            Please make sure face is align in the frame.
          </label>
        </div>
        {/* <>
          <QrReader
            onResult={(result, error) => {
              if (!!result) {
                console.log("result", result);
              }

              if (!!error) {
                console.info(error);
              }
            }}
            style={{ width: "100%" }}
            facingMode="environment"
          />
        </> */}
      </div>
    </Layout>
  );
};

export default FaceScanner;
