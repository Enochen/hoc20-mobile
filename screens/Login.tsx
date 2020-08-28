import * as React from "react";
import {
  Text,
  Button,
  View,
  StatusBar,
  StyleSheet,
  ColorSchemeName,
} from "react-native";
import * as GoogleSignIn from "expo-google-sign-in";
import { useState, useEffect } from "react";
import Navigation, { AuthContext } from "../navigation";
import AsyncStorage from "@react-native-community/async-storage";

export default () => {
  
  const { signIn } = React.useContext(AuthContext);

  useEffect(() => {
    const tryLogin = async () => {
      await GoogleSignIn.initAsync();
      const res = await GoogleSignIn.signInSilentlyAsync();
      const userToken = res?.auth?.idToken;
      if (userToken) {
        await signIn(userToken);
      } else {
        throw new Error("auth error");
      }
    };
    tryLogin();
  }, []);

  const signInAsync = async () => {
    // try {
    //   await GoogleSignIn.askForPlayServicesAsync();
    //   const { type, user } = await GoogleSignIn.signInAsync();
    //   if (type === "success") {
    //     const res = await GoogleSignIn.signInSilentlyAsync();
    //     if (res) {
    //       setUser(res);
    //     } else {
    //       throw new Error("auth error");
    //     }
    //   }
    // } catch ({ message }) {
    //   alert("login: Error:" + message);
    // }
    const user = new GoogleSignIn.GoogleUser({});
    const userToken = user?.auth?.idToken;
    await signIn("hi");
  };

  return (
    <View style={styles.container}>
      <Button title="Log In" onPress={signInAsync} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
