import React, { useState } from "react";
import { Switch, View, Text, TouchableOpacity } from "react-native";

import Icon from "react-native-vector-icons/SimpleLineIcons";
import Modal from "react-native-modal";
import colors from "../../themes/colours";
import { getUserInfo, changeWebViewPreference } from "../../db/services/userServices";

const SettingsModal = props => {
  const { show, switchVisible, theme } = props;

  if (!show) return null;

  const userInfo = getUserInfo();
  const [settingsChanged, setSettingsChanged] = useState(false);

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
          backgroundColor: theme.colors.background,
          paddingTop: 20,
          paddingHorizontal: 20,
          width: "90%",
          alignSelf: "center",
          height: "66%",
          borderRadius: 10
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            flexDirection: "row"
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: theme.colors.text,
                textAlign: "center",
                fontWeight: "bold"
              }}
            >
              Links
            </Text>
            <View
              style={{
                width: "100%",
                alignItems: "center",
                flexDirection: "row"
              }}
            >
              <Text
                style={{
                  color: theme.colors.text,
                  textAlign: "justify",
                  flex: 1,
                  paddingRight: 10
                }}
              >
                {`Open links directly in an external browser?\nEnable if there are errors opening links inside the app.`}
              </Text>
              <Switch
                value={userInfo ? !userInfo.useWebView : true}
                onValueChange={() => {
                  changeWebViewPreference();
                  setSettingsChanged(!settingsChanged);
                }}
                trackColor={{ false: colors.red, true: colors.green }}
                thumbColor={colors.white}
              />
            </View>
          </View>
        </View>
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

export default SettingsModal;
