import '../styles/globals.css'
import "bootstrap/dist/css/bootstrap.css";
import GlobalStyle from "../styles/globals";
import { ApolloProvider } from "@apollo/client";
import client from '../graphql/apolloClient';

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ApolloProvider>
  );
 
}

export default MyApp
