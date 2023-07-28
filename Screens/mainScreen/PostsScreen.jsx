import React, { useState, useEffect } from "react";

import { TouchableOpacity, Image } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

import { DefaultScreen } from "../nestedScreens/DefaultScreen";
import { MapScreen } from "../nestedScreens/MapScreen";
import { CommentsScreen } from "../nestedScreens/CommentsScreen";

import { LogoTitle } from "../../components/LogoTitle";

const NestedScreen = createStackNavigator();

export const PostsScreen = () => {
  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <NestedScreen.Navigator
      // screenOptions={{ headerShown: false }}
      screenOptions={{
        headerStyle: {
          height: 88,
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: 0.5,
          },
          shadowOpacity: 0.3,
          shadowRadius: 0,
        },
        headerTitleAlign: "center",
        headerTitle: (props) => {
          return <LogoTitle {...props} />;
        },
        headerBackImage: () => (
          <Image
            source={require("../../assets/icons/back.png")}
            style={{ marginLeft: 5 }}
          />
        ),
      }}
    >
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreen}
        options={{
          title: "Публікації",
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 16 }} onPress={signOut}>
              <Image source={require("../../assets/icons/logOut.png")} />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: "Коментарі",
        }}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{ title: "Карта" }}
      />
    </NestedScreen.Navigator>
    // <AuthStack.Navigator>
    //   <AuthStack.Screen
    //     name="Login"
    //     component={LoginScreen}
    //     options={{ headerShown: false }}
    //   />
    //   <AuthStack.Screen
    //     name="Register"
    //     component={RegistrationScreen}
    //     options={{ headerShown: false }}
    //   />
    // </AuthStack.Navigator>
  );
};
