import * as React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";

import "css/styles.css";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
      <Head>
        <link rel="icon" href="favicon.svg" />
        <link rel="apple-touch-icon" href="logo192.png" />
      </Head>
    </ChakraProvider>
  );
};

export default MyApp;
