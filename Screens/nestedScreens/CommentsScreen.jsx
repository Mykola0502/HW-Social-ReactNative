import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
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
  SafeAreaView,
  FlatList,
} from "react-native";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import { format } from "date-fns";
import { uk } from "date-fns/locale";

import { db } from "../../firebase/config";

export const CommentsScreen = ({ route }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  // const [isDisabled, setIsDisabled] = useState(false);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  // const [commentsCount, setCommentsCount] = useState(0);

  const { postId, authorPostId, photoUri } = route.params;
  // console.log("route.params", route.params);

  const { login, userId, email } = useSelector((state) => state.auth);

  let commentsCount = allComments.length;

  const updatePostCommentsCounter = async (collectionName, docId) => {
    console.log("count", commentsCount);
    try {
      const ref = doc(db, collectionName, docId);

      await updateDoc(ref, {
        commentsCount: commentsCount,
      });
      console.log("counter updated");
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async () => {
    const nickName = login ?? email.split("@")[0];

    try {
      /**
       *      Варіант 1
       */
      await addDoc(collection(db, "posts", postId, "comments"), {
        comment,
        login: nickName,
        authorCommentId: userId,
        createdDate: Date.now(),
      });

      /**
       *      Варіант 2
       */
      // await addDoc(collection(doc(db, "posts", postId), "comments"), {
      //   comment,
      //   login,
      //   authorCommentId: userId,
      //   createdDate: Date.now(),
      // });

      /**
       *      Варіант 3
       *    без створення підколекції (перезаписує попередній коментар)
       */
      // const ref = doc(db, "posts", postId);
      // console.log("ref", ref);
      // await updateDoc(ref, {
      //   comment,
      //   login,
      // });

      // console.log("document updated");
      setComment("");
      keyboardHide();

      commentsCount += 1;

      await updatePostCommentsCounter("posts", postId);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllComments = async () => {
    try {
      /**
       *      Варіант 1  (отримати всі документи колекції)
       */
      // const { query } = await getDocs(
      //   collection(db, "posts", postId, "comments")
      // );
      // console.log("query", query);
      // onSnapshot(query, (querySnapshot) => {
      //   console.log("1");
      //   const getComments = [];
      //   querySnapshot.forEach((doc) => {
      //     console.log("doc", doc);
      //     // console.log("doc.id", doc.id);
      //     getComments.push({ ...doc.data(), id: doc.id });
      //   });
      //   console.log("getComments", getComments);
      //   setAllComments(getComments);
      // });

      /**
       *      Варіант 2  (пошук по умові)
       */
      const q = query(
        collection(db, "posts", postId, "comments"),
        orderBy(
          "createdDate"
          // , "desc"
        )
      );
      // console.log("q", q);
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const getComments = [];
        querySnapshot.forEach((doc) => {
          // console.log("doc", doc);
          // console.log("doc.id", doc.id);

          getComments.push({ ...doc.data(), id: doc.id });
        });

        console.log("getComments", getComments);
        setAllComments(getComments);
      });
    } catch (error) {
      console.log("Помилка при отриманні коментарів:", error);
    }
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  // useEffect(() => {
  //   isState ? setIsDisabled(false) : setIsDisabled(true);
  // }, [isState]);

  useEffect(() => {
    console.log("useEffect CommentsScreen");
    getAllComments();
  }, []);

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

  return (
    // <View style={styles.container}>
    //   <Text>CommentsScreen</Text>
    // </View>

    <TouchableWithoutFeedback onPress={keyboardHide}>
      {/* <View style={styles.container}> */}
      <KeyboardAvoidingView
        // style={{ flex: 1, justifyContent: "flex-end" }}
        // style={{ flex: 1 }}
        style={{ ...styles.container, marginTop: isShowKeyboard ? -200 : 0 }}
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        behavior={Platform.OS === "ios" && "padding"}
      >
        <Image source={{ uri: photoUri }} style={styles.image} />

        <SafeAreaView
          style={{
            flex: 1,
            // marginTop: StatusBar.currentHeight || 0
          }}
          // style={styles.container}
        >
          <FlatList
            style={styles.comments}
            data={allComments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              // console.log(
              //   "authorPostId === item.authorCommentId",
              //   authorPostId === item.authorCommentId
              // );
              return (
                <View
                  style={{
                    ...styles.commentContainer,
                    flexDirection:
                      userId === item.authorCommentId ? "row-reverse" : "row",
                  }}
                >
                  <Image
                    style={{
                      ...styles.avatar,
                      marginLeft: userId === item.authorCommentId ? 16 : 0,
                      marginRight: userId === item.authorCommentId ? 0 : 16,
                    }}
                    source={{}}
                  />
                  <View style={styles.commentTextContainer}>
                    <Text style={styles.commentText}>{item.comment}</Text>
                    <Text style={styles.metaInfo}>
                      {format(item.createdDate, "dd MMMM, yyyy | HH:mm", {
                        locale: uk,
                      })}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </SafeAreaView>

        {/* <View style={styles.comments}> */}
        {/* <View style={styles.commentContainer}>
            <Image style={styles.avatar} source={{}} />
            <View style={styles.commentTextContainer}>
              <Text style={styles.commentText}>
                Really love your most recent photo. I've been trying to capture
                the same thing for a few months and would love some tips!
              </Text>
              <Text style={styles.metaInfo}>09 червня, 2020 | 08:40</Text>
            </View>
          </View> */}
        {/* <View style={styles.commentContainer}>
            <Image style={styles.avatar} source={{}} />
            <View style={styles.commentTextContainer}>
              <Text style={styles.commentText}>
                A fast 50mm like f1.8 would help with the bokeh. I’ve been using
                primes as they tend to get a bit sharper images.
              </Text>
              <Text style={styles.metaInfo}>09 червня, 2020 | 09:14</Text>
            </View>
          </View> */}
        {/* </View> */}

        <View style={styles.inputCommentWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Коментувати..."
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
            value={comment}
            onChangeText={setComment}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={addComment}
            style={styles.commentBtn}
          >
            <Image
              source={require("../../assets/icons/sendComment.png")}
              style={{ width: 34, height: 34 }}
            />
            {/* <Text style={styles.commentBtnText}>
              //
            </Text> */}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      {/* </View> */}
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    paddingTop: 32,
    // paddingBottom: 16,
    paddingHorizontal: 16,
    // justifyContent: "flex-end",
    // paddingBottom: 34,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    height: 240,
    backgroundColor: "#e7e7e7",
    width: "100%",
    resizeMode: "cover",
    borderRadius: 8,
  },
  comments: {
    marginTop: 32,
    marginBottom: 97,
    height: "100%",
  },
  commentContainer: {
    width: "100%",
    flexDirection: "row",
    marginBottom: 24,
    // alignItems: "flex-start",
  },
  avatar: {
    // marginRight: 16,
    width: 28,
    height: 28,
    borderRadius: 28,
    backgroundColor: "#e7e7e7",
  },
  commentTextContainer: {
    flexShrink: 1,
    padding: 16,
    // width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 6,
  },
  commentText: {
    marginBottom: 8,
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
  },
  metaInfo: {
    textAlign: "right",
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 10,
  },
  inputCommentWrapper: {
    position: "absolute",
    bottom: 16,
    right: 16,
    left: 16,
    // flexDirection: "row",
    // width: "100%",
    // justifyContent: "flex-end",
  },
  input: {
    padding: 16,
    paddingBottom: 15,
    paddingRight: 50,
    backgroundColor: "#F6F6F6",
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 50,
  },
  commentBtn: {
    position: "absolute",
    top: 0,
    right: 8,
    justifyContent: "center",
    height: "100%",
  },
});
