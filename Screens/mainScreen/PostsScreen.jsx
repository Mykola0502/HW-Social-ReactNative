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
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Публікації</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          //   onPress={() => setisHiddenPassword(!isHiddenPassword)}
          style={styles.logOutBtn}
        >
          <Image source={require("../../assets/icons/logOut.png")} />
        </TouchableOpacity>
      </View>
      <View style={{ ...styles.line, marginBottom: 32 }} />
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
      {/* <View style={{ ...styles.line, marginTop: "auto" }} />
      <View style={styles.controlButtons}>
        <TouchableOpacity
          activeOpacity={0.7}
          //   onPress={() => setisHiddenPassword(!isHiddenPassword)}
          //   style={styles.closeImgBtn}
        >
          <Image
            // style={styles.closeImg}
            source={require("../../assets/icons/posts.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          //   onPress={() => setisHiddenPassword(!isHiddenPassword)}
          //   style={styles.closeImgBtn}
        >
          <Image
            style={{ marginHorizontal: 31 }}
            source={require("../../assets/icons/addPost.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          //   onPress={() => setisHiddenPassword(!isHiddenPassword)}
          //   style={styles.closeImgBtn}
        >
          <Image
            // style={styles.closeImg}
            source={require("../../assets/icons/profile.png")}
          />
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 44,
    paddingHorizontal: 16,
    paddingBottom: 34,
    backgroundColor: "#fff",
  },
  titleWrapper: {
    position: "relative",
  },
  title: {
    paddingVertical: 11,
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    lineHeight: 22,
    textAlign: "center",
  },
  logOutBtn: {
    position: "absolute",
    top: 0,
    right: 0,
    justifyContent: "center",
    height: "100%",
  },
  line: {
    marginLeft: -16,
    marginRight: -16,
    height: 0.5,
    backgroundColor: "#0000004c",
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
  controlButtons: {
    paddingTop: 9,
    flexDirection: "row",
    justifyContent: "center",
  },
});
