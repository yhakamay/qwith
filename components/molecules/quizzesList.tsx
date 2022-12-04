import { VStack, Heading, Spinner, Box, Text, Center } from "@chakra-ui/react";
import { collection, doc } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../firebaseConfig";
import { quizConverter, Quiz } from "../../types/quiz";
import { QuizCard } from "../atoms/QuizCard";

export type QuizzesListProps = {
  roomId: string;
};

export default function QuizzesList(props: QuizzesListProps) {
  const { roomId } = props;

  const roomsRef = collection(db, "rooms");
  const roomRef = doc(roomsRef, roomId as string);
  const quizzesRef = collection(roomRef, "quizzes").withConverter(
    quizConverter
  );
  const [quizzes, loading, error] = useCollectionData<Quiz>(quizzesRef);

  if (error) {
    return (
      <Box>
        <Heading>Something went wrong...</Heading>
        <Text>{error?.message}</Text>
      </Box>
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
      {quizzes?.map((quiz, index) => (
        <QuizCard
          key={quiz.id}
          quizzesRef={quizzesRef}
          quiz={quiz}
          index={index}
          editable={true}
        />
      ))}
    </VStack>
  );
}
