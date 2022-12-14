import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Radio,
  RadioGroup,
  StackDivider,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebaseConfig";
import { Quiz } from "../../types/quiz";

export type SingleQuizProps = {
  roomId: string;
  teamId: string;
  quiz: Quiz;
};

export default function SingleQuiz(props: SingleQuizProps) {
  const { roomId, teamId, quiz } = props;
  const [ans, setAns] = useState("");
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isViewer = teamId === "viewer";

  return (
    <>
      <Heading size="lg" textAlign="center">
        {quiz.question}
      </Heading>
      <Box h="8" />
      <Card
        w={{
          base: "sm",
          md: "lg",
        }}
      >
        <CardBody>
          <RadioGroup
            onChange={(e) => setAns(e)}
            isDisabled={isViewer}
            value={ans}
          >
            <VStack divider={<StackDivider />} spacing="4">
              {quiz.options.map((option, index) => (
                <Radio key={index} value={option}>
                  {option}
                </Radio>
              ))}
            </VStack>
          </RadioGroup>
        </CardBody>
      </Card>
      <Box h="4" />
      {isViewer ? (
        <Alert status="info">
          <AlertIcon />
          Joining as a viewer. You cannot submit an answer.
        </Alert>
      ) : (
        <Button
          onClick={submitAns}
          isLoading={isSubmitting}
          colorScheme="green"
        >
          Submit
        </Button>
      )}
      <Box h="4" />
      {!isViewer ? (
        <Alert status="info">
          <AlertIcon />
          You can update your answer during the response time but not after
          moving on to the next question.
        </Alert>
      ) : null}
    </>
  );

  async function submitAns() {
    const roomsRef = collection(db, "rooms");
    const roomRef = doc(roomsRef, roomId as string);
    const quizzesRef = collection(roomRef, "quizzes");
    const quizRef = doc(quizzesRef, quiz.id);
    const answersRef = collection(quizRef, "answers");
    const answerRef = doc(answersRef, teamId);

    setIsSubmitting(true);

    try {
      await setDoc(answerRef, { answer: ans });
      // Wait for 1 second before setting isSubmitting to false
      // This is to show the loading state for better UX
      setTimeout(() => {
        setIsSubmitting(false);
        toast({
          title: "Answer submitted",
          description: "Your answer has been submitted",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }, 1000);
    } catch (e) {
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }
}
