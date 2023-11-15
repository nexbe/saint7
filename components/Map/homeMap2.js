import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import styles from "../../styles/Home.module.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import attendenceStore from "../../store/attendance";
import moment from "moment";
import MapPineLineIcon from "/public/icons/mapPineLineIcon";
import BuildingIcon from "../../public/icons/buildingIcon";
const HomeMap2 = ({ siteData }) => {
  const { locationData: locationData, addressData } = attendenceStore(
    (state) => state
  );
  const customIcon = new L.Icon({
    iconUrl: "/images/mapIcon.png", // Path to your custom icon image
    iconSize: [50, 50], // Size of the icon
  });

  return (
    <MapContainer
      className={styles.map2}
      center={[
        siteData[1]?.attributes?.location?.Lat ?? locationData?.lat,
        siteData[1]?.attributes?.location?.Lng ?? locationData?.lng,
      ]}
      zoom={17}
    >
      <TileLayer
        attribution="Google Maps"
        url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" // regular
        maxZoom={30}
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
      />
      {siteData?.map((site, index) => {
        const filteredData = site?.attributes?.assignee_shifts?.data?.filter(
          (item) => {
            const itemDate = item.attributes.dutyDate;

            return itemDate === moment().format("YYYY-MM-DD");
          }
        );
        return (
          <Marker
            position={[
              site?.attributes?.location?.Lat,
              site?.attributes?.location?.Lng,
            ]}
            icon={customIcon}
            key={index}
          >
            {/* <Popup className={styles.popup}>
              <div>
                {filteredData?.length ? (
                  filteredData.map((data, index) => (
                    <div
                      style={{ display: "flex", alignItems: "center" }}
                      key={index}
                    >
                      <img
                        src={
                          data?.attributes?.users_permissions_user?.data
                            ?.attributes?.facialScanImage?.data?.attributes?.url
                            ? `${process.env.NEXT_PUBLIC_APP_URL}${data?.attributes?.users_permissions_user?.data?.attributes?.facialScanImage?.data?.attributes?.url}`
                            : "images/defaultImage.jpg"
                        }
                        className={styles.profile}
                      />
                      <p style={{ marginLeft: 10 }}>
                        {
                          data?.attributes?.users_permissions_user?.data
                            ?.attributes?.username
                        }
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No assign Users</p>
                )}
              </div>
            </Popup> */}
            <Popup className={styles.popup}>
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <MapPineLineIcon />
                  <p
                    style={{
                      margin: 0,
                      marginLeft: 5,
                      color: "#2F4858",
                      fontSize: 14,
                      fontFamily: "Inter",
                    }}
                  >
                    {site?.attributes?.name}
                  </p>
                </div>
                <hr
                  style={{
                    borderTop: " 2px solid var(--light-gray2)",
                    margin: "10px 0px",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <BuildingIcon />
                  <p
                    style={{
                      margin: 0,
                      marginLeft: 10,
                      color: "#2F4858",
                      fontSize: 14,
                      fontFamily: "Inter",
                    }}
                  >
                    {site?.attributes?.address}
                  </p>
                </div>
                <hr
                  style={{
                    borderTop: " 2px solid var(--light-gray2)",
                    margin: "10px 0px",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    margin: "10px 0",
                  }}
                >
                  {filteredData &&
                    filteredData?.length > 5 &&
                    filteredData?.slice(0, 5)?.map((attendance, index) => {
                      return (
                        <div key={index}>
                          <img
                            id={attendance?.id}
                            src={
                              attendance?.attributes?.users_permissions_user
                                ?.data?.attributes?.facialScanImage?.data
                                ?.attributes?.url
                                ? `${process.env.NEXT_PUBLIC_APP_URL}${attendance?.attributes?.users_permissions_user?.data?.attributes?.facialScanImage?.data?.attributes?.url}`
                                : "images/defaultImage.jpg"
                            }
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                              marginLeft: "-10px",
                            }}
                          />
                        </div>
                      );
                    })}
                  {filteredData &&
                    filteredData?.length < 5 &&
                    filteredData?.map((attendance, index) => {
                      return (
                        <div key={index}>
                          <img
                            id={attendance?.id}
                            src={
                              attendance?.attributes?.users_permissions_user
                                ?.data?.attributes?.facialScanImage?.data
                                ?.attributes?.url
                                ? `${process.env.NEXT_PUBLIC_APP_URL}${attendance?.attributes?.users_permissions_user?.data?.attributes?.facialScanImage?.data?.attributes?.url}`
                                : "images/defaultImage.jpg"
                            }
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                              marginLeft: "-10px",
                            }}
                          />
                        </div>
                      );
                    })}
                  {filteredData && filteredData?.length > 5 && (
                    <div className={styles.circles}>
                      <span
                        style={{
                          color: "#fff",
                          display: "flex",
                          padding: "5px",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: "22px",
                        }}
                      >
                        +{filteredData?.length - 5}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default HomeMap2;
