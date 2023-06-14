import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { useFonts } from "expo-font";
// import * as Font from "expo-font";

import { RegistrationScreen } from "./Screens/auth/RegistrationScreen";
import { LoginScreen } from "./Screens/auth/LoginScreen";
import { PostsScreen } from "./Screens/auth/PostsScreen";

import bgImage from "./assets/images/bgImage.png";

export default function App() {
  // console.log("Android");

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View
      style={styles.container}
      // onLayout={onLayoutRootView}
    >
      <ImageBackground source={bgImage} style={styles.image}>
        <RegistrationScreen />
        {/* <LoginScreen /> */}
        {/* <PostsScreen /> */}
        {/* <StatusBar style="auto" /> */}
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    // alignItems: "center",
    // justifyContent: "center",
    // width: "100%",
  },
});
