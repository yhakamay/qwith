import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";

export type Room = {
  pin: string;
  status: "waiting" | "playing" | "closed";
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
  createdBy: string;
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
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
      expiresAt: data.expiresAt.toDate(),
      createdBy: data.createdBy,
    };
  },
};
