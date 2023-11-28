import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import styles from "../../styles/Home.module.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import attendenceStore from "../../store/attendance";

const Map = () => {
  const { locationData: locationData, addressData } = attendenceStore(
    (state) => state
  );
  const customIcon = new L.Icon({
    iconUrl: "/images/mapIcon.png", // Path to your custom icon image
    iconSize: [50, 50], // Size of the icon
  });

  return (
    <MapContainer
      className={styles.map}
      center={[locationData?.lat, locationData?.lng]}
      zoom={10}
    >
      <TileLayer
        attribution="Google Maps"
        url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" // regular
        maxZoom={30}
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
      />
      <Marker
        position={[
          locationData?.lat ?? "16.871311",

          locationData?.lng ?? "96.199379",
          ,
        ]}
        icon={customIcon}
      >
        <Popup>{addressData}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
