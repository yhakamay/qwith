import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import StandardTemplate from "../components/templates/StandardTemplate";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Qwith</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Qwith" key="title" />
      </Head>
      <ChakraProvider>
        <StandardTemplate>
          <Component {...pageProps} />
        </StandardTemplate>
      </ChakraProvider>
    </>
  );
}
