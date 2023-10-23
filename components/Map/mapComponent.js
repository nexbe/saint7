import React from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const mapComponent = withGoogleMap((props) => (
  <GoogleMap defaultZoom={12} defaultCenter={props.center}>
    <Marker position={props.center} />
  </GoogleMap>
));

export default mapComponent;
