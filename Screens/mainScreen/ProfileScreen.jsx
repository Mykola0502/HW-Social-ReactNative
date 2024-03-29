import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import bgImage from "../../assets/images/bgImage.png";

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";

import {
  collection,
  query,
  onSnapshot,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/config";

import { authSignOutUser } from "../../redux/auth/authOperations";

export const ProfileScreen = ({ route, navigation }) => {
  const [userPosts, setUserPosts] = useState([]);

  const dispatch = useDispatch();
  const { userId, login, avatar } = useSelector((state) => state.auth);

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  const getUserPosts = async () => {
    const q = query(
      collection(db, "posts"),
      orderBy("createdDate", "desc"),
      where("userId", "==", userId)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allUserPosts = [];
      querySnapshot.forEach((doc) => {
        allUserPosts.push({ ...doc.data(), id: doc.id });
      });
      setUserPosts(allUserPosts);
    });

    /**
     *      Варіант 2 (пошук по умові)
     */
    // const q = query(collection(db, "posts"), orderBy("createdDate", "desc"));
    // onSnapshot(q, (data) => {
    //   setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // });
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground source={bgImage} style={styles.bgImage}>
        <View style={styles.postsContent}>
          <TouchableOpacity style={styles.btnLogOut} onPress={signOut}>
            <Image source={require("../../assets/icons/logOut.png")} />
          </TouchableOpacity>
          <Image
            source={
              avatar
                ? { uri: avatar }
                : require("../../assets/icons/userIcon.png")
            }
            style={styles.userPhoto}
          />
          <Text style={styles.userName}>{login}</Text>
          <FlatList
            style={styles.postsList}
            data={userPosts}
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
                      source={require("../../assets/icons/commentsProfile.png")}
                      style={{ width: 24, height: 24 }}
                    />
                    <Text style={styles.commentsCount}>
                      {item.commentsCount || 0}
                    </Text>
                  </TouchableOpacity>
                  <View
                    // onPress={() => {}}
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
                    <Text style={styles.commentsCount}>
                      {item.likesCount || 0}
                    </Text>
                  </View>
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
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  postsContent: {
    position: "relative",
    marginTop: 147,
    paddingHorizontal: 16,
    paddingBottom: 43,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  btnLogOut: {
    position: "absolute",
    top: 22,
    right: 16,
  },
  userPhoto: {
    marginTop: -60,
    marginBottom: 32,
    resizeMode: "contain",
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  userName: {
    marginBottom: 1,
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
  },
  postsList: {
    width: "100%",
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
    color: "#212121",
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
