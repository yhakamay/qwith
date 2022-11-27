import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import StandardTemplate from "../components/templates/StandardTemplate";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <StandardTemplate>
        <Component {...pageProps} />
      </StandardTemplate>
    </ChakraProvider>
  );
}
