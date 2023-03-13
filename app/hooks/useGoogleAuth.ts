import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import * as Google from "expo-auth-session/providers/google";

type UseGoogleAuthReturnType = {
  googleReady: boolean;
  googleUser: { [key: string]: any } | null;
  onPressSignInWithGoogle: () => void;
};

export const useGoogleAuth = (): UseGoogleAuthReturnType => {
  const router = useRouter();

  const [googleUser, setGoogleUser] = useState(null);
  const [requestGoogle, responseGoogle, promptAsyncGoogle] =
    Google.useAuthRequest({
      androidClientId:
        "807430476422-29719in2ji754jjm40vh4vpcj2hsed0c.apps.googleusercontent.com",
      iosClientId: "GOOGLE_GUID.apps.googleusercontent.com",
      webClientId:
        "807430476422-oupitf0pjer4s2lra4dg53dbdf36sdpg.apps.googleusercontent.com",
        expoClientId:'807430476422-29719in2ji754jjm40vh4vpcj2hsed0c.apps.googleusercontent.com'
    });

  const getUserGoogleInfo = async (token: string) => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.json();
      setGoogleUser(user);
      user.picture = {};
      router.push({
        pathname: "profile",
        params: { user: JSON.stringify(user) },
      });
    } catch (error) {
      console.log(error, "google error");
      // Add your own error handler here
    }
  };

  useEffect(() => {
    console.log(responseGoogle, "responseGoogle");
    if (responseGoogle?.type === "success" && responseGoogle.authentication)
      getUserGoogleInfo(responseGoogle.authentication.accessToken);
  }, [responseGoogle]);

  return {
    googleReady: !!requestGoogle,
    googleUser,
    onPressSignInWithGoogle: promptAsyncGoogle,
  };
};
