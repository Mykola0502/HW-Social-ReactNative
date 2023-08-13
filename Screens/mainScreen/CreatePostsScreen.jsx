import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Camera, CameraType } from "expo-camera";
import * as Location from "expo-location";

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

import { collection, addDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { db, storage } from "../../firebase/config";

const initialState = {
  name: "",
  place: "",
};

// const toggleCameraType = () => {
//   console.log("snap");
// };

export const CreatePostsScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");
  const [location, setLocation] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  // const [commentsCount, setCommentsCount] = useState(null);

  const { userId, login } = useSelector((state) => state.auth);

  const isState = state.name !== "" && state.place !== "";

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  // const keyboardDidHide = () => {
  //   keyboardHide();
  // };

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);
    setPhoto(photo.uri);
  };

  const publishPost = () => {
    keyboardHide();
    const newPost = { ...state, photo, location };
    uploadPostToServer();
    navigation.navigate("DefaultScreen");
    setState(initialState);
  };

  const uploadPostToServer = async () => {
    const photoUrl = await uploadPhotoToServer();
    try {
      const postRef = await addDoc(collection(db, "posts"), {
        photo: photoUrl,
        name: state.name,
        place: state.place,
        commentsCount: 0,
        likesCount: 0,
        location,
        userId,
        login,
        createdDate: Date.now(),
      });
      console.log("Document written with ID: ", postRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
      console.log("publishError", error);
    }
  };

  const uploadPhotoToServer = async () => {
    const uniquePostId = Date.now().toString();

    try {
      const response = await fetch(photo);
      const file = await response.blob();

      const storageRef = ref(storage, `postImage/${uniquePostId}`);
      const data = await uploadBytes(storageRef, file);

      const processedPhoto = await getDownloadURL(storageRef);

      return processedPhoto;
    } catch (error) {
      console.error("Error:", error);
      console.log("uploadError.message", error.message);
    }
  };

  const deleteData = () => {
    setState(initialState);
    setPhoto("");
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();

      // await MediaLibrary.requestPermissionsAsync();

      // setHasCameraPermission(status === "granted");
      if (status !== "granted") {
        console.log("Permission to access Camera was denied");
        return;
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      // let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  useEffect(() => {
    isState ? setIsDisabled(false) : setIsDisabled(true);
  }, [isState]);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      // keyboardDidHide
      keyboardHide
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  // if (hasCameraPermission === null) {
  //   return <View />;
  // }
  // if (hasCameraPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      {/* <View style={styles.container}> */}
      <KeyboardAvoidingView
        // style={{ flex: 1, justifyContent: "flex-end" }}
        // style={{ flex: 1 }}
        style={styles.container}
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        behavior={Platform.OS === "ios" && "padding"}
      >
        <View style={styles.cameraContainer}>
          <Camera style={styles.camera} ref={setCamera}>
            {photo && (
              <View style={styles.takePhotoContainer}>
                <Image
                  source={{ uri: photo }}
                  style={{ width: 150, height: 150 }}
                />
              </View>
            )}
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.buttonSnap}
              onPress={takePhoto}
            >
              <Image
                source={require("../../assets/icons/camera.png")}
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>
          </Camera>
        </View>
        <Text style={styles.textCamera}>Завантажте фото</Text>
        <View
        // style={styles.form}
        // style={{ marginBottom: isShowKeyboard ? -70 : 0 }}
        >
          <TextInput
            style={{
              ...styles.input,
              marginBottom: 16,
              fontFamily: "Roboto-Medium",
            }}
            placeholder="Назва..."
            placeholderTextColor="#BDBDBD"
            onFocus={(event) => {
              setIsShowKeyboard(true);
              event.target.setNativeProps({
                style: {
                  ...styles.input,
                  // backgroundColor: "#FFFFFF",
                  borderColor: "#FF6C00",
                },
              });
            }}
            onBlur={(event) =>
              event.target.setNativeProps({
                style: {
                  ...styles.input,
                },
              })
            }
            value={state.name}
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, name: value }))
            }
          />
          <View style={styles.inputPlaceWrapper}>
            <TextInput
              style={{
                ...styles.input,
                paddingLeft: 28,
                fontFamily: "Roboto-Regular",
              }}
              placeholder="Місцевість..."
              placeholderTextColor="#BDBDBD"
              onFocus={(event) => {
                setIsShowKeyboard(true);
                event.target.setNativeProps({
                  style: {
                    ...styles.input,
                    // backgroundColor: "#FFFFFF",
                    borderColor: "#FF6C00",
                  },
                });
              }}
              onBlur={(event) =>
                event.target.setNativeProps({
                  style: {
                    ...styles.input,
                  },
                })
              }
              value={state.place}
              onChangeText={(value) =>
                setState((prevState) => ({
                  ...prevState,
                  place: value,
                }))
              }
            />
            <View style={styles.placeIconWrapper}>
              <Image
                source={require("../../assets/icons/mapPin.png")}
                style={{ width: 24, height: 24 }}
              />
            </View>
          </View>
          <TouchableOpacity
            disabled={isDisabled}
            activeOpacity={0.8}
            onPress={publishPost}
            style={{
              ...styles.publishBtn,
              backgroundColor: isDisabled ? "#F6F6F6" : "#FF6C00",
            }}
          >
            <Text
              style={{
                ...styles.textPublishBtn,
                color: isDisabled ? "#BDBDBD" : "#ffffff",
              }}
            >
              Опублікувати
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            activeOpacity={0.8}
            onPress={getPostFromFirestore}
            style={{
              marginTop: 10,
              backgroundColor: "#b0e798",
            }}
          >
            <Text
              style={{
                paddingVertical: 10,
                color: "#d47575",
              }}
            >
              Get Post
            </Text>
          </TouchableOpacity> */}
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={deleteData}
          style={{
            ...styles.trashBtn,
            marginTop: isShowKeyboard ? 32 : "auto",
          }}
        >
          <Image
            source={require("../../assets/icons/trash.png")}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
      {/* </View> */}
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    justifyContent: "flex-end",
    // paddingBottom: 34,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#fff",
  },
  cameraContainer: {
    height: 240,
    // backgroundColor: "red",
    borderRadius: 8,
    overflow: "hidden",
  },
  camera: {
    flex: 1,
    // marginHorizontal: 16,
    // height: 240,
    alignItems: "center",
    justifyContent: "center",
    // borderRadius: 8,
    backgroundColor: "#ffffff",
  },
  takePhotoContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    borderRadius: 8,
    borderColor: "#f20707",
    borderWidth: 1,
    overflow: "hidden",
  },
  buttonSnap: {
    width: 50,
    height: 50,
    // borderWidth: 1,
    // borderColor: "#fff",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  textCamera: {
    marginTop: 8,
    marginBottom: 32,
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
  input: {
    paddingTop: 16,
    paddingBottom: 15,
    // backgroundColor: "#F6F6F6",
    color: "#212121",
    // fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    // borderRadius: 8,
  },
  inputPlaceWrapper: {
    position: "relative",
  },
  placeIconWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  publishBtn: {
    marginTop: 32,
    paddingVertical: 16,
    borderRadius: 100,
    // backgroundColor: "#F6F6F6",
  },
  textPublishBtn: {
    // color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
  },
  trashBtn: {
    // marginTop: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    width: 70,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
  },
});
