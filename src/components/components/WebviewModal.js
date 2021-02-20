import React from "react";
import { View, TouchableOpacity, Alert, Linking } from "react-native";
import { getColorByArticle } from "../../helpers/ThemeHelper";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import Modal from "react-native-modal";
import { WebView } from "react-native-webview";
import colors from "../../themes/colours";

const openUrlAfterError = url => {
  Alert.alert(
    "Error loading",
    "Couldn't open the website within this app, open it with another browser?",
    [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Yes",
        onPress: () => {
          Linking.canOpenURL(url).then(supported => {
            if (supported) {
              Linking.openURL(url);
            }
          });
        }
      }
    ]
  );
};

const infoModal = props => {
  const { show, switchVisible, word, meaningOrImage } = props;

  if (!word) return null;
  const url =
    meaningOrImage === "images"
      ? `https://www.ecosia.org/images?q=${word.spanish}`
      : `https://dle.rae.es/${word.spanish}`;

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
          backgroundColor: colors.grayLight,
          paddingTop: 5,
          paddingHorizontal: 3,
          height: "90%",
          width: "100%",
          alignSelf: "center",
          borderRadius: 5
        }}
      >
        <WebView
          source={{
            uri: url
          }}
          onError={() => {
            switchVisible(!show);
            openUrlAfterError(url);
          }}
        />
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
