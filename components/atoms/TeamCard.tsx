import {
  Card,
  CardBody,
  Stat,
  StatLabel,
  Badge,
  StatNumber,
  StatHelpText,
} from "@chakra-ui/react";
import { Team } from "../../types/team";

type TeamCardProps = {
  team: Team;
  index: number;
};

export default function TeamCard(props: TeamCardProps) {
  const { team, index } = props;
  const { name, score } = team;

  return (
    <Card w={{ base: "sm", md: "lg" }}>
      <CardBody>
        <Stat>
          <StatLabel>
            {index === 0 ? (
              <Badge colorScheme="blue">1st</Badge>
            ) : index === 1 ? (
              <Badge colorScheme="green">2nd</Badge>
            ) : index === 2 ? (
              <Badge colorScheme="orange">3rd</Badge>
            ) : (
              `#${index + 1}`
            )}
          </StatLabel>
          <StatNumber>{name} </StatNumber>
          <StatHelpText>{score}</StatHelpText>
        </Stat>
      </CardBody>
    </Card>
  );
}
