import { Center, VStack } from "@chakra-ui/react";
import Footer from "../organisms/Footer";
import Header from "../organisms/Header";

type StandardTemplateProps = {
  children: React.ReactNode;
};

export default function StandardTemplate(props: StandardTemplateProps) {
  const { children } = props;

  return (
    <>
      <Header />
      <Center>
        <VStack w={{ base: "sm", md: "lg" }} align="center">
          {children}
        </VStack>
      </Center>
      <Footer />
    </>
  );
}
