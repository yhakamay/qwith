import { Center, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { collection, doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "../../firebaseConfig";
import { Room, roomConverter } from "../../types/room";
import QuizEntry from "./quizEntry";
import QuizPlay from "./quizPlay";
import QuizWaiting from "./quizWaiting";

export type QuizGateProps = {
  roomId: string;
  teamId?: string;
};

export default function QuizGate(props: QuizGateProps) {
  const { roomId, teamId } = props;

  const roomsRef = collection(db, "rooms");
  const roomRef = doc(roomsRef, roomId as string).withConverter(roomConverter);
  const [room, loading, error, snapshot] = useDocumentData<Room>(roomRef);

  if (!snapshot?.exists() || error) {
    return (
      <Center h="100vh">
        <Heading>Something went wrong...</Heading>
        <Text>{error?.message}</Text>
      </Center>
    );
  }

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner />
      </Center>
    );
  }

  if (!teamId) {
    return <QuizEntry roomId={roomId} />;
  }

  if (room?.status === "closed") {
    return (
      <Flex align={"center"} justify={"center"} h={"100vh"}>
        <Heading>Quiz is closed</Heading>
      </Flex>
    );
  }

  if (room?.status === "waiting") {
    return <QuizWaiting roomId={roomId} teamId={teamId} />;
  }

  return <QuizPlay roomId={roomId} teamId={teamId} />;
}
