import { VStack } from "@chakra-ui/react";
import { Team } from "../../types/team";
import TeamCard from "../atoms/TeamCard";

type TeamCardListViewProps = {
  teams: Team[];
};

export default function TeamCardListView(props: TeamCardListViewProps) {
  const { teams } = props;

  return (
    <VStack>
      {teams
        ?.sort((a, b) => b.score - a.score)
        .map((team, index) => (
          <TeamCard key={team.id} team={team} index={index} />
        ))}
    </VStack>
  );
}
