import React from "react";
import { StyleSheet, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Surface } from "react-native-paper";
import { Colors } from "../config";

export const View = ({ isSafe, style, children }) => {
  const insets = useSafeAreaInsets();

  if (isSafe) {
    return (
      <Surface style={{ paddingTop: insets.top, ...style }}>
        <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
        {children}
      </Surface>
    );
  }

  return <Surface style={StyleSheet.flatten(style)}>{children}</Surface>;
};
