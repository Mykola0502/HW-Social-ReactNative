import React from "react";

import { StyleSheet, Text } from "react-native";

export const LogoTitle = (props) => {
  return <Text style={styles.title}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    //   paddingVertical: 11,
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    lineHeight: 22,
    //   textAlign: "center",
  },
});
