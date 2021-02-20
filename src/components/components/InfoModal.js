import React from "react";
import { Button, View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Icon from "react-native-vector-icons/SimpleLineIcons";
import OctIcon from "react-native-vector-icons/Octicons";
import Modal from "react-native-modal";
import colors from "../../themes/colours";

const renderModal = (isVisible, switchVisible) => {
  return (
    <Modal
      isVisible={isVisible}
      coverScreen
      onBackButtonPress={() => {
        switchVisible(!isVisible);
      }}
      onBackdropPress={() => {
        switchVisible(!isVisible);
      }}
    >
      <View style={{ flex: 1 }}>
        <Text />
      </View>
    </Modal>
  );
};

const infoModal = props => {
  const { show, switchVisible, theme } = props;
  const text = `Hit Play, and you will be shown a word randomly chosen between the next 20 that haven't been completed.

Guess the word correctly 5 times in a row and it will be marked as complete, and new words will appear.

Completed words will still appear less often, so that you can focus on new words while also remembering old ones.

Also, the words you add will be placed at the top of the list so that they have priority.`;
  return (
    <Modal
      isVisible={show}
      coverScreen
      onBackButtonPress={() => {
        switchVisible(!show);
      }}
      onBackdropPress={() => {
        switchVisible(!show);
      }}
    >
      <View
        style={{
          backgroundColor: theme.isDark
            ? theme.colors.background
            : theme.colors.background,
          paddingTop: 20,
          paddingHorizontal: 20,
          width: "87%",
          alignSelf: "center",
          height: "66%",
          borderRadius: 10
        }}
      >
        <ScrollView style={{ flex: 1 }}>
          <Text
            style={{ color: theme.colors.text, textAlign: "center", fontWeight: "bold" }}
          >
            Play
          </Text>
          <Text style={{ color: theme.colors.text, textAlign: "center" }}>{text}</Text>
          <View style={{ alignItems: "center", marginVertical: 20 }}>
            <View style={{ height: 2, width: "80%", backgroundColor: colors.gray }} />
          </View>
          <Text
            style={{ color: theme.colors.text, textAlign: "center", fontWeight: "bold" }}
          >
            Audio
          </Text>
          <Text style={{ color: theme.colors.text, textAlign: "center" }}>
            Click to play the audio at regular speed.
          </Text>
          <Text style={{ color: theme.colors.text, textAlign: "center" }}>
            Double click or long press for x0.5 speed.
          </Text>
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            switchVisible(!show);
          }}
          style={{ alignSelf: "center", padding: 7 }}
        >
          <Icon name="close" size={23} color={colors.red} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default infoModal;
