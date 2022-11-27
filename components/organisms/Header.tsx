import { Flex, useDisclosure, IconButton, Show } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import ColorModeIconButton from "../atoms/ColorModeIconButton";
import Logo from "../atoms/Logo";
import HeaderDrawer from "../molecules/HeaderDrawer";

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex as="header" align="center" justify="space-between" p="8">
      <Logo />
      <Show above="md">
        <ColorModeIconButton />
      </Show>
      <Show below="md">
        <Flex align="center" fontSize="sm">
          <IconButton
            onClick={onOpen}
            aria-label={"Toggle color mode"}
            variant="outline"
            icon={<HamburgerIcon />}
          />
        </Flex>
      </Show>
      <HeaderDrawer isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
}
