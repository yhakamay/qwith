import { collection, doc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Loading from "../../components/atoms/Loading";
import { SomethingWentWrong } from "../../components/atoms/SomethingWentWrong";
import QuizEntry from "../../components/organisms/QuizEntry";
import QuizPlay from "../../components/organisms/QuizPlay";
import QuizResult from "../../components/organisms/QuizResult";
import QuizWaiting from "../../components/organisms/QuizWaiting";
import { db } from "../../firebaseConfig";
import { roomConverter, Room } from "../../types/room";

export default function QuizPage() {
  const router = useRouter();
  const { roomId, teamId } = router.query;

  if (!router.isReady) {
    return <Loading />;
  }

  return (
    <QuizPageBody
      roomId={roomId as string}
      teamId={teamId as string | undefined}
    />
  );
}

type QuizPortalProps = {
  roomId: string;
  teamId?: string;
};

function QuizPageBody(props: QuizPortalProps) {
  const { roomId, teamId } = props;
  const roomsRef = collection(db, "rooms");
  const roomRef = doc(roomsRef, roomId).withConverter(roomConverter);
  const [room, loading, error, snapshot] = useDocumentData<Room>(roomRef);

  if (error) {
    return <SomethingWentWrong />;
  }

  if (!snapshot?.exists() || loading) {
    return <Loading />;
  }

  if (room?.status === "closed") {
    return <QuizResult roomId={roomId} />;
  }

  if (!teamId) {
    return <QuizEntry roomId={roomId} />;
  }

  if (room?.status === "waiting") {
    return <QuizWaiting roomId={roomId} teamId={teamId} />;
  }

  return <QuizPlay roomId={roomId} teamId={teamId} />;
}
