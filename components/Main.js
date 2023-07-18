import React, { useState, useEffect } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase/config";

import { useRoute } from "../router";

export const Main = () => {
  const [user, setUser] = useState(null);

  // console.log("user change", user);

  const state = useSelector((state) => state);

  console.log("state", state);

  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  const routing = useRoute(user);

  useEffect(() => {}, []);

  return <NavigationContainer>{routing}</NavigationContainer>;
};
