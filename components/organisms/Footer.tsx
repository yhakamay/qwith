import { AddIcon } from "@chakra-ui/icons";
import { Center, HStack, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <Center mt={32}>
      <HStack spacing={4}>
        <Link
          href="https://firebase.google.com/"
          target="_blank"
          rel="noopener"
        >
          <Image
            src={"/logos/firebase.svg"}
            alt={"Firebase logo"}
            width={20}
            height={20}
          />
        </Link>
        <AddIcon fontSize="xs" opacity={0.8} />
        <Link href="https://nextjs.org/" target="_blank" rel="noopener">
          <Image
            src={"/logos/nextjs.svg"}
            alt={"Next.js logo"}
            width={28}
            height={28}
          />
        </Link>
        <Text fontSize="xs" opacity={0.8}>
          by
        </Text>
        <Link
          href="https://twitter.com/ryota_murakami"
          target="_blank"
          rel="noopener"
        >
          <Image
            src="/logos/yhakamaya.png"
            alt={"yhakamaya"}
            width={24}
            height={24}
          />
        </Link>
      </HStack>
    </Center>
  );
}
