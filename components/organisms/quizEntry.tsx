import {
  Button,
  Card,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
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
    <>
      <Flex align={"center"} justify={"center"} h={"100vh"}>
        <Card p={"16"}>
          <VStack spacing={4}>
            <Heading>Room: {roomId}</Heading>
            <form onSubmit={handleSubmit}>
              <FormControl isRequired mt={8}>
                <FormLabel>Team name</FormLabel>
                <Input
                  type="text"
                  placeholder="Wonderful name ❤️"
                  onChange={(e) => setTeamName(e.currentTarget.value)}
                />
              </FormControl>
              <Button type="submit" mt={4} width="full" isLoading={isLoading}>
                Next
              </Button>
            </form>
          </VStack>
        </Card>
      </Flex>
    </>
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
