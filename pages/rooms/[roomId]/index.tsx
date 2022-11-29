import { Center, Heading, Spinner, Text, VStack } from "@chakra-ui/react";
import { collection, doc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useDocumentData } from "react-firebase-hooks/firestore";
import QuizEntry from "../../../components/organisms/quizEntry";
import QuizPlay from "../../../components/organisms/quizPlay";
import QuizWaiting from "../../../components/organisms/quizWaiting";
import { db } from "../../../firebaseConfig";
import { roomConverter, Room } from "../../../types/room";

export default function QuizPage() {
  const router = useRouter();
  const { roomId, teamId } = router.query;

  if (!router.isReady) {
    return (
      <Center h="100vh">
        <Spinner />
      </Center>
    );
  }

  return (
    <QuizPortal
      roomId={roomId as string}
      teamId={teamId as string | undefined}
    />
  );
}

type QuizPortalProps = {
  roomId: string;
  teamId?: string;
};

function QuizPortal(props: QuizPortalProps) {
  const { roomId, teamId } = props;
  const roomsRef = collection(db, "rooms");
  const roomRef = doc(roomsRef, roomId).withConverter(roomConverter);
  const [room, loading, error, snapshot] = useDocumentData<Room>(roomRef);

  if (error) {
    return (
      <VStack h="100vh">
        <Heading>Something went wrong...</Heading>
        <Text>{error?.message}</Text>
      </VStack>
    );
  }

  if (!snapshot?.exists() || loading) {
    return (
      <Center h="100vh">
        <Spinner />
      </Center>
    );
  }

  if (room?.status === "closed") {
    return (
      <VStack h="100vh">
        <Text>This room is closed 👋</Text>
      </VStack>
    );
  }

  if (!teamId) {
    return <QuizEntry roomId={roomId as string} />;
  }

  if (room?.status === "waiting") {
    return <QuizWaiting roomId={roomId as string} teamId={teamId as string} />;
  }

  return <QuizPlay roomId={roomId as string} teamId={teamId as string} />;
}
