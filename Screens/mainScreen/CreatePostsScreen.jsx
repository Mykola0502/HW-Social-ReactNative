import React, { useState } from "react";
import { Camera, CameraType } from "expo-camera";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  Button,
  Image,
} from "react-native";

const toggleCameraType = () => {
  console.log("snap");
};

export const CreatePostsScreen = () => {
  return (
    <View style={styles.container}>
      <Camera style={styles.camera}>
        <TouchableOpacity style={styles.buttonSnap} onPress={toggleCameraType}>
          <Text style={styles.textSnap}>SNAP</Text>
        </TouchableOpacity>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    // paddingBottom: 34,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#fff",
  },
  camera: {
    height: 240,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#F6F6F6",
  },
  buttonSnap: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#bf7f7f",
  },
  textSnap: {
    color: "#fff",
  },
});
