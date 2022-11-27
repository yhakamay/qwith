import { Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Logo() {
  const router = useRouter();
  const onClickHome = () => router.push("/");

  return (
    <Heading onClick={onClickHome} cursor="pointer" fontSize="md">
      Qwith
    </Heading>
  );
}
