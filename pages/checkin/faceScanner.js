/** @jsxImportSource @emotion/react */
import React, { useState, useRef, useEffect } from "react";
import HeaderNoti from "../../components/layout/HeaderNoti";
import { useRouter } from "next/router";
import userStore from "../../store/user";
import { useApolloClient, useMutation } from "@apollo/client";
import moment from "moment";
import { CREATE_ATTENDANCE } from "../../graphql/mutations/attendance";
import attendenceStore from "../../store/attendance";
import { setCookie, parseCookies } from "nookies";
import { css } from "@emotion/react";
import GlobalNotiBox from "../../components/notification/GlobalNotiBox";
import { uploadFile } from "../../components/upload/upload";

const FaceScanner = (props) => {
  const [resultUser, setResultUser] = useState(null);

  const router = useRouter();
  const videoHeight = "100%";
  const videoWidth = "100%";

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [stream, setStream] = useState(null);
  const apolloClient = useApolloClient();
  const cookies = parseCookies();
  const {
    getUserById,
    UserData: user,
    getAssignUsers,
    AssignUsers,
    notiData,
    getNotiData,
  } = userStore((state) => state);

  const [createAttendanceAction, errCreateAttendance] = useMutation(
    CREATE_ATTENDANCE,
    {
      onError: (error) => {
        console.log("error", errCreateAttendance);
      },
      onCompleted: async (data) => {
        getNotiData({
          message: "Success!",
          belongTo: "Attendance",
          label: "Facial Recognition Success.",
          action: "none",
          timeout: 5000,
        });
        setCookie(null, "attendance", data?.createAttendance?.data.id, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
      },
    }
  );
  const { createAttendance, addressData, checkInData } = attendenceStore(
    (state) => state
  );

  const userData = cookies.user ? JSON.parse(cookies.user) : null;

  useEffect(() => {
    getUserById({
      apolloClient,
      where: { userId: userData.id },
    });
    getAssignUsers({
      apolloClient,
      where: { userId: userData.id, date: moment().format("YYYY-MM-DD") },
    });
  }, [user]);

  useEffect(() => {
    startCamera();
  }, []);

  useEffect(() => {
    if (resultUser) {
      createAttendance({
        createAttendanceAction,
        data: {
          date: moment().format("YYYY-MM-DD"),
          checkInTime: moment().format("HH:mm:ss"),
          address: addressData,
          status: "Progress",
          publishedAt: new Date().toISOString(),
          assignee_shift: AssignUsers[0]?.id,
          image:resultUser
        },
      });
      router.push({
        pathname: `/attendance`,
      });
    }
  }, [resultUser]);

  const startCamera = async () => {
    try {
      const userMedia = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      setStream(userMedia);
      if (videoRef.current) {
        videoRef.current.srcObject = userMedia;
      }
    } catch (error) {
      console.error("Error accessing the camera:", error);
    }
  };

  const getPhotoId = async (capturedImage) => {
    console.log(capturedImage)
    const base64Image = capturedImage.split(',')[1] || capturedImage;

    // Ensure proper encoding before decoding with atob
    const binaryImage = atob(base64Image);

    const byteArray = new Uint8Array(binaryImage.length);
    for (let i = 0; i < binaryImage.length; i++) {
      byteArray[i] = binaryImage.charCodeAt(i);
    }
    const blob = new Blob([byteArray], { type: 'image/png' });
    const formData = new FormData();
    formData.append("files", blob, 'image.png');
    formData.append("ref", "scan-information");
    const response = await uploadFile(formData);
    let json = await response.json();
    let imageId = json[0].id;
    setResultUser(imageId);
  }
  console.log("=>>",resultUser)
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);
      const capturedImage = canvas.toDataURL("image/png");
      getPhotoId(capturedImage)
    }
  };
  return (
    <>
      <HeaderNoti title={"Check In"} href={"/attendance"} />
      <div style={{ position: "relative", margin: "2px 10px" }}>
        <GlobalNotiBox
          message={notiData?.message}
          belongTo={notiData?.belongTo}
          timeout={5000}
          action={notiData?.action}
          label={notiData?.label}
        />
      </div>
      <div className="text-center container">
        <div className="text-start">
          <h3 style={{ textAlign: "center", color: "#000", marginTop: "20px" }}>
            Step 2{" "}
          </h3>
          <label for="image-description" className="m-3 ">
            Please make sure face is align in the frame.
          </label>
        </div>
        <div css={styles.wrapper}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{
              borderRadius: "5px",
              transform: "scaleX(-1)", // Apply a 180-degree rotation
            }}
          />
          <button css={styles.button} onClick={captureImage}>
            Capture Image
          </button>
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>
      </div>
    </>
  );
};

export default FaceScanner;

const styles = {
  wrapper: css`
    display: flex;
    flex-direction: column;
  `,
  button: css`
    margin-top: 20px;
    margin-top: 5px;
    width: 100%;
    font-size: 18px;
    padding: 4px;
    font-weight: 700;
    border: none;
    border-radius: 5px;
    background: var(--primary);
    color: var(--white);
  `,
};
