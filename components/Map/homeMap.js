import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import styles from "../../styles/Home.module.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import attendenceStore from "../../store/attendance";
import moment from "moment";
import { useState } from "react";

const HomeMap = ({ lat, lng, AssignUsers }) => {
  const { locationData: locationData, addressData } = attendenceStore(
    (state) => state
  );

  const [assignUserData, setAssignUsers] = useState([]);

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

  return (
    <MapContainer
      className={styles.map2}
      center={[lat ?? locationData?.lat, lng ?? locationData?.lng]}
      zoom={17}
    >
      <TileLayer
        attribution="Google Maps"
        url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" // regular
        maxZoom={30}
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
      />
      <Marker
        position={[lat ?? locationData?.lat, lng ?? locationData?.lng]}
        icon={customIcon}
      >
        <Popup>
          <div>
            {assignUserData?.length &&
              assignUserData.map((data, index) => (
                <div
                  style={{ display: "flex", alignItems: "center" }}
                  key={index}
                >
                  <img
                    src={
                      data?.attributes?.users_permissions_user?.data?.attributes
                        ?.facialScanImage?.data?.attributes?.url
                        ? `${process.env.NEXT_PUBLIC_APP_URL}${data?.attributes?.users_permissions_user?.data?.attributes?.facialScanImage?.data?.attributes?.url}`
                        : "images/defaultImage.jpg"
                    }
                    className={styles.profile}
                  />
                  <p style={{ marginLeft: 10 }}>
                    {
                      data?.attributes?.users_permissions_user?.data?.attributes
                        ?.username
                    }
                  </p>
                </div>
              ))}
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default HomeMap;
