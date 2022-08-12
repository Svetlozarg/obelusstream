import { GoogleButton } from "react-google-button";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login() {
  const { user, googleSingIn } = UserAuth();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      await googleSingIn();
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, []);

  return (
    <div className="login-page">
      <h2>Login to access your profile</h2>
      <GoogleButton onClick={handleGoogleSignIn} />
    </div>
  );
}
