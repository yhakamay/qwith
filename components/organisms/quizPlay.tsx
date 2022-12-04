import { Center, Heading, Spinner, VStack } from "@chakra-ui/react";
import { collection, doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "../../firebaseConfig";
import { quizConverter } from "../../types/quiz";
import { roomConverter } from "../../types/room";
import { SomethingWentWrong } from "../atoms/SomethingWentWrong";
import CurrentQuiz from "../molecules/CurrentQuiz";

type QuizPlayProps = {
  roomId: string;
  teamId: string;
};

export default function QuizPlay(props: QuizPlayProps) {
  const { roomId, teamId } = props;
  const roomRef = doc(db, "rooms", roomId).withConverter(roomConverter);
  const [room, loading, error] = useDocumentData(roomRef);
  const quizzesRef = collection(roomRef, "quizzes").withConverter(
    quizConverter
  );

  if (error || !room || !room.currentQuizId) {
    return <SomethingWentWrong />;
  }

  if (loading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <VStack pt="30vh">
      <Heading>{room?.title}</Heading>
      <CurrentQuiz
        quizzesRef={quizzesRef}
        teamId={teamId}
        roomId={roomId}
        currentQuizId={room?.currentQuizId!}
      />
    </VStack>
  );
}
