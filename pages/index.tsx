import {
  Heading,
  HStack,
  PinInput,
  PinInputField,
  Spinner,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useHttpsCallable } from "react-firebase-hooks/functions";
import { functions } from "../firebaseConfig";

export default function Home() {
  const [pin, setPin] = useState("");
  const router = useRouter();
  const [executeCallable, loading, error] = useHttpsCallable(
    functions,
    "getRoomIdWithPin"
  );
  const toast = useToast();

  return (
    <>
      <VStack spacing={4} pt="30vh">
        <Heading size="lg">Enter the PIN to join 🎉</Heading>
        <HStack pt={8}>
          <PinInput
            onChange={onPinChange}
            value={pin}
            isDisabled={loading}
            autoFocus
          >
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>
        <Spinner hidden={!loading} />
      </VStack>
    </>
  );

  async function tryEnterRoom(pin: string) {
    const roomId = (await executeCallable({ pin }))?.data;

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (roomId === null || roomId === undefined) {
      toast({
        title: "Room not found",
        description: "Please check the PIN and try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    router.push(`/rooms/${roomId}`);
  }

  async function onPinChange(pin: string) {
    setPin(pin);

    if (pin.length === 4) {
      await tryEnterRoom(pin);
      setPin("");
    }
  }
}
