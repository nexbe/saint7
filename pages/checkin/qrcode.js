/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";
import { css } from "@emotion/react";

const QrCode = (props) => {
  const [data, setData] = useState("No result");

  return (
    <Layout className="container ">
      <HeaderNoti title={"Check In"} href={"/attendance"} />
      <div className="text-center container">
        <div className="text-start">
          <h3 style={{ textAlign: "center", color: "#000", marginTop: "20px" }}>
            Step 1{" "}
          </h3>
          <label for="image-description" className="m-3 ">
            Please scan the QR Code to check out.
          </label>
        </div>
        <>
          <QrReader
            onResult={(result, error) => {
              if (!!result) {
                setData(result?.text);
              }

              if (!!error) {
                console.info(error);
              }
            }}
            style={{ width: "100%" }}
          />
        </>
      </div>
    </Layout>
  );
};

export default QrCode;
