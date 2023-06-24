import React, { useState, useEffect } from "react";

import {} from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

import { DefaultScreen } from "../nestedScreens/DefaultScreen";
import { MapScreen } from "../nestedScreens/MapScreen";
import { CommentsScreen } from "../nestedScreens/CommentsScreen";

const NestedScreen = createStackNavigator();

export const PostsScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreen}
        options={{ headerShown: false }}
      />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
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
