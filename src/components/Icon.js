import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const Icon = ({
  name,
  size = 24,
  color,
  style,
  IconFamily = MaterialCommunityIcons,
}) => {
  return <IconFamily name={name} size={size} color={color} style={style} />;
};
