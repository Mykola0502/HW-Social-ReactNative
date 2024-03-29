import React from "react";
import { useFonts } from "expo-font";
import "react-native-gesture-handler";
// import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";

import { store } from "./redux/store";

import { Main } from "./components/Main";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
