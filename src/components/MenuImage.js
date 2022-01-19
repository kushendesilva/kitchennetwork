import React from "react";
import PropTypes from "prop-types";
import { IconButton } from "react-native-paper";
import { Colors } from "../config";

export default function MenuImage(props) {
  return (
    <IconButton
      icon="menu"
      color={Colors.primary}
      size={30}
      onPress={props.onPress}
    />
  );
}

MenuImage.propTypes = {
  onPress: PropTypes.func,
};
