import { CheckIcon } from "@chakra-ui/icons";
import {
  Textarea,
  VStack,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  Button,
  Box,
} from "@chakra-ui/react";
import { collection, doc, addDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebaseConfig";
import { Quiz } from "../../functions/src";

type NewQuizFormProps = {
  roomId: string;
};

export default function NewQuizForm(props: NewQuizFormProps) {
  const { roomId } = props;
  const [loading, setLoading] = useState(false);
  const initialQuestion = "What is the capital of Japan?";
  const [question, setQuestion] = useState(initialQuestion);
  const initialOptions = ["Fukuoka", "Tokyo", "Osaka", "Nagoya"];
  const [answerIndex, setAnswerIndex] = useState(0);
  const [options, setOptions] = useState(initialOptions);

  return (
    <>
      {" "}
      <Textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Question"
        rows={8}
        resize="none"
      ></Textarea>
      <Box h="8px" />
      <VStack spacing={2} w="100%">
        {options.map((option, index) => (
          <InputGroup key={index}>
            <Input
              value={option}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[index] = e.target.value;
                setOptions(newOptions);
              }}
              placeholder={`Option ${index + 1}`}
              pr="2rem"
            />
            <InputRightElement>
              <IconButton
                aria-label="Mark as answer"
                h="1.75rem"
                size="sm"
                icon={<CheckIcon />}
                onClick={() => {
                  setAnswerIndex(index);
                }}
                colorScheme={answerIndex === index ? "green" : "gray"}
              />
            </InputRightElement>
          </InputGroup>
        ))}
      </VStack>
      <Button
        onClick={addQuiz}
        isLoading={loading}
        isDisabled={question === "" || options[0] === "" || options[1] === ""}
        width="full"
      >
        Add Quiz
      </Button>
    </>
  );

  async function addQuiz() {
    setLoading(true);

    const roomsRef = collection(db, "rooms");
    const roomRef = doc(roomsRef, roomId as string);
    const quizzesRef = collection(roomRef, "quizzes");
    const quiz: Quiz = {
      question: question,
      options: options,
      answer: options[answerIndex],
    };

    try {
      await addDoc(quizzesRef, quiz);
      setQuestion("");
      setOptions(["", "", "", ""]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
}
