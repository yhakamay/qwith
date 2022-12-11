import {
  Box,
  Card,
  CardBody,
  CardHeader,
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
  const { roomId } = props;
  const roomsRef = collection(db, "rooms");
  const roomRef = doc(roomsRef, roomId as string).withConverter(roomConverter);
  const teamsRef = collection(roomRef, "teams").withConverter(teamConverter);
  const [teams, loading, error] = useCollectionData<Team>(teamsRef);

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
      <Card minWidth="sm" maxWidth="100vw">
        <CardHeader>
          <Heading size="md">Teams</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            {teams?.map((team) => (
              <>
                <Heading size="xs" textTransform="uppercase">
                  {team.name}
                </Heading>

                <Box key={team.id}>
                  <Text>{team.name}</Text>
                </Box>
              </>
            ))}
          </Stack>
        </CardBody>
      </Card>
    </VStack>
  );
}
