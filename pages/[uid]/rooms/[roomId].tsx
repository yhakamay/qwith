import { Center, Spinner } from "@chakra-ui/react";
import { collection, doc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Loading from "../../../components/atoms/Loading";
import { SomethingWentWrong } from "../../../components/atoms/SomethingWentWrong";
import NewQuiz from "../../../components/organisms/NewQuiz";
import { auth, db } from "../../../firebaseConfig";
import { roomConverter } from "../../../types/room";

export default function CreateQuizPage() {
  const router = useRouter();
  const { roomId } = router.query;

  if (!router.isReady) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return <CreateQuizPageBody roomId={roomId as string} />;
}

type CreateQuizPageBodyProps = {
  roomId: string;
};

function CreateQuizPageBody(props: CreateQuizPageBodyProps) {
  const { roomId } = props;
  const [user] = useAuthState(auth);
  const roomsRef = collection(db, "rooms");
  const [room, loading, error] = useDocumentData(
    doc(roomsRef, roomId as string).withConverter(roomConverter)
  );

  if (loading) {
    return <Loading />;
  }

  if (error || !room || room.createdBy !== user?.uid) {
    return <SomethingWentWrong />;
  }

  return <NewQuiz roomId={roomId} />;
}
