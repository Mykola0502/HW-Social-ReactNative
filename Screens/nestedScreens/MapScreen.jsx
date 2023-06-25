import React from "react";
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

export const MapScreen = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: 50.613622,
          longitude: 26.25584,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}
        mapType="standard"
        minZoomLevel={15}
      >
        <Marker
          title="foto"
          coordinate={{ latitude: 50.613622, longitude: 26.25584 }}
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
