import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";

export type Quiz = {
  id?: string;
  question: string;
  options: string[];
  answer: string;
};

export const quizConverter: FirestoreDataConverter<Quiz> = {
  toFirestore(quiz: WithFieldValue<Quiz>): DocumentData {
    return {
      question: quiz.question,
      options: quiz.options,
      answer: quiz.answer,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Quiz {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      question: data.question,
      options: data.options,
      answer: data.answer,
    };
  },
};
