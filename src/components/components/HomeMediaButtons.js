import React from "react";
import { View, Text, TouchableOpacity, Alert, Linking, Share } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import colours from "../../themes/colours";
import packageJson from "../../../package.json";

const rateApp = () => {
  return (
    <TouchableOpacity
      style={{ paddingLeft: 7 }}
      key="sett"
      onPress={() => {
        Alert.alert(
          "Rate the app",
          `This opens the store so that you can review the app. Give your feedback and help with the improvement and visibility of ELorLA.\nThank you!`,
          [
            {
              text: "Cancel",
              style: "cancel"
            },
            {
              text: "Rate",
              onPress: () => {
                Linking.openURL(
                  "https://play.google.com/store/apps/details?id=com.elorla"
                );
              }
            }
          ]
        );
      }}
    >
      <MaterialIcon name="rate-review" size={30} color={colours.green} />
    </TouchableOpacity>
  );
};

const onShare = async () => {
  try {
    const result = await Share.share({
      message:
        "Download now the app 'ELorLA - Learn Spanish vocabulary in a simple way' from Google Play for free: https://play.google.com/store/apps/details?id=com.elorla"
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    // error
  }
};

const shareApp = () => (
  <TouchableOpacity style={{ paddingHorizontal: 7 }} onPress={onShare}>
    <MaterialIcon name="share" size={27} color={colours.green} />
  </TouchableOpacity>
);

const MediaButtons = () => {
  return React.useMemo(
    () => (
      <View
        key="sett"
        style={{
          zIndex: 1,
          position: "absolute",
          width: "100%",
          top: 0,
          left: 0,
          padding: 10,
          alignContent: "stretch",
          justifyContent: "space-between",
          flexDirection: "row"
        }}
      >
        <Text style={{ fontSize: 11, color: colours.grayDark }}>
          {`v-${packageJson.version}`}
        </Text>
        <View style={{ flexDirection: "row" }}>
          {shareApp()}
          {rateApp()}
        </View>
      </View>
    ),
    []
  );
};

export default MediaButtons;
