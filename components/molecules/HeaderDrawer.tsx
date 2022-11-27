import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@chakra-ui/react";
import ColorModeIconButton from "../atoms/ColorModeIconButton";

type HeaderDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function HeaderDrawer(props: HeaderDrawerProps) {
  const { isOpen, onClose } = props;

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Create your account</DrawerHeader>
        <DrawerBody></DrawerBody>
        <DrawerFooter>
          <ColorModeIconButton />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
