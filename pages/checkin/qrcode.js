/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";
import { useRouter } from "next/router";
import NotificationBox from "../../components/notification/NotiBox";

const QrCode = (props) => {
  const [message, setMessage] = useState("");
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
          />
        </div> */}
        <div className="text-start">
          <h3 style={{ textAlign: "center", color: "#000", marginTop: "20px" }}>
            Step 1{" "}
          </h3>
          <label for="image-description" className="m-3 ">
            Please scan the QR Code to check in.
          </label>
        </div>
        <>
          <QrReader
            onResult={(result, error) => {
              if (!!result) {
                router.push({
                  pathname: `/checkin/faceScanner`,
                  // query: {
                  //   message: "Success!",
                  //   belongTo: "Attendance",
                  //   label: "QR Code Recognition Success.",
                  //   action: "none",
                  // },
                });
              }
            }}
            style={{
              width: "100%",
            }}
            facingMode="environment"
          />
        </>
      </div>
    </Layout>
  );
};

export default QrCode;
