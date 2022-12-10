import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";

export type Room = {
  id?: string;
  pin: string;
  status: "waiting" | "playing" | "closed";
  title: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
  createdBy: string;
  currentQuizId: string | null;
};

export const roomConverter: FirestoreDataConverter<Room> = {
  toFirestore(room: WithFieldValue<Room>): DocumentData {
    return {
      pin: room.pin,
      status: room.status,
      title: room.title,
      description: room.description,
      createdAt: room.createdAt,
      updatedAt: room.updatedAt,
      expiresAt: room.expiresAt,
      createdBy: room.createdBy,
      currentQuizId: room.currentQuizId,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Room {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      pin: data.pin,
      status: data.status,
      title: data.title,
      description: data.description,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
      expiresAt: data.expiresAt.toDate(),
      createdBy: data.createdBy,
      currentQuizId: data.currentQuizId,
    };
  },
};
