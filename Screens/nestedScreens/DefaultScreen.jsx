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
  Image,
  FlatList,
} from "react-native";

import { collection, query, getDocs, onSnapshot } from "firebase/firestore";

import { db } from "../../firebase/config";

export const DefaultScreen = ({ route, navigation }) => {
  console.log(Platform.OS);

  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    const q = query(collection(db, "posts"));
    // console.log("q", q);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatingPosts = [];
      querySnapshot.forEach((doc) => {
        // console.log("doc", doc);
        updatingPosts.push({ ...doc.data(), id: doc.id });
      });
      setPosts(updatingPosts);
    });

    // const q = query(collection(db, "posts"));
    // onSnapshot(q, (data) => {
    //   // console.log("data", data.docs);
    //   setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // });
  };

  useEffect(() => {
    console.log("useEffect Default");
    getAllPosts();
  }, []);

  console.log("posts", posts);

  return (
    <View style={styles.container}>
      <View style={styles.userWrapper}>
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
      <FlatList
        data={posts}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={{ marginTop: 32 }}>
            <Image source={{ uri: item.photo }} style={styles.postPhoto} />
            <Text style={styles.postName}>{item.name}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Comments")}
                style={{
                  marginRight: "auto",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../assets/icons/comments.png")}
                  style={{ width: 24, height: 24 }}
                />
                <Text style={styles.commentsCount}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Map", { location: item.location })
                }
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Image
                  source={require("../../assets/icons/mapPin.png")}
                  style={{ width: 24, height: 24 }}
                />
                <Text style={styles.place}>{item.place}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
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
  userWrapper: {
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
  postPhoto: {
    height: 240,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "#212121",
  },
  postName: {
    marginVertical: 8,
    color: "#212121",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Medium",
  },
  commentsCount: {
    marginLeft: 6,
    color: "#BDBDBD",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
  place: {
    marginLeft: 4,
    color: "#212121",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
    textDecorationLine: "underline",
  },
});
