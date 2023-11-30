import { useEffect } from "react";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import GlobalStyle from "../styles/globals";
import { ApolloProvider } from "@apollo/client";
import client from "../graphql/apolloClient";
import attendenceStore from "../store/attendance";
import { setCookie, parseCookies } from "nookies";
import io from "socket.io-client";
import GlobalNotiBox from "../components/notification/GlobalNotiBox";
import PageNotiBox from "../components/notification/PageNotiBox";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const {
    locationData: locationData,
    getAddressData,
    getLocationData,
    addressData,
  } = attendenceStore((state) => state);

  const cookies = parseCookies();

  const userData = cookies.user ? JSON.parse(cookies.user) : null;
  const [notiData, setNotiData] = useState();

  useEffect(() => {
    let socket = io(process.env.NEXT_PUBLIC_APP_URL, {
      transport: ["websocket"],
    });
    socket.on(`stats:notification-${userData?.id}`, (data) => {
      console.log("blocked socket working", data);
      setNotiData(data);
      // clearToken()
      // removeCookies('accessToken')
    });
  }, [userData]);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const geocodeLocation = async (address) => {
    const geocodingUrl = `https://api.opencagedata.com/geocode/v1/json?q=${address?.lat}+${address?.lng}&key=${apiKey}`;

    try {
      const response = await fetch(geocodingUrl);
      const data = await response.json();
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
      {notiData?.status == "success" ? (
        <div style={{ position: "relative", margin: "0px 10px" }}>
          <PageNotiBox
            message={notiData?.message}
            user={notiData?.username}
            timeout={5000}
            status={notiData?.attendance}
            time={notiData?.time}
          />
        </div>
      ) : null}

      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
