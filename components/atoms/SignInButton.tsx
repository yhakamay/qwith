import { Button } from "@chakra-ui/react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebaseConfig";

export function SignInButton() {
  const [loading, setLoading] = useState(false);

  return (
    <Button onClick={signIn} isLoading={loading}>
      Sign In
    </Button>
  );

  function signIn() {
    const provider = new GoogleAuthProvider();

    setLoading(true);

    signInWithPopup(auth, provider)
      .then((result) => {
        GoogleAuthProvider.credentialFromResult(result);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });

    setLoading(false);
  }
}
