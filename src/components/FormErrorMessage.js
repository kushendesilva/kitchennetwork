import React from "react";
import { StyleSheet } from "react-native";
import { Caption } from "react-native-paper";
import { Colors } from "../config";

export const FormErrorMessage = ({ error, visible }) => {
  if (!error || !visible) {
    return null;
  }

  return <Caption style={styles.errorText}>{error}</Caption>;
};

const styles = StyleSheet.create({
  errorText: {
    marginLeft: 15,
    color: Colors.primary,
  },
});
