import * as React from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import * as GoogleSignIn from "expo-google-sign-in";
import {  useEffect } from "react";
import { AuthContext } from "../navigation";
import { Button } from 'react-native-elements';
import { Dimensions } from "react-native";

export default () => {

  const { signIn } = React.useContext(AuthContext);
  const screenWidth = Dimensions.get("window").width;

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
    await signIn("hi");
  };

  return (
    <View style={styles.container}>
      <Button title="Log In" onPress={signInAsync} style={{ width: screenWidth * .9, borderRadius: 10 }} />
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
