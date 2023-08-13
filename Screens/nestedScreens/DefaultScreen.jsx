import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";

import {
  collection,
  query,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
  orderBy,
} from "firebase/firestore";

import { db } from "../../firebase/config";

export const DefaultScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  const { login, userId, email, avatar } = useSelector((state) => state.auth);

  const getAllPosts = async () => {
    /**
     *      Варіант 1  (отримати всі документи колекції)
     */
    //   const { query } = await getDocs(collection(db, "posts"));
    //   onSnapshot(query, (querySnapshot) => {
    //     const updatingPosts = [];
    //     querySnapshot.forEach((doc) => {
    //       updatingPosts.push({ ...doc.data(), id: doc.id });
    //     });
    //     setPosts(updatingPosts);
    //   });

    /**
     *      Варіант 2  (пошук по умові)
     */
    const q = query(collection(db, "posts"), orderBy("createdDate", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatingPosts = [];
      querySnapshot.forEach((doc) => {
        updatingPosts.push({ ...doc.data(), id: doc.id });
      });
      setPosts(updatingPosts);
    });

    /**
     *      Варіант 3  (пошук по умові)
     */
    // const q = query(collection(db, "posts"), orderBy("createdDate", "desc"));
    // onSnapshot(q, (data) => {
    //   setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // });
  };

  const updateLikesCounter = async (collectionName, docId, initialAmount) => {
    try {
      const ref = doc(db, collectionName, docId);

      await updateDoc(ref, {
        likesCount: initialAmount + 1,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.userWrapper}>
        <Image
          source={
            avatar
              ? { uri: avatar }
              : require("../../assets/icons/userIcon.png")
          }
          style={styles.userPhoto}
        />
        <View
        //   style={styles.description}
        >
          <Text style={styles.userName}>{login ?? email.split("@")[0]}</Text>
          <Text style={styles.userEmail}>{email}</Text>
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
                onPress={() =>
                  navigation.navigate("Comments", {
                    postId: item.id,
                    authorPostId: item.userId,
                    photoUri: item.photo,
                  })
                }
                style={{
                  marginRight: 24,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../assets/icons/comments.png")}
                  style={{ width: 24, height: 24 }}
                />
                <Text style={styles.commentsCount}>
                  {" "}
                  {item.commentsCount || 0}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  updateLikesCounter("posts", item.id, item.likesCount || 0);
                }}
                style={{
                  marginRight: "auto",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../assets/icons/like.png")}
                  style={{ width: 24, height: 24 }}
                />
                <Text style={styles.commentsCount}>{item.likesCount || 0}</Text>
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
    resizeMode: "contain",
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
