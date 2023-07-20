import React from "react";

import { Image, TouchableOpacity, Button, Text } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useDispatch } from "react-redux";

import { RegistrationScreen } from "./Screens/auth/RegistrationScreen";
import { LoginScreen } from "./Screens/auth/LoginScreen";
import { PostsScreen } from "./Screens/mainScreen/PostsScreen";
import { CreatePostsScreen } from "./Screens/mainScreen/CreatePostsScreen";
import { ProfileScreen } from "./Screens/mainScreen/ProfileScreen";
import { LogoTitle } from "./components/LogoTitle";

import { authSignOutUser } from "./redux/auth/authOperations";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = (isAuth) => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="Register"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
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
        tabBarShowLabel: false,
        tabBarStyle: {
          //   height: 71,
          paddingTop: 9,
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: -0.5,
          },
          shadowOpacity: 0.3,
          shadowRadius: 0,
        },
        // tabBarIcon: ({ focused, color, size }) => (
        //   <Image
        //     source={require("./assets/icons/posts.png")}
        //     fadeDuration={0}
        //     style={size}
        //   />
        // ),
      }}
    >
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          title: "Публікації",
          //   headerStyle: {
          //     height: 88,
          //     shadowColor: "#000000",
          //     shadowOffset: {
          //       width: 0,
          //       height: 0.5,
          //     },
          //     shadowOpacity: 0.3,
          //     shadowRadius: 0,
          //   },
          //   headerTintColor: "#212121",
          //   headerTitleAlign: "center",
          //   headerTitleStyle: {
          //     // paddingVertical: 11,
          //     color: "#212121",
          //     fontFamily: "Roboto-Medium",
          //     fontSize: 17,
          //     lineHeight: 22,
          //     // textAlign: "center",
          //   },
          //   headerTitle: (props) => {
          //     return <LogoTitle {...props} />;
          //   },
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 16 }} onPress={signOut}>
              <Image source={require("./assets/icons/logOut.png")} />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require("./assets/icons/posts.png")}
              fadeDuration={0}
              style={size}
            />
          ),
        }}
      />
      <MainTab.Screen
        name="Create"
        component={CreatePostsScreen}
        options={({ navigation }) => ({
          title: "Створити публікацію",
          //   headerStyle: {
          //     height: 88,
          //     shadowColor: "#000000",
          //     shadowOffset: {
          //       width: 0,
          //       height: 0.5,
          //     },
          //     shadowOpacity: 0.3,
          //     shadowRadius: 0,
          //   },
          //   headerTitleAlign: "center",
          //   headerTitleStyle: {
          //     // paddingVertical: 11,
          //     color: "#212121",
          //     fontFamily: "Roboto-Medium",
          //     fontSize: 17,
          //     lineHeight: 22,
          //     // textAlign: "center",
          //   },
          //   headerTitle: (props) => {
          //     return <LogoTitle {...props} />;
          //   },
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16 }}
              onPress={() => navigation.navigate("Posts")}
            >
              <Image source={require("./assets/icons/back.png")} />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require("./assets/icons/addPost.png")}
              fadeDuration={0}
              style={[size, {}]}
            />
          ),
          tabBarStyle: { display: "none" },
        })}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require("./assets/icons/profile.png")}
              fadeDuration={0}
              style={size}
            />
          ),
          headerShown: false,
        }}
      />
    </MainTab.Navigator>
  );
};
