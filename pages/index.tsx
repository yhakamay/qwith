import {
  Box,
  Button,
  Center,
  HStack,
  PinInput,
  PinInputField,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { db } from "../firebaseConfig";

export default function Home() {
  const [isLoading, setLoading] = useState(false);
  const [pin, setPin] = useState("");
  const router = useRouter();
  const toast = useToast();

  // TODO: Rename to enterRoom
  async function enterQwith() {
    setLoading(true);
    const matchedRooms = await getDocs(
      query(
        collection(db, "rooms"),
        where("pin", "==", pin),
        where("status", "!=", "closed")
      )
    );

    if (matchedRooms.size === 0) {
      toast({
        title: "Error.",
        description: `No rooms found with pin ${pin}`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setPin("");
      setLoading(false);
      return;
    }

    if (matchedRooms.size > 1) {
      toast({
        title: "Error.",
        description: `Internal error: found ${matchedRooms.size} rooms with pin ${pin}`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setPin("");
      setLoading(false);
      return;
    }

    const room = matchedRooms.docs[0];
    const roomId = room.id;

    router.push(`/rooms/${roomId}`);
  }

  return (
    <>
      <Center h="100vh">
        <VStack spacing={4}>
          <Image src="/vercel.svg" width={200} height={200} alt="logo" />
          <Box h={8} />
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
      </Center>
    </>
  );
}
