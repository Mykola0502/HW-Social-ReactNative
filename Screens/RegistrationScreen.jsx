import React, { useState, useEffect } from "react";
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
} from "react-native";

// import bgImage from "../assets/images/bgImage.png";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export const RegistrationScreen = () => {
  console.log(Platform.OS);
  // console.log(Keyboard.isVisible());

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  // const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isHiddenPassword, setisHiddenPassword] = useState(true);
  const [state, setState] = useState(initialState);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const onSubmit = () => {
    keyboardHide();
    console.log(state);
    setState(initialState);
  };

  // // Обробник події показу клавіатури
  // const keyboardDidShow = (event) => {
  //   const keyboardHeightNew = event.endCoordinates.height;
  //   setKeyboardHeight(keyboardHeightNew);
  // };

  const keyboardDidHide = () => {
    keyboardHide();
    // setKeyboardHeight(0);
    console.log("Клавіатура схована");
  };

  useEffect(() => {
    // const keyboardDidShowListener = Keyboard.addListener(
    //   "keyboardDidShow",
    //   keyboardDidShow
    // );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      keyboardDidHide
    );

    return () => {
      // keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    // <View style={styles.container}>
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View
          style={{
            ...styles.form,
            // marginBottom: isShowKeyboard ? 116 - keyboardHeight : 0,
            marginBottom: isShowKeyboard ? -142 : 0,
          }}
        >
          <Text style={styles.formTitle}>Реєстрація</Text>
          <TextInput
            style={[styles.input, { marginBottom: 16 }]}
            placeholder="Логін"
            placeholderTextColor="#BDBDBD"
            onFocus={() => setIsShowKeyboard(true)}
            value={state.login}
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, login: value }))
            }
            // onSubmitEditing={keyboardHide}
          />
          <TextInput
            style={[styles.input, { marginBottom: 16 }]}
            placeholder="Адреса електронної пошти"
            placeholderTextColor="#BDBDBD"
            onFocus={() => setIsShowKeyboard(true)}
            value={state.email}
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, email: value }))
            }
            // onSubmitEditing={keyboardHide}
          />
          <View style={styles.inputPasswordWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Пароль"
              placeholderTextColor="#BDBDBD"
              secureTextEntry={isHiddenPassword ? true : false}
              onFocus={() => setIsShowKeyboard(true)}
              value={state.password}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, password: value }))
              }
              // onSubmitEditing={keyboardHide}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setisHiddenPassword(!isHiddenPassword)}
              style={styles.passwordBtn}
            >
              <Text style={styles.passwordBtnText}>
                {isHiddenPassword ? "Показати" : "Приховати"}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onSubmit}
            style={styles.registerBtn}
          >
            <Text style={styles.textRegisterBtn}>Зареєстуватися</Text>
          </TouchableOpacity>
          <View style={styles.containerInfo}>
            <Text style={styles.textInfo}>Вже є акаунт? </Text>
            <Text style={[styles.textInfo, styles.linkLogin]}>Увійти</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "flex-end",
  },
  // image: {
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   width: "100%",
  // },
  form: {
    paddingTop: 92,
    paddingHorizontal: 16,
    paddingBottom: 45,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    // justifyContent: "flex-end",
  },
  formTitle: {
    marginBottom: 32,
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    // fontWeight: 500,
    textAlign: "center",
  },
  input: {
    padding: 16,
    paddingBottom: 15,
    backgroundColor: "#F6F6F6",
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    // fontWeight: 400,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
  },
  inputPasswordWrapper: {
    position: "relative",
    // flexDirection: "row",
    // width: "100%",
    // justifyContent: "flex-end",
  },
  passwordBtn: {
    position: "absolute",
    top: 0,
    right: 16,
    justifyContent: "center",
    height: "100%",
  },
  passwordBtnText: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    // fontWeight: 400,
  },
  registerBtn: {
    marginTop: 43,
    marginBottom: 16,
    borderRadius: 100,
    ...Platform.select({
      ios: {
        borderWidth: 1,
        backgroundColor: "transparent",
        borderColor: "#212121",
      },
      android: {
        backgroundColor: "#FF6C00",
      },
    }),
  },
  textRegisterBtn: {
    paddingVertical: 16,
    color: Platform.OS === "ios" ? "#0000ff" : "white",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    // fontWeight: 400,
    textAlign: "center",
    // backgroundColor: "#000000c0",
  },
  containerInfo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
  },
  textInfo: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    // fontWeight: 400,
    textAlign: "center",
  },
  linkLogin: {
    color: "#0000ff",
    textDecorationLine: "underline",
  },
});
