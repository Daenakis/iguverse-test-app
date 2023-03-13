import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import * as Facebook from "expo-auth-session/providers/facebook";

type UseFacebookAuthReturnType = {
  facebookReady: boolean;
  facebookUser: {[key: string]: any} | null;
  onPressSignInWithFacebook: () => void;
};

export const useFacebookAuth = (): UseFacebookAuthReturnType => {
  const router = useRouter();

  const [facebookUser, setFacebookUser] = useState(null);
  const [requestFacebook, responseFacebook, promptAsyncFacebook] = Facebook.useAuthRequest({
    clientId: "1298272424236740",
  });

  const getFacebookUser = async (token: string) => {
    const user = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.type(large)`)
    .then((response) => response.json()).then((data) => data)
    .catch((e) => console.log(e));
    setFacebookUser(user);
    router.push({ pathname: 'profile', params: {user:JSON.stringify({...user,picture:{}})} });
  }

  useEffect(() => { //facebook
    if (responseFacebook && responseFacebook.type === "success" && responseFacebook.authentication)
      getFacebookUser(responseFacebook.authentication.accessToken);
  }, [responseFacebook]);

  const onPressSignInWithFacebook = async () => {
    const result = await promptAsyncFacebook();
    console.log('facebook result', result);
    if (result.type !== "success") {
      alert("Uh oh, something went wrong");
      return;
    }
  };

  return {
    facebookReady: !!requestFacebook,
    facebookUser,
    onPressSignInWithFacebook,
  };
};