import * as functions from "firebase-functions";
import admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();
const roomsRef = db.collection("rooms");

exports.getRoomIdWithPin = functions.https.onCall((data) => {
  const pin: string = data.pin;
  const querySnapshot = await roomsRef
    .where("pin", "==", pin)
    .where("status", "!=", "closed")
    .get()
    .then((querySnapshot) => {
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
});
