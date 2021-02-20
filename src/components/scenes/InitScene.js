import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
  Settings
} from "react-native";
import { connect } from "react-redux";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";
import { createInitWords } from "../../db/services/wordsServices";
import { createUserInfo } from "../../db/services/userServices";
import simpleAction from "../../redux/actions/simpleActions";
import CustomButton from "../components/CustomButton";
import InfoModal from "../components/InfoModal";
import SettingsModal from "../components/SettingsModal";
import ThemeSwitch from "../components/ThemeSwitch";
import colours from "../../themes/colours";
import packageJson from "../../../package.json";
import { useTheme } from "../../themes/ThemeProvider";

const rateApp = () => {
  return (
    <TouchableOpacity
      key="sett"
      style={{ position: "absolute", top: 5, right: 5 }}
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

const InitScene = () => {
  const navigation = useNavigation();
  const { colors, isDark } = useTheme();
  const [dataLoadCompleted, setDataLoadCompleted] = React.useState(false);
  const [showInfo, setShowInfo] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);

  React.useEffect(() => {
    const completed = createInitWords();
    createUserInfo();
    setDataLoadCompleted(completed);
  }, []); // like componentDidMount(), and the final [] to execute it only once.

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ position: "absolute", top: 5, left: 5 }}>
        <Text style={{ fontSize: 11, color: colors.grayDark }}>
          v-{packageJson.version}.
        </Text>
      </View>
      <ScrollView style={{ flex: 1, paddingTop: "33%", padding: 20 }}>
        <Text
          style={{
            fontSize: 50,
            textAlign: "center",
            color: isDark ? colors.white : colors.text
          }}
        >
          EL or LA
        </Text>
        <View style={{ flexDirection: "row" }}>
          <View style={{ height: 5, backgroundColor: colors.red, width: "28%" }} />
          <View style={{ height: 5, backgroundColor: colors.orange, width: "44%" }} />
          <View style={{ height: 5, backgroundColor: colors.red, width: "28%" }} />
        </View>
        <Text style={{ fontSize: 23, textAlign: "center", color: colors.text }}>
          Learn new words in Spanish and their gender
        </Text>
        <Text />
        <ThemeSwitch />
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignContent: "center",
            justifyContent: "center"
          }}
        >
          <TouchableOpacity
            key="info"
            style={{ alignSelf: "center", padding: 17, paddingHorizontal: 10 }}
            onPress={() => {
              setShowInfo(true);
            }}
          >
            <Icon name="info" size={22} color={colors.grayDark} />
          </TouchableOpacity>
          <TouchableOpacity
            key="sett"
            style={{ alignSelf: "center", padding: 17, paddingHorizontal: 10 }}
            onPress={() => {
              setShowSettings(true);
            }}
          >
            <Icon name="settings" size={22} color={colors.grayDark} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={{ width: "100%", paddingBottom: 20 }}>
        {dataLoadCompleted && (
          <View>
            <CustomButton
              title="Word list"
              onPress={() => {
                navigation.navigate("Words");
              }}
            />
            <CustomButton
              title="Play"
              onPress={() => {
                navigation.navigate("Play");
              }}
            />
          </View>
        )}
      </View>
      <InfoModal
        theme={{ colors, isDark }}
        show={showInfo}
        switchVisible={show => {
          setShowInfo(show);
        }}
      />
      <SettingsModal
        theme={{ colors, isDark }}
        show={showSettings}
        switchVisible={show => {
          setShowSettings(show);
        }}
      />
      {rateApp()}
    </View>
  );
};

const mapStateToProps = state => ({
  ...state
});

export default connect(
  mapStateToProps,
  { simpleAction }
)(InitScene);
