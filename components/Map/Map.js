import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import styles from "../../styles/Home.module.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const Map = () => {
  const customIcon = new L.Icon({
    iconUrl: "/images/mapIcon.png", // Path to your custom icon image
    iconSize: [50, 50], // Size of the icon
  });
  return (
    <MapContainer
      className={styles.map}
      center={[40.7128, -74.006]}
      zoom={7}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[40.7128, -74.006]} icon={customIcon}>
        <Popup>123 Sample Street, NewYork</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
