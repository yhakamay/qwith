import { CheckIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Spacer,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { addDoc, collection, doc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import QuizzesList from "../../components/molecules/quizzesList";
import { auth, db } from "../../firebaseConfig";
import { ChoiceQuiz } from "../../types/choiceQuiz";

export default function CreateQuizPage() {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const { roomId } = router.query;
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");

  if (!router.isReady) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <VStack>
      <HStack w="100%">
        <Spacer />
        <IconButton
          onClick={saveRoom}
          isLoading={saving}
          icon={<CheckIcon />}
          aria-label={"Complete"}
        />
      </HStack>
      <FormControl isRequired>
        <FormLabel>Question</FormLabel>
        <Input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        ></Input>
      </FormControl>

      <Divider />

      <FormControl isRequired isDisabled={loading}>
        <FormLabel>Option #1 (Correct Answer)</FormLabel>
        <Input
          value={option1}
          onChange={(e) => setOption1(e.target.value)}
        ></Input>
      </FormControl>
      <FormControl isRequired isDisabled={loading}>
        <FormLabel>Option #2</FormLabel>
        <Input
          value={option2}
          onChange={(e) => setOption2(e.target.value)}
        ></Input>
      </FormControl>
      <FormControl isDisabled={loading}>
        <FormLabel>Option #3</FormLabel>
        <Input
          value={option3}
          onChange={(e) => setOption3(e.target.value)}
        ></Input>
      </FormControl>
      <FormControl isDisabled={loading}>
        <FormLabel>Option #4</FormLabel>
        <Input
          value={option4}
          onChange={(e) => setOption4(e.target.value)}
        ></Input>
      </FormControl>
      <Button
        onClick={addQuiz}
        isLoading={loading}
        isDisabled={question === "" || option1 === "" || option2 === ""}
        width="full"
      >
        Add
      </Button>
      <QuizzesList roomId={roomId as string} />
    </VStack>
  );

  // Add quiz to the room in firestore
  async function addQuiz() {
    setLoading(true);

    const roomsRef = collection(db, "rooms");
    const roomRef = doc(roomsRef, roomId as string);
    const quizzesRef = collection(roomRef, "quizzes");
    const quiz: ChoiceQuiz = {
      question: question,
      options: [option1, option2, option3, option4],
      answer: option1,
    };

    try {
      await addDoc(quizzesRef, quiz);
      setQuestion("");
      setOption1("");
      setOption2("");
      setOption3("");
      setOption4("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function saveRoom() {
    // There's nothing to do here since we save all the quizzes in real time
    // Just navigate the user to /users/[uid]/
    // However, clicking 'Save' takes 0 ms is not a good UX,
    // so we can add a loading state here
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);

    router.push(`/users/${user!.uid}`);
  }
}
