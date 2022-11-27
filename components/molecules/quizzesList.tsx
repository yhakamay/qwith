import { CloseIcon } from "@chakra-ui/icons";
import {
  VStack,
  Heading,
  Spinner,
  Card,
  CardBody,
  Stack,
  StackDivider,
  Box,
  Text,
  Center,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../firebaseConfig";
import { choiceQuizConverter, ChoiceQuiz } from "../../types/choiceQuiz";

export type QuizzesListProps = {
  roomId: string;
};

export default function QuizzesList(props: QuizzesListProps) {
  const { roomId } = props;

  const roomsRef = collection(db, "rooms");
  const roomRef = doc(roomsRef, roomId as string);
  const quizzesRef = collection(roomRef, "quizzes").withConverter(
    choiceQuizConverter
  );
  const [quizzes, loading, error] = useCollectionData<ChoiceQuiz>(quizzesRef);

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
      <Card overflow="hidden">
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            {quizzes?.map((quiz) => (
              <HStack key={quiz.id} justifyContent="space-between">
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    {quiz.question}
                  </Heading>
                  {quiz.options.map((option, index) => (
                    <Text key={`${quiz.id}-${index}`} pt="2" fontSize="sm">
                      {`${option} ${option === quiz.answer ? "← answer" : ""} `}
                    </Text>
                  ))}
                </Box>
                <IconButton
                  onClick={() => deleteQuiz(quiz.id!)}
                  aria-label={"Delete"}
                  icon={<CloseIcon />}
                ></IconButton>
              </HStack>
            ))}
          </Stack>
        </CardBody>
      </Card>
    </VStack>
  );

  async function deleteQuiz(id: string) {
    // Delete document from firestore collection
    await deleteDoc(doc(quizzesRef, id));
  }
}
