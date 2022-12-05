import { CloseIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  UnorderedList,
  ListItem,
  Badge,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { CollectionReference, deleteDoc, doc } from "firebase/firestore";
import { Quiz } from "../../types/quiz";

type QuizCardProps = {
  quiz: Quiz;
  index: number;
  quizzesRef?: CollectionReference<Quiz>;
  editable?: boolean;
};

export function QuizCard(props: QuizCardProps) {
  const { quiz, index, quizzesRef, editable } = props;
  const { question, answer: correctAnswer, options } = quiz;

  return (
    <Card w={{ base: "sm", md: "lg" }}>
      <CardBody>
        <HStack>
          <Stat>
            <StatLabel># {index + 1}</StatLabel>
            <StatNumber>{question}</StatNumber>
            <StatHelpText>
              <UnorderedList>
                {options?.map((option, index) => (
                  <>
                    <ListItem key={index}>
                      {option === correctAnswer ? (
                        <>
                          {option}
                          <Badge colorScheme="green" mx={2}>
                            Correct
                          </Badge>
                        </>
                      ) : (
                        <>{option}</>
                      )}
                    </ListItem>
                  </>
                ))}
              </UnorderedList>
            </StatHelpText>
          </Stat>
          {editable === true && (
            <IconButton
              aria-label="Delete quiz"
              icon={<CloseIcon />}
              onClick={() => deleteQuiz(quiz.id!)}
            />
          )}
        </HStack>
      </CardBody>
    </Card>
  );

  async function deleteQuiz(id: string) {
    if (quizzesRef) {
      await deleteDoc(doc(quizzesRef, id));
    }
  }
}
