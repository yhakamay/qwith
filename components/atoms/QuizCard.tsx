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
} from "@chakra-ui/react";
import { Quiz } from "../../functions/src";

type QuizCardProps = {
  quiz: Quiz;
  index: number;
};

export function QuizCard(props: QuizCardProps) {
  const { quiz, index } = props;
  const { question, answer: correctAnswer, options } = quiz;

  return (
    <Card w={{ base: "sm", md: "lg" }}>
      <CardBody>
        <Stat>
          <StatLabel># {index + 1}</StatLabel>
          <StatNumber>{question}</StatNumber>
          <StatHelpText>
            <UnorderedList>
              {options?.map((option) => (
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
      </CardBody>
    </Card>
  );
}
