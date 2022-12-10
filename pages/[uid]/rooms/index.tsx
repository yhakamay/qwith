import {
  VStack,
  Heading,
  Text,
  Card,
  CardHeader,
  CardBody,
  HStack,
} from "@chakra-ui/react";
import { collection, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Loading from "../../../components/atoms/Loading";
import { SomethingWentWrong } from "../../../components/atoms/SomethingWentWrong";
import { db } from "../../../firebaseConfig";
import { roomConverter } from "../../../types/room";

export default function MyRoomsPage() {
  const router = useRouter();
  const { uid } = router.query;

  if (!router.isReady) {
    return <Loading />;
  }

  return <MyRoomsPageBody uid={uid as string} />;
}

type MyRoomsPageBodyProps = {
  uid: string;
};

function MyRoomsPageBody(props: MyRoomsPageBodyProps) {
  const { uid } = props;
  const router = useRouter();
  const roomsRef = collection(db, "rooms").withConverter(roomConverter);
  const roomsQuery = query(roomsRef, where("createdBy", "==", uid));
  const [rooms, loading, error] = useCollectionData(roomsQuery);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <SomethingWentWrong />;
  }

  return (
    <VStack spacing={4}>
      <Heading size="lg">My Rooms</Heading>
      {rooms?.map((room) => (
        <>
          <Card
            key={room.id}
            cursor="pointer"
            onClick={() => router.push(`/${uid}/rooms/${room.id}`)}
          >
            <CardHeader>
              <HStack justify="space-between">
                <Heading size="md" noOfLines={1}>
                  {room.title}
                </Heading>
              </HStack>
            </CardHeader>
            <CardBody>
              <Text noOfLines={3} textOverflow="ellipsis">
                {room.description}
              </Text>
            </CardBody>
          </Card>
        </>
      ))}
    </VStack>
  );
}
