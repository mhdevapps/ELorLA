import React, { useState } from "react";
import { Switch, View, Text, TouchableOpacity, ScrollView, Linking } from "react-native";

import Icon from "react-native-vector-icons/SimpleLineIcons";
import Modal from "react-native-modal";
import colors from "../../themes/colours";
import {
  getUserInfo,
  changeWebViewPreference,
  changeShowPersonalisedAds
} from "../../db/services/userServices";

const SettingsModal = props => {
  const { show, switchVisible, theme } = props;

  if (!show) return null;

  const userInfo = getUserInfo();
  const [settingsChanged, setSettingsChanged] = useState(false);

  const openLink = link => Linking.openURL(link);

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
        <ScrollView style={{}}>
          <View style={{ flex: 1 }}>
            <View style={{ paddingVertical: 10 }}>
              <Text
                style={{
                  color: theme.colors.text,
                  textAlign: "center",
                  fontWeight: "bold"
                }}
              >
                Links
              </Text>
              <View style={{ width: "100%", alignItems: "center", flexDirection: "row" }}>
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
            <View style={{ paddingVertical: 10 }}>
              <Text
                style={{
                  color: theme.colors.text,
                  textAlign: "center",
                  fontWeight: "bold"
                }}
              >
                Ads
              </Text>
              <View style={{ width: "100%", alignItems: "center", flexDirection: "row" }}>
                <Text
                  style={{
                    color: theme.colors.text,
                    textAlign: "justify",
                    flex: 1,
                    paddingRight: 10
                  }}
                >
                  Show personalised ads
                </Text>
                <Switch
                  value={userInfo ? !userInfo.onlyNonPersonalisedAds : true}
                  onValueChange={() => {
                    changeShowPersonalisedAds();
                    setSettingsChanged(!settingsChanged);
                  }}
                  trackColor={{ false: colors.red, true: colors.green }}
                  thumbColor={colors.white}
                />
              </View>
              <Text
                style={{
                  paddingVertical: 5,
                  color: theme.colors.text,
                  textAlign: "justify"
                }}
              >
                You can change this setting globally on your Android phone in Settings
                -&gt; Google -&gt; Ads.
              </Text>

              <View id="linkPrivacyGoogle">
                <Text style={{ color: theme.colors.text, textAlign: "justify" }}>
                  Ad policy by Google and its ads used in this app:{" "}
                </Text>
                <TouchableOpacity
                  style={{ paddingBottom: 5 }}
                  onPress={() => {
                    openLink("https://policies.google.com/technologies/partner-sites");
                  }}
                >
                  <Text
                    style={{
                      color: colors.buttonBluePress,
                      textDecorationLine: "underline",
                      textDecorationColor: colors.buttonBlue
                    }}
                    numberOfLines={1}
                  >
                    https://policies.google.com/technologies/partner-sites
                  </Text>
                </TouchableOpacity>
              </View>

              <View id="linkTools.io">
                <Text style={{ color: theme.colors.text, textAlign: "left" }}>
                  Some general privacy tips:
                </Text>
                <TouchableOpacity onPress={() => openLink("https://privacytools.io")}>
                  <Text
                    style={{
                      color: colors.buttonBluePress,
                      textDecorationLine: "underline",
                      textDecorationColor: colors.red
                    }}
                  >
                    privacytools.io
                  </Text>
                </TouchableOpacity>
              </View>

              <Text />
            </View>
          </View>
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

export default SettingsModal;
