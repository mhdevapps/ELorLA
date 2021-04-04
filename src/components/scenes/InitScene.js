import React from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import OctIcon from "react-native-vector-icons/Octicons";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { createInitWords } from "../../db/services/wordsServices";
import { createUserInfo } from "../../db/services/userServices";
import simpleAction from "../../redux/actions/simpleActions";
import CustomButton from "../components/CustomButton";
import InfoModal from "../components/InfoModal";
import SettingsModal from "../components/SettingsModal";
import ProfileModal from "../components/ProfileModal";
import ThemeSwitch from "../components/ThemeSwitch";
import { useTheme } from "../../themes/ThemeProvider";
import { createStats } from "../../db/services/statsService";
import MediaButtons from "../components/HomeMediaButtons";

const InitScene = () => {
  const navigation = useNavigation();
  const { colors, isDark } = useTheme();
  const [dataLoadCompleted, setDataLoadCompleted] = React.useState(false);
  const [showInfo, setShowInfo] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);
  const [showProfile, setshowProfile] = React.useState(false);

  React.useEffect(() => {
    const completed = createInitWords();
    createUserInfo();
    createStats();
    setDataLoadCompleted(completed);
  }, []); // like componentDidMount(), and the final [] to execute it only once.

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <MediaButtons />
      <ScrollView style={{ flex: 1, paddingTop: "33%", padding: 20 }}>
        <View style={{ overflow: "hidden" }}>
          <Animatable.Text
            animation="fadeInUp"
            style={{
              fontSize: 50,
              textAlign: "center",
              color: isDark ? colors.white : colors.text
            }}
          >
            ELorLA
          </Animatable.Text>
        </View>
        <Animatable.View
          animation="fadeIn"
          style={{
            flexDirection: "row",
            backgroundColor: colors.orange,
            width: "100%"
          }}
        >
          <Animatable.View
            animation="slideInLeft"
            style={{ height: 5, backgroundColor: colors.red, width: "29%" }}
          />
          <Animatable.View
            animation="bounceIn"
            style={{ height: 5, backgroundColor: colors.orange, width: "42%" }}
          />
          <Animatable.View
            animation="slideInRight"
            style={{ height: 5, backgroundColor: colors.red, width: "29%" }}
          />
        </Animatable.View>
        <View style={{ overflow: "hidden" }}>
          <Animatable.Text
            animation="fadeInDown"
            style={{
              fontSize: 23,
              textAlign: "center",
              color: colors.text
            }}
            // eslint-disable-next-line react-native/no-raw-text
          >
            Learn new words in Spanish and their gender
          </Animatable.Text>
        </View>
        <Animatable.View animation="fadeIn">
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
              style={styles.iconsTouchable}
              onPress={() => {
                setShowInfo(true);
              }}
            >
              <Icon name="info" size={22} color={colors.grayDark} />
            </TouchableOpacity>
            <TouchableOpacity
              key="profile"
              style={styles.iconsTouchable}
              onPress={() => {
                setshowProfile(true);
              }}
            >
              <OctIcon name="person" size={22} color={colors.grayDark} />
            </TouchableOpacity>
            <TouchableOpacity
              key="sett"
              style={styles.iconsTouchable}
              onPress={() => {
                setShowSettings(true);
              }}
            >
              <Icon name="settings" size={22} color={colors.grayDark} />
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </ScrollView>
      <View style={{ width: "100%", paddingBottom: 10 }}>
        {dataLoadCompleted && (
          <Animatable.View animation="slideInUp" duration={500}>
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
          </Animatable.View>
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
      <ProfileModal
        theme={{ colors, isDark }}
        show={showProfile}
        switchVisible={show => {
          setshowProfile(show);
        }}
      />
    </View>
  );
};

const styles = {
  iconsTouchable: { alignSelf: "center", paddingBottom: 17, paddingHorizontal: 11 }
};

const mapStateToProps = state => ({
  ...state
});

export default connect(
  mapStateToProps,
  { simpleAction }
)(InitScene);
