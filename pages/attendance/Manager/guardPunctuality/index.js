/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Layout from "../../../../components/layout/Layout";
import HeaderNoti from "../../../../components/layout/HeaderNoti";
import Card from "../../../../components/attendence/GuardPunctuality/Card";
import attendenceStore from "../../../../store/attendance";
import NoDataIcon from "../../../../public/icons/noDataIcon";
import { useAmp } from "next/amp";
import { useApolloClient } from "@apollo/client";
import { useEffect } from "react";
import moment from "moment";
import { useState } from "react";
import { graphQLResultHasError } from "@apollo/client/utilities";

const GuardPunctuality = () => {
  const apolloClient = useApolloClient();

  const [attendanceInfo, setAttendanceInfo] = useState();

  const { AllAttendances: AllAttendances, getAllAttendance } = attendenceStore(
    (state) => state
  );

  const oneWeekAgo = new Date();

  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  useEffect(() => {
    getAllAttendance({
      apolloClient,
      where: {
        startDate: moment(oneWeekAgo).format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD"),
      },
    });
  }, []);

  // console.log(AllAttendances);

  useEffect(() => {
    const groupedData = {};

    // Iterate through the data and group it by date and status
    AllAttendances.forEach((item) => {
      const date = item.attributes.date;
      const status = item.attributes.status;
      const statusKey =
        status === "Complete" ? "CompleteData" : "NotCompleteData";

      if (!groupedData[date]) {
        // If the date doesn't exist in the grouped data, create an object for it
        groupedData[date] = {
          date: date,
          CompleteData: [],
          NotCompleteData: [],
        };
      }

      // Push the item to the corresponding status array
      groupedData[date][statusKey].push(item);
    });

    // Convert the grouped data object into an array
    const result = Object.values(groupedData);

    console.log(result);
    setAttendanceInfo(result);
  }, [AllAttendances]);

  return (
    <Layout>
      <HeaderNoti
        title={"Check Guard Punctuality"}
        href={"/attendance/Manager"}
      />
      <div css={styles.bodyWrapper}>
        {attendanceInfo?.map((attendances, index) => (
          <div key={index}>
            <h4>
              {attendances?.date == moment().format("YYYY-MM-DD")
                ? "Today"
                : moment(attendances?.date).format("Do MMMM YYYY")}
            </h4>
            {attendances?.CompleteData &&
              attendances?.CompleteData?.length > 0 && (
                <Card
                  state={false}
                  attendanceData={attendances?.CompleteData}
                />
              )}
            {attendances?.NotCompleteData &&
              attendances?.NotCompleteData?.length > 0 && (
                <Card
                  state={true}
                  attendanceData={attendances?.NotCompleteData}
                />
              )}
          </div>
        ))}
        {attendanceInfo && attendanceInfo?.length === 0 && (
          <div css={styles.noDataContainer} className="primary-text">
            <NoDataIcon />
            <label>Nothing Here to show</label>
            <label>You don’t have any data.</label>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default GuardPunctuality;

const styles = {
  bodyWrapper: css`
    h4 {
      margin: 20px;
      font-size: 20px;
      font-weight: 600;
      color: var(--primary-font);
    }
    height: 0px;
  `,
  noDataContainer: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
};
