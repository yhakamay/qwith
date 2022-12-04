import { CollectionReference, doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Quiz } from "../../functions/src";
import { quizConverter } from "../../types/quiz";
import Loading from "../atoms/Loading";
import { SomethingWentWrong } from "../atoms/SomethingWentWrong";
import SingleQuiz from "./SingleQuiz";

type CurrentQuizProps = {
  roomId: string;
  teamId: string;
  quizzesRef: CollectionReference<Quiz>;
  currentQuizId: string;
};

export default function CurrentQuiz(props: CurrentQuizProps) {
  const { roomId, teamId, quizzesRef, currentQuizId } = props;
  const currentQuizRef = doc(quizzesRef, currentQuizId).withConverter(
    quizConverter
  );
  const [currentQuiz, loading, error] = useDocumentData(currentQuizRef);

  if (error) {
    return <SomethingWentWrong />;
  }

  if (loading) {
    return <Loading />;
  }

  return <SingleQuiz roomId={roomId} teamId={teamId} quiz={currentQuiz!} />;
}
