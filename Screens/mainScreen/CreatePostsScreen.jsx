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
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        {photo && (
          <View style={styles.takePhotoContainer}>
            <Image
              source={{ uri: photo }}
              style={{ width: 150, height: 150 }}
            />
          </View>
        )}
        <TouchableOpacity style={styles.buttonSnap} onPress={takePhoto}>
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
    // flex: 1,
    height: "35%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#F6F6F6",
  },
  takePhotoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    borderColor: "#f20707",
    borderWidth: 1,
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
