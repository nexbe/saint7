/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import userStore from "../../store/user";
import { QrReader } from "react-qr-reader";
import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";
import { useRouter } from "next/router";
import NotificationBox from "../../components/notification/NotiBox";
import { useEffect } from "react";

const QrCode = (props) => {
  const router = useRouter();
  const { AssignUsers, getNotiData } = userStore((state) => state);
  const [resultData, setResultData] = useState();

  useEffect(() => {
    if (
      AssignUsers[0]?.attributes?.site?.data?.attributes?.checkpoints.some(
        (item) => item.UUID === resultData?.CheckpointUUID
      )
    ) {
      getNotiData({
        message: "Success!",
        belongTo: "Attendance",
        label: "QR Code Recognition Success.",
        action: "none",
        timeout: 5000,
      });
      router.push({
        pathname: `/checkin/faceScanner`,
      });
    }
  }, [resultData]);

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
                const resultData = JSON.parse(result.text);
                setResultData(resultData);
              } else {
                setResultData();
              }
            }}
            style={{
              width: "100%",
            }}
            constraints={{
              facingMode: "environment",
            }}
          />
        </>
      </div>
    </Layout>
  );
};

export default QrCode;
