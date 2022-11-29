import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode } from "@chakra-ui/react";

export default function ColorModeIconButton() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      onClick={toggleColorMode}
      aria-label={"Toggle color mode"}
      variant="ghost"
      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    />
  );
}
