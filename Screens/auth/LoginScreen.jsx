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
  Image,
} from "react-native";

import { useDispatch } from "react-redux";

import { authSignInUser } from "../../redux/auth/authOperations";

import bgImage from "../../assets/images/bgImage.png";

const initialState = {
  email: "",
  password: "",
};

export const LoginScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isHiddenPassword, setisHiddenPassword] = useState(true);
  const [state, setState] = useState(initialState);

  const dispatch = useDispatch();

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    keyboardHide();
    dispatch(authSignInUser(state));
    setState(initialState);
  };

  const keyboardDidHide = () => {
    keyboardHide();
  };

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
      <View style={styles.container}>
        <ImageBackground source={bgImage} style={styles.image}>
          <KeyboardAvoidingView
            style={{ flex: 1, justifyContent: "flex-end" }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.formWrapper,
                marginBottom: isShowKeyboard ? -241 : 0,
              }}
            >
              <View style={styles.titleWrapper}>
                <Text style={styles.formTitle}>Увійти</Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  // onPress={() => {}}
                  style={styles.closeImgBtn}
                >
                  <Image
                    // style={styles.closeImg}
                    source={require("../../assets/icons/closeForm.png")}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <TextInput
                  style={[styles.input, { marginBottom: 16 }]}
                  placeholder="Адреса електронної пошти"
                  placeholderTextColor="#BDBDBD"
                  onFocus={(event) => {
                    setIsShowKeyboard(true);
                    event.target.setNativeProps({
                      style: {
                        ...styles.input,
                        backgroundColor: "#FFFFFF",
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
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
                <View style={styles.inputPasswordWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Пароль"
                    placeholderTextColor="#BDBDBD"
                    secureTextEntry={isHiddenPassword ? true : false}
                    onFocus={(event) => {
                      setIsShowKeyboard(true);
                      event.target.setNativeProps({
                        style: {
                          ...styles.input,
                          backgroundColor: "#FFFFFF",
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
                    value={state.password}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
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
                  onPress={handleSubmit}
                  style={styles.loginBtn}
                >
                  <Text style={styles.textLoginBtn}>Увійти</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.containerInfo}>
                <Text style={styles.textInfo}>
                  Немає акаунту?{" "}
                  <Text
                    style={styles.linkLogin}
                    onPress={() => navigation.navigate("Register")}
                  >
                    Зареєструватися
                  </Text>
                </Text>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "flex-end",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    // alignItems: "center",
    // width: "100%",
  },
  formWrapper: {
    paddingTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 144,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    // justifyContent: "flex-end",
  },
  titleWrapper: {
    position: "relative",
    marginBottom: 32,
  },
  closeImgBtn: {
    position: "absolute",
    top: 0,
    left: 0,
    justifyContent: "center",
    height: "100%",
  },
  //   closeImg: {
  //     width: 16,
  //     height: 16,
  //   },
  formTitle: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
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
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
  },
  inputPasswordWrapper: {
    position: "relative",
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
  },
  loginBtn: {
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
  textLoginBtn: {
    paddingVertical: 16,
    color: Platform.OS === "ios" ? "#0000ff" : "white",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
  },
  containerInfo: {
    justifyContent: "center",
    alignItems: "center",
  },
  textInfo: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  linkLogin: {
    color: "#0000ff",
    textDecorationLine: "underline",
  },
});
