import {Image, StyleSheet, Text, View } from "react-native";

export function Profile({ user }) {
    return (
      <View style={styles.profile}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.name}>{user.email}</Text>
      </View>
    );
  }

  const styles = StyleSheet.create({
    profile: {
      alignItems: "center"
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