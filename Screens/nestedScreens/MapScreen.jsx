import React, { useEffect } from "react";
import MapView, { Marker } from "react-native-maps";

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

export const MapScreen = ({ route }) => {
  // useEffect(() => {
  //   if (route.params) {
  //     console.log("route.params", route.params);
  //     // setPosts((prevState) => [...prevState, route.params]);
  //   }
  // }, [route.params]);

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: route.params.latitude,
          longitude: route.params.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        mapType="standard"
        minZoomLevel={15}
      >
        <Marker
          title="foto"
          coordinate={{
            latitude: route.params.latitude,
            longitude: route.params.longitude,
          }}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 32,
    // paddingHorizontal: 16,
    // paddingBottom: 34,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#fff",
  },
});
