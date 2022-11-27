import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";

export type ChoiceQuiz = {
  id?: string;
  question: string;
  options: string[];
  answer: string;
};

export const choiceQuizConverter: FirestoreDataConverter<ChoiceQuiz> = {
  toFirestore(choiceQuiz: WithFieldValue<ChoiceQuiz>): DocumentData {
    return {
      question: choiceQuiz.question,
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
      id: snapshot.id,
      question: data.question,
      options: data.options,
      answer: data.answer,
    };
  },
};
