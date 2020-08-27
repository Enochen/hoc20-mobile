import * as React from "react";
import { Text, Button, View, StatusBar, StyleSheet, ColorSchemeName } from "react-native";
import * as GoogleSignIn from "expo-google-sign-in";
import { useState, useEffect } from "react";
import Navigation from "../navigation";

type Props = {
  colorScheme: ColorSchemeName;
};

export default ({ colorScheme }: Props) => {
  const [user, setUser] = useState<GoogleSignIn.GoogleUser>();

  useEffect(() => {
    const stuff = async () => {
      await GoogleSignIn.initAsync();
      const res = await GoogleSignIn.signInSilentlyAsync();
      if (res) {
        setUser(res);
      } else {
        throw new Error("auth error");
      }
    };
    stuff();
  }, []);

  const signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === "success") {
        const res = await GoogleSignIn.signInSilentlyAsync();
        if (res) {
          setUser(res);
        } else {
          throw new Error("auth error");
        }
      }
    } catch ({ message }) {
      alert("login: Error:" + message);
    }
  };

  console.log(user);

  const smth = user ? (
    <>
      <Navigation colorScheme={colorScheme} />
      <StatusBar />
    </>
  ) : (
    <Button title="Log In" onPress={signInAsync} />
  );

  return <View style={styles.container}>{smth}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
