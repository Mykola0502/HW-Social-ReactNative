import React, { useEffect } from "react";
import MapView, { Marker } from "react-native-maps";

import {
  StyleSheet,
  View,
} from "react-native";

export const MapScreen = ({ route }) => {

  const { latitude, longitude } = route.params.location;

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        mapType="standard"
        minZoomLevel={15}
      >
        <Marker
          title="foto"
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
