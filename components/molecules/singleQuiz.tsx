import {
  Card,
  CardBody,
  CardHeader,
  Radio,
  RadioGroup,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import { collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebaseConfig";
import { ChoiceQuiz } from "../../types/choiceQuiz";

export type SingleQuizProps = {
  roomId: string;
  teamId: string;
  quiz: ChoiceQuiz;
};

export default function SingleQuiz(props: SingleQuizProps) {
  const { roomId, teamId, quiz } = props;
  const [ans, setAns] = useState("");

  return (
    <Card>
      <CardHeader>{quiz.question}</CardHeader>
      <CardBody>
        <RadioGroup onChange={(e) => updateAns(e)} value={ans}>
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
  );

  async function updateAns(newAns: string) {
    setAns(newAns);

    // Set answer doc in sub-collection of the quiz doc, named 'answers'
    // Use teamId as doc id
    const roomsRef = collection(db, "rooms");
    const roomRef = doc(roomsRef, roomId as string);
    const quizzesRef = collection(roomRef, "quizzes");
    const quizRef = doc(quizzesRef, quiz.id);
    const answersRef = collection(quizRef, "answers");
    const answerRef = doc(answersRef, teamId);

    await setDoc(answerRef, {
      answer: newAns,
    });
  }
}
