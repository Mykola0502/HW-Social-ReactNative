import React, { useState, useEffect } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
// import { onAuthStateChanged } from "firebase/auth";

// import { auth } from "../firebase/config";

import { useRoute } from "../router";

import { authStateChangeUser } from "../redux/auth/authOperations";

export const Main = () => {
  //   const [user, setUser] = useState(null);

  const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect((auth) => {
    dispatch(authStateChangeUser());
  }, []);

  //   onAuthStateChanged(auth, (user) => {
  //     setUser(user);
  //   });

  const routing = useRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};
