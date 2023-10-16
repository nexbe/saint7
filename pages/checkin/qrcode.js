/** @jsxImportSource @emotion/react */
import React from "react";
import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";
import { css } from "@emotion/react";

const QrCode = () => {
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
        <div className="row text-center">
          <img src="/images/qrcode.jpg" alt="ScanFace" className="img-fluid" />
        </div>
      </div>
    </Layout>
  );
};
export default QrCode;
const styles = {
  wrapper: css`
    background: var(--primary);
    color: var(--white);
  `,
};
