import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { collection, doc, updateDoc } from "firebase/firestore";
import { GetServerSideProps } from "next";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Loading from "../../../components/atoms/Loading";
import { SomethingWentWrong } from "../../../components/atoms/SomethingWentWrong";
import NewQuiz from "../../../components/organisms/NewQuiz";
import { auth, db } from "../../../firebaseConfig";
import { roomConverter } from "../../../types/room";

type CreateQuizPageProps = {
  roomId: string;
};

export default function CreateQuizPage(props: CreateQuizPageProps) {
  const { roomId } = props;

  const [user] = useAuthState(auth);
  const roomsRef = collection(db, "rooms");
  const roomRef = doc(roomsRef, roomId).withConverter(roomConverter);
  const [room, loading, error] = useDocumentData(roomRef);

  if (loading) {
    return <Loading />;
  }

  if (error || !room || room.createdBy !== user?.uid) {
    return <SomethingWentWrong />;
  }

  return (
    <>
      <Heading>{room.title}</Heading>
      <Text>{room.description}</Text>
      {/* Change the status of the room */}
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Status
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => setStatus(roomId, "waiting")}>
            Waiting
          </MenuItem>
          <MenuItem onClick={() => setStatus(roomId, "playing")}>
            Playing
          </MenuItem>
          <MenuItem onClick={() => setStatus(roomId, "tallying")}>
            Tallying
          </MenuItem>
          <MenuItem onClick={() => setStatus(roomId, "closed")}>
            Closed
          </MenuItem>
        </MenuList>
      </Menu>
      <NewQuiz roomId={roomId} room={room} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const roomId = context.query.roomId;

  return {
    props: {
      roomId,
    },
  };
};

function setStatus(
  roomId: string,
  status: "waiting" | "playing" | "tallying" | "closed"
) {
  const roomsRef = collection(db, "rooms");
  const roomRef = doc(roomsRef, roomId).withConverter(roomConverter);
  updateDoc(roomRef, { status });
}
