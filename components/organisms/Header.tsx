import { Flex, Show, HStack } from "@chakra-ui/react";
import ColorModeIconButton from "../atoms/ColorModeIconButton";
import Logo from "../atoms/Logo";
import AuthButtons from "../molecules/AuthButtons";

export default function Header() {
  return (
    <Flex as="header" align="center" justify="space-between" p="8">
      <Logo />
      <HStack spacing={8}>
        <Show above="md">
          <ColorModeIconButton />
        </Show>
        <AuthButtons />
      </HStack>
    </Flex>
  );
}
