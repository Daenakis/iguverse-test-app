import { useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import { useRouter, useSearchParams, useLocalSearchParams } from "expo-router";
import { Profile } from "./components/Profile";

export default function ProfileScreen() {
  const router = useRouter();
  const {
    user
  } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      {user &&
        <Profile user={JSON.parse(user)} />
      }
      <Button title='Go Back' onPress={router.back}/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  name: {
    fontSize: 20,
    marginTop: 10
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});