import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();
const roomsRef = db.collection("rooms");

exports.getRoomIdWithPin = functions.https.onCall(async (data) => {
  const pin: string = data.pin;
  const querySnapshot = await roomsRef
    .where("pin", "==", pin)
    .where("status", "!=", "closed")
    .get();

  if (querySnapshot.empty || querySnapshot.docs.length === 0) {
    throw new functions.https.HttpsError(
      "not-found",
      "No room with that pin exists"
    );
  }

  if (querySnapshot.docs.length > 1) {
    throw new functions.https.HttpsError(
      "internal",
      "Multiple rooms with the same pin exist"
    );
  }

  return querySnapshot.docs[0].id;
});

type Room = {
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

export type Quiz = {
  id?: string;
  question: string;
  options: string[];
  answer: string;
};

exports.getCurrentQuiz = functions.https.onCall(async (data) => {
  const roomId: string = data.roomId;
  const room = await validateRoom(roomId);
  const currentQuizId = room.currentQuizId;

  if (currentQuizId === null) {
    throw new functions.https.HttpsError(
      "not-found",
      "No quiz is currently running"
    );
  }

  return await getQuizDoc(roomId, currentQuizId);
});

// Go to the next quiz in the room
exports.nextQuiz = functions.https.onCall(async (data) => {
  const roomId: string = data.roomId;
  const room = await validateRoom(roomId);
  const currentQuizId = room.currentQuizId;

  if (currentQuizId === null) {
    throw new functions.https.HttpsError(
      "not-found",
      "No quiz is currently running"
    );
  }

  const quizzesCollection = await getQuizzesCollection(roomId);
  const quizDoc = quizzesCollection.docs.find(
    (doc) => doc.id === currentQuizId
  );

  if (!quizDoc) {
    throw new functions.https.HttpsError(
      "internal",
      "Current quiz id does not exist in the room"
    );
  }

  const quizIndex = quizzesCollection.docs.indexOf(quizDoc);
  const nextQuizDoc = quizzesCollection.docs[quizIndex + 1];

  if (!nextQuizDoc) {
    throw new functions.https.HttpsError(
      "not-found",
      "No more quizzes in the room"
    );
  }

  await roomsRef
    .doc(roomId)
    .update({ currentQuizId: nextQuizDoc.id } as Partial<Room>);

  return nextQuizDoc.data();
});

// Go to the previous quiz in the room
exports.previousQuiz = functions.https.onCall(async (data) => {
  const roomId: string = data.roomId;
  const room = await validateRoom(roomId);
  const currentQuizId = room.currentQuizId;

  if (currentQuizId === null) {
    throw new functions.https.HttpsError(
      "not-found",
      "No quiz is currently running"
    );
  }

  const quizzesCollection = await getQuizzesCollection(roomId);
  const quizDoc = quizzesCollection.docs.find(
    (doc) => doc.id === currentQuizId
  );

  if (!quizDoc) {
    throw new functions.https.HttpsError(
      "internal",
      "Current quiz id does not exist in the room"
    );
  }

  const quizIndex = quizzesCollection.docs.indexOf(quizDoc);
  const previousQuizDoc = quizzesCollection.docs[quizIndex - 1];

  if (!previousQuizDoc) {
    throw new functions.https.HttpsError(
      "not-found",
      "No more quizzes in the room"
    );
  }

  await roomsRef
    .doc(roomId)
    .update({ currentQuizId: previousQuizDoc.id } as Partial<Room>);

  return previousQuizDoc.data();
});

async function getQuizzesCollection(roomId: string) {
  const roomRef = roomsRef.doc(roomId);
  await validateRoom(roomId);
  return await roomRef.collection("quizzes").get();
}

async function getQuizDoc(roomId: string, quizId: string) {
  const roomRef = roomsRef.doc(roomId);
  await validateRoom(roomId);
  return await roomRef.collection("quizzes").doc(quizId).get();
}

async function validateRoom(roomId: string): Promise<Room> {
  const doc = await roomsRef.doc(roomId).get();

  if (!doc.exists) {
    throw new functions.https.HttpsError(
      "not-found",
      "No room with that id exists"
    );
  }

  const room = doc.data() as Room;

  if (!room) {
    throw new functions.https.HttpsError(
      "internal",
      "Room data is null or undefined"
    );
  }
  return room;
}

exports.startQuiz = functions.https.onCall(async (data) => {
  const roomId: string = data.roomId;
  await validateRoom(roomId);
  const quizzesCollection = await getQuizzesCollection(roomId);

  if (quizzesCollection.empty) {
    throw new functions.https.HttpsError("not-found", "No quizzes in the room");
  }

  await roomsRef.doc(roomId).update({
    status: "playing",
    currentQuizId: quizzesCollection.docs[0].id,
  } as Partial<Room>);
});

exports.endQuiz = functions.https.onCall(async (data) => {
  const roomId: string = data.roomId;
  await validateRoom(roomId);
  await roomsRef.doc(roomId).update({
    status: "closed",
    currentQuizId: null,
  } as Partial<Room>);
});
