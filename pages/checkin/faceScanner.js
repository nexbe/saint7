/** @jsxImportSource @emotion/react */
import React, { useState, useRef, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import HeaderNoti from "../../components/layout/HeaderNoti";
import NotificationBox from "../../components/notification/NotiBox";
import { useRouter } from "next/router";
import * as faceapi from "face-api.js";
import userStore from "../../store/user";
import { useApolloClient, useMutation } from "@apollo/client";
import moment from "moment";
import { CREATE_ATTENDANCE } from "../../graphql/mutations/attendance";
import attendenceStore from "../../store/attendance";
import { setCookie, parseCookies } from "nookies";

const FaceScanner = (props) => {
  const [resultUser, setResultUser] = useState(null);

  const router = useRouter();
  const videoRef = React.useRef();
  const videoHeight = "100%";
  const videoWidth = "100%";
  const apolloClient = useApolloClient();
  const cookies = parseCookies();

  const [createAttendanceAction, errCreateAttendance] = useMutation(
    CREATE_ATTENDANCE,
    {
      onError: (error) => {
        console.log("error", errCreateAttendance);
      },
      onCompleted: async (data) => {
        console.log(data);
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

  const {
    getUserById,
    UserData: user,
    getAssignUsers,
    AssignUsers,
  } = userStore((state) => state);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";

      Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then();
    };
    loadModels();
    startVideo();
  }, []);

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
    if (resultUser == userData?.username) {
      createAttendance({
        createAttendanceAction,
        data: {
          date: moment().format("YYYY-MM-DD"),
          checkInTime: moment().format("HH:mm:ss"),
          address: addressData,
          status: "Progress",
          publishedAt: new Date().toISOString(),
          assignee_shift: AssignUsers[0]?.id,
        },
      });
      router.push({
        pathname: `/attendance`,
      });
    }
  }, [resultUser]);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };

  function getLabeledFaceDescriptions() {
    return Promise.all(
      AssignUsers?.map(async (label) => {
        const descriptions = [];
        const imageUrl =
          label?.attributes.users_permissions_user?.data?.attributes
            ?.facialScanImage?.data?.attributes?.url;
        const img = await faceapi.fetchImage(
          `${process.env.NEXT_PUBLIC_APP_URL}${imageUrl}`
        );

        const detections = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();
        descriptions.push(detections.descriptor);

        return new faceapi.LabeledFaceDescriptors(
          label?.attributes.users_permissions_user?.data?.attributes?.username,

          descriptions
        );
      })
    );
  }

  async function handleVideoOnPlay() {
    let video = videoRef.current;
    if (AssignUsers?.length) {
      const labeledFaceDescriptors = await getLabeledFaceDescriptions();
      const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);
      const canvas = faceapi.createCanvasFromMedia(video);
      // video.parentNode.appendChild(canvas);
      const displaySize = { width: video.width, height: video.height };
      faceapi.matchDimensions(canvas, displaySize);

      const intervalId = setInterval(async () => {
        if (!video.paused && !video.ended) {
          const detections = await faceapi
            .detectAllFaces(video)
            .withFaceLandmarks()
            .withFaceDescriptors();

          const resizedDetections = faceapi.resizeResults(
            detections,
            displaySize
          );

          canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

          const results = resizedDetections.map((d) => {
            return faceMatcher.findBestMatch(d.descriptor);
          });

          setResultUser(results[0]?._label);
          results.forEach((result, i) => {
            const box = resizedDetections[i].detection.box;
            const drawBox = new faceapi.draw.DrawBox(box, {
              label: result.toString(), // Convert the result to a string
            });
            drawBox.draw(canvas);
          });
        } else {
          clearInterval(intervalId); // Stop the recognition when the video pauses or ends
        }
      }, 1000);
    }
  }

  return (
    <>
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
        <video
          ref={videoRef}
          height={videoHeight}
          width={videoWidth}
          onPlay={handleVideoOnPlay}
          autoPlay
          style={{
            borderRadius: "10px",
            transform: "scaleX(-1)", // Apply a 180-degree rotation
          }}
        />
      </div>
    </>
  );
};

export default FaceScanner;
