import NextLink from "next/link";
import {
  Avatar,
  Center,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebaseConfig";
import { SignInButton } from "../atoms/SignInButton";
import SignOutButton from "../atoms/SignOutButton";

export default function AuthButtons() {
  const [user] = useAuthState(auth);

  if (!user) {
    return <SignInButton />;
  }

  return (
    <>
      <Menu>
        <MenuButton>
          <Avatar
            size="sm"
            cursor="pointer"
            name={user.displayName ?? ""}
            src={user.photoURL ?? undefined}
          />
        </MenuButton>
        <MenuList>
          <MenuItem>
            <Link as={NextLink} href={`/${user.uid}/rooms/`}>
              Your rooms
            </Link>
          </MenuItem>
          <MenuItem>🚧 Your friends 🚧</MenuItem>
          <MenuItem>🚧 Profile settings 🚧</MenuItem>
          <MenuDivider />
          <Center>
            <SignOutButton />
          </Center>
        </MenuList>
      </Menu>
    </>
  );
}
