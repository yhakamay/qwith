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
import { collection, doc } from "firebase/firestore";
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
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Status
        </MenuButton>
        <MenuList>
          <MenuItem>Waiting</MenuItem>
          <MenuItem>Playing</MenuItem>
          <MenuItem>Tallying</MenuItem>
          <MenuItem>Closed</MenuItem>
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
