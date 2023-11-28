import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import styles from "../../styles/Home.module.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import attendenceStore from "../../store/attendance";
import { parseCookies } from "nookies";

const Map = () => {
  const { locationData: locationData, addressData } = attendenceStore(
    (state) => state
  );
  const cookies = parseCookies();

  const customIcon = new L.Icon({
    iconUrl: "/images/mapIcon.png", // Path to your custom icon image
    iconSize: [50, 50], // Size of the icon
  });

  const latitude = cookies.latitude ? JSON.parse(cookies.latitude) : null;
  const longitude = cookies.longitude ? JSON.parse(cookies.longitude) : null;

  return (
    <MapContainer
      className={styles.map}
      center={[latitude, longitude]}
      zoom={10}
    >
      <TileLayer
        attribution="Google Maps"
        url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" // regular
        maxZoom={30}
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
      />
      <Marker
        position={[latitude ?? "16.871311", longitude ?? "96.199379"]}
        icon={customIcon}
      ></Marker>
    </MapContainer>
  );
};

export default Map;
