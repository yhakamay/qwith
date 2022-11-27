import { Center, Heading, Spinner, Text, VStack } from "@chakra-ui/react";
import { collection, doc } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../firebaseConfig";
import { ChoiceQuiz, choiceQuizConverter } from "../../types/choiceQuiz";
import SingleQuiz from "../molecules/singleQuiz";

type QuizPlayProps = {
  roomId: string;
  teamId: string;
};

export default function QuizPlay(props: QuizPlayProps) {
  const { roomId, teamId } = props;
  const roomRef = doc(db, "rooms", roomId);
  const quizzesRef = collection(roomRef, "quizzes").withConverter(
    choiceQuizConverter
  );
  const [quizzes, loading, error] = useCollectionData<ChoiceQuiz>(quizzesRef);

  if (error || quizzes?.length === 0) {
    return (
      <VStack>
        <Heading>Something went wrong...</Heading>
        <Text>{error?.message}</Text>
      </VStack>
    );
  }

  if (loading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <VStack>
      <Heading>QuizPlay</Heading>
      <SingleQuiz roomId={roomId} teamId={teamId} quiz={quizzes![0]} />
    </VStack>
  );
}
