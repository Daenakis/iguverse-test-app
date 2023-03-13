import { useEffect } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { useFacebookAuth, useGoogleAuth } from './hooks';
import { useRouter } from "expo-router";

export default function AuthScreen() {
  const router = useRouter();

  const { facebookReady, facebookUser, onPressSignInWithFacebook } = useFacebookAuth();
  const { googleReady, googleUser, onPressSignInWithGoogle } = useGoogleAuth();

  ///////////////////

  return (
    <View style={s.container}>
      <View style={s.itemsContainer}>
        <Image
          style={s.image}
          source={{
            uri: "https://pbs.twimg.com/profile_images/1604890979890532352/0dzZFYrd_400x400.jpg",
          }}
        />
        <View style={s.textCont}>
          <Text style={s.title}>React Native / Expo Senior #7</Text>
        </View>
        <Button
          disabled={!facebookReady}
          title="Sign in with Facebook"
          onPress={() => onPressSignInWithFacebook()}
        />
        <Button
          disabled={!googleReady}
          title="Sign in with Google"
          onPress={() => onPressSignInWithGoogle()}
        />
      </View>
    </View>
  );
}
  
const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  name: {
    fontSize: 20,
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 40,
    overflow: "hidden",
  },
  itemsContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    alignSelf: "center",
    maxWidth: 1200,
    height: "100%",
    justifyContent: "center",
  },
  textCont: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
});