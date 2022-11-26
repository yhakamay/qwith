import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";

export type ChoiceQuiz = {
  q: string;
  options: string[];
  answer: string;
};

export const choiceQuizConverter: FirestoreDataConverter<ChoiceQuiz> = {
  toFirestore(choiceQuiz: WithFieldValue<ChoiceQuiz>): DocumentData {
    return {
      q: choiceQuiz.q,
      options: choiceQuiz.options,
      answer: choiceQuiz.answer,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): ChoiceQuiz {
    const data = snapshot.data(options);
    return {
      q: data.q,
      options: data.options,
      answer: data.answer,
    };
  },
};
