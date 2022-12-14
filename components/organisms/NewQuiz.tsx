import { Box, Button, Divider, HStack } from "@chakra-ui/react";
import { collection, CollectionReference, doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useHttpsCallable } from "react-firebase-hooks/functions";
import { db, functions } from "../../firebaseConfig";
import { Quiz, quizConverter } from "../../types/quiz";
import { Room, roomConverter } from "../../types/room";
import Loading from "../atoms/Loading";
import { QuizCard } from "../atoms/QuizCard";
import { SomethingWentWrong } from "../atoms/SomethingWentWrong";
import NewQuizForm from "../molecules/NewQuizForm";
import QuizzesList from "../molecules/QuizzesList";

type NewQuizProps = {
  roomId: string;
  room: Room;
};

export default function NewQuiz(props: NewQuizProps) {
  const { roomId, room } = props;
  const roomRef = doc(db, "rooms", roomId).withConverter(roomConverter);
  const quizzesRef = collection(roomRef, "quizzes").withConverter(
    quizConverter
  );
  const [startQuiz, loadingStartQuiz, errorStartQuiz] = useHttpsCallable(
    functions,
    "startQuiz"
  );
  const [nextQuiz, loadingNextQuiz, errorNextQuiz] = useHttpsCallable(
    functions,
    "nextQuiz"
  );
  const [previousQuiz, loadingPreviousQuiz, errorPreviousQuiz] =
    useHttpsCallable(functions, "previousQuiz");

  if (room.status === "waiting") {
    return (
      <>
        <Button
          colorScheme="green"
          onClick={async () => {
            await startQuiz({ roomId });
          }}
          isLoading={loadingStartQuiz}
          isDisabled={errorStartQuiz !== undefined}
        >
          Start Game
        </Button>
        <Box h="24px" />
        <Divider />
        <Box h="24px" />
        <NewQuizForm roomId={roomId} />
        <Box h="24px" />
        <QuizzesList roomId={roomId as string} />
      </>
    );
  }

  return (
    <>
      <CurrentQuizPreview
        quizzesRef={quizzesRef}
        currentQuizId={room.currentQuizId!}
      />
      <HStack>
        <Button
          variant="outline"
          onClick={async () => {
            await previousQuiz({ roomId });
          }}
          isLoading={loadingPreviousQuiz}
          isDisabled={errorPreviousQuiz !== undefined}
        >
          Previous Quiz
        </Button>
        <Button
          colorScheme="green"
          onClick={async () => {
            await nextQuiz({ roomId });
          }}
          isLoading={loadingNextQuiz}
          isDisabled={errorNextQuiz !== undefined}
        >
          Next Quiz
        </Button>
      </HStack>
    </>
  );
}

type CurrentQuizPreviewProps = {
  quizzesRef: CollectionReference<Quiz>;
  currentQuizId: string;
};

function CurrentQuizPreview(props: CurrentQuizPreviewProps) {
  const { quizzesRef, currentQuizId } = props;
  const [currentQuiz, loading, error] = useDocumentData(
    doc(quizzesRef, currentQuizId).withConverter(quizConverter)
  );

  if (error !== undefined) {
    return <SomethingWentWrong />;
  }

  if (loading || currentQuiz === undefined) {
    return <Loading />;
  }

  return <QuizCard quiz={currentQuiz} />;
}
