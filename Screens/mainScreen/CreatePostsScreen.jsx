import React, { useState, useEffect } from "react";
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

const initialState = {
  name: "",
  location: "",
};

const toggleCameraType = () => {
  console.log("snap");
};

export const CreatePostsScreen = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const isState = state.name !== "" && state.location !== "";

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const onSubmit = () => {
    keyboardHide();
    console.log(state);
    setState(initialState);
  };

  const keyboardDidHide = () => {
    keyboardHide();
    console.log("Клавіатура схована");
  };

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
  };

  useEffect(() => {
    isState ? setIsDisabled(false) : setIsDisabled(true);
  }, [isState]);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      keyboardDidHide
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

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
                style={styles.userPhoto}
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
          <View style={styles.inputLocationWrapper}>
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
              value={state.location}
              onChangeText={(value) =>
                setState((prevState) => ({
                  ...prevState,
                  location: value,
                }))
              }
            />
            <View style={styles.locationIconWrapper}>
              <Image source={require("../../assets/icons/mapPin.png")} />
            </View>
          </View>
          <TouchableOpacity
            disabled={isDisabled}
            activeOpacity={0.8}
            onPress={onSubmit}
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
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {}}
          style={{
            ...styles.trashBtn,
            marginTop: isShowKeyboard ? 32 : "auto",
          }}
        >
          <Image source={require("../../assets/icons/trash.png")} />
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
  inputLocationWrapper: {
    position: "relative",
  },
  locationIconWrapper: {
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
