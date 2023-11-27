import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import styles from "../../styles/Home.module.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import attendenceStore from "../../store/attendance";
import moment from "moment";
import { useState } from "react";
import MapPineLineIcon from "/public/icons/mapPineLineIcon";
import BuildingIcon from "../../public/icons/buildingIcon";
import SiteModal2 from "./siteModal2";

const HomeMap = ({ lat, lng, AssignUsers }) => {
  const { locationData: locationData, addressData } = attendenceStore(
    (state) => state
  );

  const [assignUserData, setAssignUsers] = useState([]);
  const [viewModal, setViewModal] = useState(false);

  useEffect(() => {
    // if (user?.role?.name == "guard") {
    const filteredData =
      AssignUsers[0]?.attributes?.site?.data?.attributes?.assignee_shifts?.data?.filter(
        (item) => {
          const itemDate = item.attributes.dutyDate;

          return itemDate === moment().format("YYYY-MM-DD");
        }
      );
    setAssignUsers(filteredData);
    // }
  }, [AssignUsers]);

  const customIcon = new L.Icon({
    iconUrl: "/images/mapIcon2.png", // Path to your custom icon image
    iconSize: [50, 50], // Size of the icon
  });

  const handleClick = () => {
    setViewModal(true);
  };

  return (
    <MapContainer
      className={styles.map2}
      center={[lat ? lat : locationData?.lat, lng ? lng : locationData?.lng]}
      zoom={17}
    >
      <TileLayer
        attribution="Google Maps"
        url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" // regular
        maxZoom={30}
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
      />
      {AssignUsers[0]?.attributes?.site?.data?.attributes?.location?.Lat ? (
        <Marker
          position={[
            lat ? lat : locationData?.lat,
            lng ? lng : locationData?.lng,
          ]}
          icon={customIcon}
        >
          <Popup>
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
                  {AssignUsers[0]?.attributes?.site?.data?.attributes?.name}
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
                  {AssignUsers[0]?.attributes?.site?.data?.attributes?.address}
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
                {assignUserData &&
                  assignUserData?.length > 5 &&
                  assignUserData?.slice(0, 5)?.map((attendance, index) => {
                    return (
                      <div key={index}>
                        <img
                          id={attendance?.id}
                          src={
                            attendance?.attributes?.users_permissions_user?.data
                              ?.attributes?.profile?.data?.attributes?.photo
                              ?.data?.attributes?.url
                              ? `${process.env.NEXT_PUBLIC_APP_URL}${attendance?.attributes?.users_permissions_user?.data?.attributes?.profile?.data?.attributes?.photo?.data?.attributes?.url}`
                              : `${process.env.NEXT_PUBLIC_APP_URL}/uploads/default_Image_49ed37eb5a.jpg`
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
                {assignUserData &&
                  assignUserData?.length < 5 &&
                  assignUserData?.map((attendance, index) => {
                    return (
                      <div key={index}>
                        <img
                          id={attendance?.id}
                          src={
                            attendance?.attributes?.users_permissions_user?.data
                              ?.attributes?.profile?.data?.attributes?.photo
                              ?.data?.attributes?.url
                              ? `${process.env.NEXT_PUBLIC_APP_URL}${attendance?.attributes?.users_permissions_user?.data?.attributes?.profile?.data?.attributes?.photo?.data?.attributes?.url}`
                              : `${process.env.NEXT_PUBLIC_APP_URL}/uploads/default_Image_49ed37eb5a.jpg`
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
                {assignUserData && assignUserData?.length > 5 && (
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
                      +{assignUserData?.length - 5}
                    </span>
                  </div>
                )}
              </div>
              <SiteModal2
                isOpen={viewModal}
                setModal={setViewModal}
                filteredData={AssignUsers}
                assignUserData={assignUserData}
              />
            </div>
          </Popup>
        </Marker>
      ) : null}
    </MapContainer>
  );
};

export default HomeMap;
