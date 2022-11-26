import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";

export type Team = {
  id?: string;
  name: string;
  score: number;
};

export const teamConverter: FirestoreDataConverter<Team> = {
  toFirestore(team: WithFieldValue<Team>): DocumentData {
    return {
      name: team.name,
      score: team.score,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Team {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      name: data.name,
      score: data.score,
    };
  },
};
