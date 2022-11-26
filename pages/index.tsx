import {
  Badge,
  Box,
  Button,
  Center,
  HStack,
  PinInput,
  PinInputField,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const [isLoading, setLoading] = useState(false);
  const [pin, setPin] = useState("");
  const router = useRouter();

  function enterQwith() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    router.push(`/rooms/${pin}`);
  }

  return (
    <>
      <Center h="100vh">
        <Box
          w="md"
          h="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
        >
          <VStack>
            <Image src="/vercel.svg" width={200} height={200} alt="logo" />
            <HStack>
              <PinInput onChange={setPin}>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
            <Button
              isLoading={isLoading}
              disabled={pin.length !== 4}
              onClick={enterQwith}
            >
              Click me
            </Button>
          </VStack>
        </Box>
      </Center>
    </>
  );
}
