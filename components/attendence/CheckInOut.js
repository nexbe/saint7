/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Card from "../../components/documents/Card";
import CalendarIcon from "../../public/icons/calendarIcon";
import LocationIcon from "../../public/icons/locationIcon";
import ScanIcon from "../../public/icons/scanIcon";
import { css } from "@emotion/react";
import Map from "../../components/Map";
import attendenceStore from "../../store/attendance";

const CheckInOut = () => {
  const { locationData: locationData, loading } = attendenceStore(
    (state) => state
  );
  const [currentAddress, setCurrentAddress] = useState("");

  const googleAPI = process.env.GOOGLE_API_KEY;

  // const geocodeLocation = async (lat, lng) => {
  //   console.log(lat);
  //   const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleAPI}`;

  //   try {
  //     const response = await fetch(geocodingUrl);
  //     const data = await response.json();
  //     console.log("here", data);
  //     // const address = data.results[0].formatted_address;
  //     // setCurrentAddress(address);
  //   } catch (error) {
  //     console.error("Error fetching address:", error);
  //   }
  // };

  // useEffect(() => {
  //   if (locationData) {
  //     geocodeLocation(locationData?.lat, locationData?.lng);
  //   }
  // }, [locationData]);

  const router = useRouter();
  return (
    <div>
      <div className="d-flex justify-content-between">
        <p className="m-3 text-black">Monday, 10th May 2023</p>
        <p className="m-3 text-black">09:00:00</p>
      </div>

      <div>
        <button
          css={styles.wrapper}
          onClick={() => router.push("/checkin/qrcode")}
        >
          <ScanIcon />
          Check In
        </button>
      </div>

      <Card
        id={0}
        title={"Current Location"}
        body={
          <div css={styles.mapContainer}>
            <Map />
          </div>
        }
        icon={<LocationIcon />}
      />
      <Card
        id={1}
        title={"Duty Schedule Detail"}
        body={
          <>
            <div class="container ">
              <div class="row">
                <div class=" d-flex align-items-center">
                  <p>
                    <b>Date</b>{" "}
                  </p>
                  &ensp; <p>:</p> &ensp;
                  <p>10-05-2023</p>
                </div>
                <div class=" d-flex align-items-center">
                  <p>
                    <b>Time</b>{" "}
                  </p>
                  &ensp; <p>:</p> &ensp;
                  <p>9:00AM - 6:00PM</p>
                </div>
              </div>

              <div class="row">
                <div class=" d-flex align-items-center">
                  <p>
                    <b>Report To</b>{" "}
                  </p>
                  &ensp; <p>:</p> &ensp;
                  <p>
                    {" "}
                    2715 Ash Dr.
                    <br />
                    San Jose, South Dakota 83475
                  </p>
                </div>
              </div>
            </div>
          </>
        }
        icon={<CalendarIcon />}
      />
    </div>
  );
};

export default CheckInOut;

const styles = {
  mapContainer: css`
    width: 100%;
  `,
  wrapper: css`
    width: 100%;
    padding: 35px;
    font-size: 18px;
    font-weight: 700;
    border: none;
    border-radius: 10px;
    background: var(--primary);
    color: var(--white);
  `,
};
