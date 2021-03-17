// This is an example code for React Native Floating Action Button//
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Animatable from "react-native-animatable";
import { StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../themes/colours";

// import all the components we are going to use.

const floatingIcon = props => {
  return (
    <TouchableOpacity
      key="addIcon"
      onPress={() => props.navigation.navigate("Create word")}
      style={styles.TouchableOpacityStyle}
    >
      <Animatable.View animation="pulse" iterationCount="infinite" direction="alternate">
        <Icon name="plus" size={50} color="white" />
      </Animatable.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  TouchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
    backgroundColor: colors.buttonBlue,
    borderRadius: 100
  }
});

export default floatingIcon;
