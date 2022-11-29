import { Box } from "@chakra-ui/react";
import NewQuizForm from "../molecules/NewQuizForm";
import QuizzesList from "../molecules/QuizzesList";

type NewQuizProps = {
  roomId: string;
};

export default function NewQuiz(props: NewQuizProps) {
  const { roomId } = props;

  return (
    <>
      <NewQuizForm roomId={roomId} />
      <Box h="24px" />
      <QuizzesList roomId={roomId as string} />
    </>
  );
}
