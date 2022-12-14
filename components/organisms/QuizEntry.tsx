import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { addDoc, collection, doc } from "firebase/firestore";
import router from "next/router";
import { useState } from "react";
import { db } from "../../firebaseConfig";
import { Team } from "../../types/team";

export type QuizEntryProps = {
  roomId: string;
};

export default function QuizEntry(props: QuizEntryProps) {
  const { roomId } = props;
  const [teamName, setTeamName] = useState("");
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  return (
    <VStack spacing={4} pt="30vh">
      <Heading size="lg" textAlign="center">
        Enter your name
      </Heading>
      <Box h="4" />
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <InputGroup>
            <Input
              type="text"
              placeholder="Name ❤️"
              onChange={(e) => setTeamName(e.currentTarget.value)}
            />
            <InputRightElement>
              <IconButton
                size="sm"
                type="submit"
                colorScheme="green"
                isLoading={isLoading}
                disabled={isLoading}
                borderRadius="full"
                icon={<ArrowForwardIcon />}
                aria-label={"Next"}
              ></IconButton>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </form>
      <Text fontSize="xs">or</Text>
      <Button
        variant="ghost"
        onClick={() => {
          router.push(`/rooms/${roomId}?teamId=viewer`);
        }}
      >
        Join as read-only
      </Button>
    </VStack>
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);

    const team: Team = {
      name: teamName,
      score: 0,
    };

    try {
      const roomsCollectionRef = collection(db, "rooms");
      const roomDocRef = doc(roomsCollectionRef, roomId as string);
      const teamsCollectionRef = collection(roomDocRef, "teams");
      const teamDocRef = await addDoc(teamsCollectionRef, team);
      const teamId = teamDocRef.id;

      router.push(`/rooms/${roomId}?teamId=${teamId}`);
    } catch (e: any) {
      toast({
        title: "Error.",
        description: `An error occurred: ${e.message}`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setTeamName("");
    } finally {
      setLoading(false);
    }
  }
}
