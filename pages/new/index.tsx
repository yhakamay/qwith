import { Button, Heading, Input, Textarea, VStack } from "@chakra-ui/react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../../components/atoms/Loading";
import { SomethingWentWrong } from "../../components/atoms/SomethingWentWrong";
import { auth, db } from "../../firebaseConfig";
import { Room } from "../../types/room";

const signIn = () => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

const signOut = () => {
  auth.signOut();
};

export default function CreateRoomPage() {
  const [user, loadingAuth, error] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  if (loadingAuth) {
    return <Loading />;
  }

  if (error) {
    return <SomethingWentWrong />;
  }

  if (!user) {
    return (
      <VStack>
        <Heading>Sign in to create a quiz</Heading>
        <Button onClick={signIn}>Sign In with Google</Button>
      </VStack>
    );
  }

  return (
    <>
      <VStack w="100%">
        <Heading>Create Room</Heading>
        <Button onClick={signOut} variant="outline">
          Sign Out
        </Button>
        <Input
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
          placeholder="Title"
        ></Input>
        <Textarea
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
          placeholder="Description"
          resize="none"
          h="sm"
        ></Textarea>
        <Button
          onClick={createRoom}
          isLoading={loading}
          isDisabled={title === "" || description === ""}
          width="full"
        >
          Create Room
        </Button>
      </VStack>
    </>
  );

  async function createRoom() {
    setLoading(true);

    const roomsRef = collection(db, "rooms");
    const pin = await decidePin();
    const room: Room = {
      title,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      createdBy: user!.uid,
      pin: pin!,
      status: "waiting",
      currentQuizId: null,
    };

    try {
      const docRef = await addDoc(roomsRef, room);
      router.push(`/${auth.currentUser?.uid}/rooms/${docRef.id}`);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function decidePin() {
    const pin = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    const roomsRef = collection(db, "rooms");
    const q = query(
      roomsRef,
      where("pin", "==", pin),
      where("status", "==", "waiting")
    );
    const matchedRooms = await getDocs(q);

    if (matchedRooms.size > 0) {
      // Already exists, try again
      decidePin();
    } else {
      return pin;
    }
  }
}
