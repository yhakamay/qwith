import { Center, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import QuizGate from "../../../components/organisms/QuizGate";

export default function QuizPage() {
  const router = useRouter();
  const { roomId, teamId } = router.query;

  if (!router.isReady) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return <QuizGate roomId={roomId as string} teamId={teamId as string} />;
}
