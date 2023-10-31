/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { RiBuildingLine } from "react-icons/ri";
import MapPineLineIcon from "../../public/icons/mapPineLineIcon";
import attendenceStore from "../../store/attendance";
import { setCookie, parseCookies } from "nookies";
import { useEffect } from "react";
import { useApolloClient, useMutation } from "@apollo/client";
import moment from "moment";
import { format } from "util";
import { UPDATE_ATTENDANCE } from "../../graphql/mutations/attendance";

const Profile = () => {
  const cookies = parseCookies();
  const attendanceId = cookies.attendance
    ? JSON.parse(cookies.attendance)
    : null;
  const apolloClient = useApolloClient();
  const [updateAttendanceAction, errUpdateAttendance] = useMutation(
    UPDATE_ATTENDANCE,
    {
      onError: (error) => {
        console.log("error", errUpdateAttendance);
      },
      onCompleted: async (data) => {
        setCookie(null, "attendance", null, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
      },
    }
  );

  const {
    AttendanceUser: AttendanceUser,
    getAttendanceUser,
    updateAttendance,
  } = attendenceStore((state) => state);

  useEffect(() => {
    getAttendanceUser({
      apolloClient,
      where: { id: attendanceId },
    });
  }, []);

  const handleCheckOut = async () => {
    await updateAttendance({
      updateAttendanceAction,
      id: attendanceId,
      attendanceData: {
        status: "Complete",
        checkOutTIme: moment().format("HH:mm:ss"),
      },
      updatedAt: new Date().toISOString(),
    });
    // setCookie(null, "attendance", null, {
    //   maxAge: 30 * 24 * 60 * 60,
    //   path: "/",
    // });
  };

  const formatTime = (timeString) => {
    const timeParts = timeString?.split(":"); // Split the string by colon

    // Extract hours and minutes
    const hours = timeParts[0];
    const minutes = timeParts[1];
    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
  };

  return (
    <div css={styles.wrapper}>
      <div css={styles.profileContent}>
        <div css={styles.attachBox}>
          <img src={"images/defaultImage.jpg"} />
        </div>
        <p style={{ marginTop: "5px" }}>
          <label className="header-text">
            {
              AttendanceUser?.attributes?.assignee_shift?.data?.attributes
                ?.users_permissions_user?.data?.attributes?.username
            }
          </label>
          <label className="secondary-text">
            Employee ID:
            {
              AttendanceUser?.attributes?.assignee_shift?.data?.attributes
                ?.users_permissions_user?.data?.id
            }
          </label>
        </p>
      </div>
      <div css={styles.card}>
        <ul>
          <li>
            <RiBuildingLine color="#222e50" size={23} />{" "}
            <span>
              Site Name :{" "}
              {
                AttendanceUser.attributes?.assignee_shift?.data?.attributes
                  ?.site?.data?.attributes?.name
              }
            </span>
          </li>
          <li>
            <RiBuildingLine color="#222e50" size={23} />{" "}
            <span>
              Checkpoint Name :
              {
                AttendanceUser.attributes?.assignee_shift?.data?.attributes
                  ?.site?.data?.attributes?.checkpoints[0]?.Name
              }
            </span>
          </li>
          <li>
            <MapPineLineIcon color="#222e50" />{" "}
            <span>
              {
                AttendanceUser.attributes?.assignee_shift?.data?.attributes
                  ?.site?.data?.attributes?.location?.Name
              }
            </span>
          </li>
        </ul>
        <div css={styles.dutyPlan}>
          <span>Time of Duty (Planned)</span>
          <div>
            {AttendanceUser?.attributes?.assignee_shift?.data?.attributes?.shift
              ?.data?.attributes?.timeRange?.StartTime
              ? formatTime(
                  AttendanceUser?.attributes?.assignee_shift?.data?.attributes
                    ?.shift?.data?.attributes?.timeRange?.StartTime
                )
              : "00:00"}{" "}
            to{" "}
            {AttendanceUser?.attributes?.assignee_shift?.data?.attributes?.shift
              ?.data?.attributes?.timeRange?.EndTime
              ? formatTime(
                  AttendanceUser?.attributes?.assignee_shift?.data?.attributes
                    ?.shift?.data?.attributes?.timeRange?.EndTime
                )
              : "00:00"}
          </div>
        </div>
      </div>
      <div css={styles.card}>
        <h4>
          {moment().format("dddd")},{" "}
          {moment(AttendanceUser.attributes?.date).format("Do MMMM YYYY")}
        </h4>
        <hr />
        <div css={styles.displayTime}>
          <b>
            {AttendanceUser.attributes?.checkInTime
              ? AttendanceUser.attributes?.checkInTime.slice(0, -4)
              : "00:00:00"}
          </b>
          <b>00:00:00</b>
        </div>
        <div css={styles.displayTime}>
          <span>Check in Time </span>
          <span>Check out Time </span>
        </div>
      </div>
      <button onClick={() => handleCheckOut()} css={styles.btn}>
        Check Out
      </button>
    </div>
  );
};

export default Profile;
const styles = {
  wrapper: css`
    padding: 20px;
  `,
  attachBox: css`
    position: absolute;
    margin-top: -70px;
    cursor: pointer;
    img {
      width: 60px;
      height: 60px;
      border-radius: 50px;
    }
  `,
  profileContent: css`
    border-radius: 10px;
    background: var(--mobile-color-usage-white, #fff);
    box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.08);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 110px;
    width: 100%;
    p {
      padding-top: 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      label {
        line-height: 25px;
      }
    }
    .header-text {
      color: var(--primary);
      text-transform: capitalize;
    }
    .secondary-text {
      color: var(--light-gray);
    }
  `,
  card: css`
    margin-top: 9px;
    padding: 10px;
    color: var(--primary-font);
    border-radius: 10px;
    background: var(--white);
    box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    gap: 9px;
    font-size: 14px;
    font-weight: 600;
    h4 {
      font-size: 16px;
      font-weight: 600;
      text-align: center;
    }
    li {
      display: flex;
      flex-direction: row;
      gap: 9px;
    }
  `,
  dutyPlan: css`
    display: flex;
    flex-direction: row;
    padding: 15px;
    justify-content: space-around;
    div {
      background: #293991;
      color: #fff;
      padding: 5px;
      border-radius: 9px;
    }
  `,
  displayTime: css`
    display: flex;
    padding: 8px;
    flex-direction: row;
    justify-content: space-between;
    font-size: 18px;
    font-weight: 400;
    b {
      text-align: center;
    }
  `,
  btn: css`
    margin-top: 5px;
    width: 100%;
    font-size: 18px;
    padding: 4px;
    font-weight: 700;
    border: none;
    border-radius: 10px;
    background: var(--primary);
    color: var(--white);
  `,
};
