import { useEffect } from "react";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import GlobalStyle from "../styles/globals";
import { ApolloProvider } from "@apollo/client";
import client from "../graphql/apolloClient";
import attendenceStore from "../store/attendance";
import { setCookie, parseCookies } from "nookies";

function MyApp({ Component, pageProps }) {
  const {
    locationData: locationData,
    getAddressData,
    getLocationData,
    addressData,
  } = attendenceStore((state) => state);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const geocodeLocation = async (address) => {
    const geocodingUrl = `https://api.opencagedata.com/geocode/v1/json?q=${address?.lat}+${address?.lng}&key=${apiKey}`;

    try {
      const response = await fetch(geocodingUrl);
      const data = await response.json();
      console.log(data);
      const address = data.results[0]?.formatted;
      getAddressData(address);
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      console.log("here");
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        // const location = { lat: latitude, lng: longitude };
        setCookie(null, "latitude", latitude, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        setCookie(null, "longitude", longitude, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        getLocationData({ lat: latitude, lng: longitude });
        geocodeLocation({ lat: latitude, lng: longitude });
      });
    }
  }, []);

  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
