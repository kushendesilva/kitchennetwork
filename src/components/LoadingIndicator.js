import React from "react";
import { StyleSheet } from "react-native";
import { View } from "./View";
import { ActivityIndicator } from "react-native-paper";
import { Colors } from "../config";

export const LoadingIndicator = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating={true} color={Colors.primary} size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
