import * as React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import { Header } from "components";

const theme = extendTheme({
  colors: {
    blue: {
      500: "#0070f3",
      600: "#0765d2",
      700: "#055cc1",
    },
  },
});

import "css/styles.css";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        <Header />
        <Component {...pageProps} />
      </RecoilRoot>
      <Head>
        <link rel="icon" href="favicon.svg" />
        <link rel="apple-touch-icon" href="logo192.png" />
      </Head>
    </ChakraProvider>
  );
};

export default MyApp;
