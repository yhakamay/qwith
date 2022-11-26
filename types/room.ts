import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";
import { ChoiceQuiz } from "./choiceQuiz";
import { Team } from "./team";

export type Room = {
  pin: number;
  status: "waiting" | "playing" | "closed";
  title: string;
  description?: string;
  quizzes: ChoiceQuiz[];
  teams: Team[];
};

export const roomConverter: FirestoreDataConverter<Room> = {
  toFirestore(room: WithFieldValue<Room>): DocumentData {
    return {
      pin: room.pin,
      status: room.status,
      title: room.title,
      description: room.description,
      quizzes: room.quizzes,
      teams: room.teams,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Room {
    const data = snapshot.data(options);
    return {
      pin: data.pin,
      status: data.status,
      title: data.title,
      description: data.description,
      quizzes: data.quizzes,
      teams: data.teams,
    };
  },
};
