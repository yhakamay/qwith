import {
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import { collection, doc } from "firebase/firestore";
import { useRouter } from "next/router";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import Loading from "../../components/atoms/Loading";
import QuizCardListView from "../../components/molecules/QuizCardListView";
import TeamCardListView from "../../components/molecules/TeamCardListView";
import { db } from "../../firebaseConfig";
import { quizConverter } from "../../types/quiz";
import { roomConverter } from "../../types/room";
import { teamConverter } from "../../types/team";

export default function ResultPage() {
  const router = useRouter();
  const { roomId } = router.query;

  if (!router.isReady) {
    return <Loading />;
  }

  return <ResultPageBody roomId={roomId as string} />;
}

type ResultPageBodyProps = {
  roomId: string;
};

function ResultPageBody(props: ResultPageBodyProps) {
  const { roomId } = props;
  const roomsRef = collection(db, "rooms").withConverter(roomConverter);
  const roomRef = doc(roomsRef, roomId).withConverter(roomConverter);
  const [room, loadingRoom, errorLoadingRoom] = useDocumentData(roomRef);
  const teamsRef = collection(roomRef, "teams").withConverter(teamConverter);
  const [teams, loadingTeams, errorLoadingTeams] = useCollectionData(teamsRef);
  const quizzesRef = collection(roomRef, "quizzes").withConverter(
    quizConverter
  );
  const [quizzes, loadingQuizzes, errorLoadingQuizzes] =
    useCollectionData(quizzesRef);

  if (loadingRoom || loadingTeams || loadingQuizzes) {
    return <Loading />;
  }

  if (
    errorLoadingRoom ||
    errorLoadingTeams ||
    errorLoadingQuizzes ||
    !room ||
    !teams ||
    !quizzes
  ) {
    return <p>Something went wrong</p>;
  }

  return (
    <VStack>
      <Heading>{room?.title}</Heading>
      <Tabs isFitted>
        <TabList>
          <Tab>{`${teams?.length} ${
            teams?.length === 1 ? "team" : "teams"
          }`}</Tab>
          <Tab>
            {`${quizzes?.length} ${quizzes?.length === 1 ? "quiz" : "quizzes"}`}
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <TeamCardListView teams={teams} />
          </TabPanel>
          <TabPanel>
            <QuizCardListView quizzes={quizzes} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
}
