import {
  Alert,
  AlertIcon,
  Card,
  CardBody,
  Center,
  Heading,
  HStack,
  Spinner,
  Stack,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { collection, doc } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../firebaseConfig";
import { roomConverter } from "../../types/room";
import { Team, teamConverter } from "../../types/team";
import Loading from "../atoms/Loading";

export type QuizWaitingProps = {
  roomId: string;
  teamId: string;
};

export default function QuizWaiting(props: QuizWaitingProps) {
  const { roomId, teamId } = props;
  const roomsRef = collection(db, "rooms");
  const roomRef = doc(roomsRef, roomId as string).withConverter(roomConverter);
  const teamsRef = collection(roomRef, "teams").withConverter(teamConverter);
  const [teams, loading, error] = useCollectionData<Team>(teamsRef);
  const isViewer = teamId === "viewer";

  if (error) {
    return (
      <Center h="100vh">
        <Heading>Something went wrong...</Heading>
        <Text>{error?.message}</Text>
      </Center>
    );
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <VStack>
      <HStack>
        <Heading size="md">{`Waiting for others to join`}</Heading>
        <Spinner size="sm" />
      </HStack>
      {isViewer ? (
        <Alert status="info">
          <AlertIcon />
          Joining as a viewer. You cannot submit an answer.
        </Alert>
      ) : null}
      <Card w={{ base: "sm", md: "lg" }}>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            {teams?.map((team) => (
              <>
                <HStack>
                  <Heading size="sm" textTransform="uppercase">
                    {team.name}
                  </Heading>
                  {team.id === teamId ? (
                    <Text fontSize="xs" color="gray.500">
                      (You)
                    </Text>
                  ) : null}
                </HStack>
              </>
            ))}
          </Stack>
        </CardBody>
      </Card>
    </VStack>
  );
}
