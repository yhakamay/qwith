import { AddIcon } from "@chakra-ui/icons";
import { Center, HStack, Text } from "@chakra-ui/react";
import Image from "next/image";

export default function Footer() {
  return (
    <Center my={16}>
      <HStack spacing={4}>
        <Image
          src={"/logos/firebase.svg"}
          alt={"Firebase logo"}
          width={20}
          height={20}
        />
        <AddIcon fontSize="xs" opacity={0.8} />
        <Image
          src={"/logos/nextjs.svg"}
          alt={"Next.js logo"}
          width={28}
          height={28}
        />
        <Text fontSize="xs" opacity={0.8}>
          by
        </Text>
        <div style={{ borderRadius: "5px", overflow: "hidden" }}>
          <Image
            src="/logos/yhakamaya.png"
            alt={"yhakamaya"}
            width={24}
            height={24}
          />
        </div>
      </HStack>
    </Center>
  );
}
