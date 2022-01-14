import React from "react";
import { TextInput as PaperTextInput } from "react-native-paper";

import { Colors } from "../config";

export const TextInput = ({
  width = "100%",
  left,
  right,
  handlePasswordVisibility,
  ...otherProps
}) => {
  return (
    <PaperTextInput
      mode="outlined"
      style={{ margin: "2%" }}
      left={
        left ? (
          <PaperTextInput.Icon
            name={left}
            size={24}
            color={Colors.mediumGray}
          />
        ) : null
      }
      right={
        right ? (
          <PaperTextInput.Icon
            icon={right}
            color={Colors.mediumGray}
            size={24}
            onPress={handlePasswordVisibility}
          />
        ) : null
      }
      {...otherProps}
    />
  );
};
