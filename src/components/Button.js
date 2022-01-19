import React from "react";
import { Button as PaperButton } from "react-native-paper";

export const Button = ({
  onPress,
  text = false,
  icon,
  title,
  style,
  disabled = false,
}) => {
  if (text) {
    return (
      <PaperButton
        icon={icon}
        onPress={onPress}
        style={[style, { marginVertical: "0.5%", marginHorizontal: "2%" }]}
      >
        {title}
      </PaperButton>
    );
  }

  return (
    <PaperButton
      disabled={disabled}
      icon={icon}
      mode="contained"
      onPress={onPress}
      style={[style, { padding: "2%", margin: "2%" }]}
    >
      {title}
    </PaperButton>
  );
};
