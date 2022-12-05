import { VStack } from "@chakra-ui/react";
import { Quiz } from "../../types/quiz";
import { QuizCard } from "../atoms/QuizCard";

type QuizCardListViewProps = {
  quizzes: Quiz[];
};

export default function QuizCardListView(props: QuizCardListViewProps) {
  const { quizzes } = props;

  return (
    <VStack>
      {quizzes?.map((quiz, index) => (
        <QuizCard key={quiz.id} quiz={quiz} index={index} />
      ))}
    </VStack>
  );
}
