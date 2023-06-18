import React from "react";

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

export const PostsScreen = () => {
  console.log(Platform.OS);

  return (
    <View style={styles.container}>
      <View style={styles.postWrapper}>
        <Image
          source={require("../../assets/images/userPhoto.png")}
          style={styles.userPhoto}
        />
        <View
        //   style={styles.description}
        >
          <Text style={styles.userName}>Natali Romanova</Text>
          <Text style={styles.userEmail}>email@example.com</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    // paddingBottom: 34,
    backgroundColor: "#fff",
  },
  postWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  userPhoto: {
    marginRight: 8,
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  userName: {
    color: "#212121",
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15,
  },
  userEmail: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 13,
  },
});
