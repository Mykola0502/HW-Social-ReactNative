import React, { useState } from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { useFonts } from "expo-font";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./firebase/config";

import { useRoute } from "./router";

import { store } from "./redux/store";

export default function App() {
  // console.log("Android");

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (user) => {
    console.log("user change", user);
    setUser(user);
  });

  const routing = useRoute(user);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>{routing}</NavigationContainer>
    </Provider>
  );
}
