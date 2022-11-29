import NextLink from "next/link";
import {
  Avatar,
  Center,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  VStack,
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
      <Popover>
        <PopoverTrigger>
          <Avatar
            size="sm"
            cursor="pointer"
            name={user.displayName ?? ""}
            src={user.photoURL ?? undefined}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>{`Hi, ${user.displayName} 👋`}</PopoverHeader>
          <PopoverBody>
            <VStack spacing={4}>
              <Link as={NextLink} href={`/${user.uid}/rooms/`}>
                Your rooms
              </Link>
              <Link>🚧 Your friends 🚧</Link>
              <Link>🚧 Profile settings 🚧</Link>
            </VStack>
          </PopoverBody>
          <PopoverFooter>
            <Center>
              <SignOutButton />
            </Center>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  );
}
