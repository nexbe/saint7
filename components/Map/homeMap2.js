import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import styles from "../../styles/Home.module.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import attendenceStore from "../../store/attendance";
import moment from "moment";
import MapPineLineIcon from "/public/icons/mapPineLineIcon";
import BuildingIcon from "../../public/icons/buildingIcon";
import { parseCookies } from "nookies";
import SiteModal from "./siteModal";
const HomeMap2 = ({ siteData }) => {
  const cookies = parseCookies();

  const latitude = cookies.latitude ? JSON.parse(cookies.latitude) : null;
  const longitude = cookies.longitude ? JSON.parse(cookies.longitude) : null;

  const customIcon = new L.Icon({
    iconUrl: "/images/mapIcon.png", // Path to your custom icon image
    iconSize: [50, 50], // Size of the icon
  });

  const [siteInfo, setSiteInfo] = useState([]);
  const [viewModal, setViewModal] = useState(false);

  useEffect(() => {
    if (siteData.length) {
      setSiteInfo(siteData);
    }
  }, [siteData]);

  const handleClick = () => {
    setViewModal(true);
  };

  return (
    <MapContainer
      className={styles.map2}
      center={["16.871311", "96.199379"]}
      zoom={17}
    >
      <TileLayer
        attribution="Google Maps"
        url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" // regular
        maxZoom={30}
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
      />
      {siteInfo?.map((site, index) => {
        const filteredData = site?.attributes?.assignee_shifts?.data?.filter(
          (item) => {
            const itemDate = item.attributes.dutyDate;

            return itemDate === moment().format("YYYY-MM-DD");
          }
        );
        console.log(filteredData);
        return (
          <Marker
            position={[
              site?.attributes?.location?.Lat ?? latitude,
              site?.attributes?.location?.Lng ?? longitude,
            ]}
            icon={customIcon}
            key={index}
          >
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
                  onClick={() => handleClick()}
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
                                ?.data?.attributes?.profile?.data?.attributes
                                ?.photo?.data?.attributes?.url
                                ? `${process.env.NEXT_PUBLIC_APP_URL}${attendance?.attributes?.users_permissions_user?.data?.attributes?.profile?.data?.attributes?.photo?.data?.attributes?.url}`
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
                                ?.data?.attributes?.profile?.data?.attributes
                                ?.photo?.data?.attributes?.url
                                ? `${process.env.NEXT_PUBLIC_APP_URL}${attendance?.attributes?.users_permissions_user?.data?.attributes?.profile?.data?.attributes?.photo?.data?.attributes?.url}`
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

                <SiteModal
                  isOpen={viewModal}
                  setModal={setViewModal}
                  filteredData={filteredData}
                  siteData={site}
                />
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default HomeMap2;
