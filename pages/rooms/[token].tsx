import {
  Button,
  Center,
  Divider,
  FormControl,
  Heading,
  Input,
  InputGroup,
  VStack,
} from "@chakra-ui/react";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import { db } from "../../firebase/firebase-init";
import { Team } from "../../types/team";

export default function QuizPage() {
  const router = useRouter();
  const { token } = router.query;
  const [teamName, setTeamName] = useState("");

  async function addTeamToRoom() {
    const { teamName } = form;
    const team: Team = {
      name: teamName,
      score: 0,
    };

    try {
      const roomsRef = collection(db, "rooms");
      const q = query(
        roomsRef,
        where("token", "==", token),
        where("status", "==", "waiting"),
        limit(1)
      );
      const matchedRooms = await getDocs(q);
      const roomRef = collection(db, "rooms", matchedRooms.docs[0].id);
      const teamRef = await addDoc(collection(roomRef, "teams"), team);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <>
      <Center h="100vh">
        <VStack spacing={4}>
          <Heading>Room: {token}</Heading>
          <Heading>Enter team members</Heading>
          <FormControl isRequired>
            <InputGroup>
              <Input
                type="text"
                onChange={setTeamName}
                placeholder="Team name"
              />
            </InputGroup>
          </FormControl>
          <Button onClick={addTeamToRoom}>Next</Button>
        </VStack>
      </Center>
    </>
  );
}
