import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  Text,
  Switch
} from "react-native";
import Icon from "react-native-vector-icons/Octicons";
import IconFontisto from "react-native-vector-icons/Fontisto";
import IonIcon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Animatable from "react-native-animatable";
import TextToSpeechButton from "../components/TextToSpeechButton";
import StreakBanner from "../components/StreakBanner";
import {
  getPlayWords,
  updateWordStreak,
  switchFavorite
} from "../../db/services/wordsServices";
import { getUserInfo } from "../../db/services/userServices";
import WordPlayCard from "../components/WordPlayCard";
import WebviewModal from "../components/WebviewModal";
import CustomButton from "../components/CustomButton";
import { renderPlayAd } from "../../helpers/adsHelper";
import colours from "../../themes/colours";
import { useTheme } from "../../themes/ThemeProvider";
import { ARTICLE_EL, ARTICLE_LA } from "../../constants";

/*
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // Solo se vuelve a ejecutar si count cambia
*/

const PlayScene = () => {
  const [wordInfo, onChangeWordInfo] = useState({
    wordToShow: null,
    showArticle: false,
    correctAnswer: null,
    lastWord: null
  });
  const { colors } = useTheme();
  const [userSettings] = useState(getUserInfo());
  const [replied, onChangeReplied] = useState(false);
  const [getNextWord, onChangeGetNextWord] = useState(false);
  const [getShowSettings, onChangeShowSettings] = useState(false);
  const [getSettings, onChangeSettings] = useState({ onlyFavs: false });
  const [getFavorite, onChangeGetFavorite] = useState(false);
  const [getShowModal, onChangeShowModal] = useState(false);
  const [getModalQuery, onChangeModalQuery] = useState("meaning");

  let wordToShow = null;

  const getIsWordRepeated = () => {
    return (
      wordToShow.spanish === wordInfo.lastWord?.wordToShow.spanish &&
      wordToShow.id === wordInfo.lastWord?.wordToShow.id
    );
  };

  useEffect(() => {
    const words = getPlayWords(getSettings);

    wordToShow = words[parseInt(Math.random() * words.length, 10)];
    let isWordRepeated = getIsWordRepeated();
    while (isWordRepeated) {
      wordToShow = words[parseInt(Math.random() * words.length, 10)];
      isWordRepeated = getIsWordRepeated();
    }

    onChangeWordInfo({
      showArticle: false,
      correctAnswer: null,
      wordToShow,
      lastWord: wordToShow.word
    });
    onChangeGetFavorite(wordToShow.favorite);
  }, [getNextWord]);

  const setResponse = (word, response) => {
    onChangeReplied(true);
    if (word.art === response) {
      updateWordStreak(word, true);
      onChangeWordInfo({ ...wordInfo, showArticle: true, correctAnswer: true });
    } else {
      updateWordStreak(word, false);
      onChangeWordInfo({
        ...wordInfo,
        showArticle: true,
        correctAnswer: false
      });
    }
  };

  const getANewWord = () => {
    onChangeWordInfo({
      wordToShow: null,
      showArticle: false,
      correctAnswer: null,
      lastWord: wordInfo
    });
    onChangeGetNextWord(!getNextWord);
    onChangeReplied(false);
  };

  const updateFavorite = () => {
    onChangeGetFavorite(!getFavorite);
    switchFavorite(wordInfo.wordToShow);
  };

  const renderButtons = () => {
    return !replied && wordInfo.wordToShow ? (
      <View
        style={{
          paddingHorizontal: 10,
          paddingBottom: 10,
          flexDirection: "row",
          justifyContent: "space-evenly"
        }}
      >
        <View style={{ flex: 1 }}>
          <CustomButton
            titleColor={colors.text}
            title={ARTICLE_EL}
            onPress={() => {
              onChangeShowSettings(false);
              onChangeReplied(true);
              setResponse(wordInfo.wordToShow, ARTICLE_EL);
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <CustomButton
            titleColor={colors.text}
            title={ARTICLE_LA}
            onPress={() => {
              onChangeShowSettings(false);
              onChangeReplied(true);
              setResponse(wordInfo.wordToShow, ARTICLE_LA);
            }}
          />
        </View>
      </View>
    ) : (
      <Animatable.View
        animation="pulse"
        duration={1000}
        easing="ease-in-out-sine"
        iterationCount="infinite"
        style={{ paddingHorizontal: 10, paddingBottom: 10 }}
      >
        <CustomButton
          big
          title="NEXT"
          onPress={getANewWord}
          loading={!wordInfo.wordToShow}
        />
      </Animatable.View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StreakBanner />
      <View style={{ flex: 1 }}>
        {wordInfo.wordToShow ? (
          <WordPlayCard word={wordInfo.wordToShow} wordInfo={wordInfo} />
        ) : (
          <View style={{ paddingTop: 30 }}>
            <ActivityIndicator color={colors.gray} size="large" />
          </View>
        )}
      </View>

      {renderPlayAd(colors, userSettings.onlyNonPersonalisedAds)}

      <View style={{ width: "100%", alignItems: "center" }}>
        <View
          style={{
            width: "33%",
            borderBottomWidth: 2,
            borderColor: colors.backgroundShadow,
            height: 7
          }}
        />
      </View>
      <View style={styles.grayButtonsView}>
        {getShowSettings && (
          <View
            style={{
              height: "auto",
              width: "100%",
              overflow: "hidden"
            }}
          >
            <Animatable.View
              animation="slideInUp"
              duration={500}
              easing="ease-in-out-sine"
              iterationCount={1}
              style={{
                ...styles.settingsView,
                backgroundColor: colors.backgroundShadow,
                padding: 10
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: colors.text }}>Play only favorite words</Text>
                  <Text style={{ color: colors.text }}>(with more than 2):</Text>
                </View>
                <Switch
                  trackColor={{ false: colors.gray, true: colors.orange }}
                  thumbColor={colors.white}
                  value={getSettings.onlyFavs}
                  onValueChange={() => {
                    onChangeSettings({ ...getSettings, onlyFavs: !getSettings.onlyFavs });
                    getANewWord();
                  }}
                />
              </View>
            </Animatable.View>
          </View>
        )}
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1, alignItems: "center", paddingTop: 10 }}>
            <TouchableOpacity
              onPress={() => {
                if (userSettings.useWebView) {
                  onChangeModalQuery("meaning");
                  onChangeShowModal(!getShowModal);
                } else {
                  Linking.canOpenURL(
                    `https://dle.rae.es/${wordInfo.wordToShow.spanish}`
                  ).then(supported => {
                    if (supported) {
                      Linking.openURL(
                        `https://dle.rae.es/${wordInfo.wordToShow.spanish}`
                      );
                    }
                  });
                }
              }}
            >
              <IonIcon name="format-letter-case" size={35} color={colours.gray} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: "center", paddingTop: 15 }}>
            <TouchableOpacity
              onPress={() => {
                if (userSettings.useWebView) {
                  onChangeModalQuery("images");
                  onChangeShowModal(!getShowModal);
                } else {
                  Linking.canOpenURL(
                    `https://www.ecosia.org/images?q=${wordInfo.wordToShow.spanish}`
                  ).then(supported => {
                    if (supported) {
                      Linking.openURL(
                        `https://www.ecosia.org/images?q=${wordInfo.wordToShow.spanish}`
                      );
                    }
                  });
                }
              }}
            >
              <IconFontisto name="picture" size={25} color={colours.gray} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: "center", paddingTop: 10 }}>
            <TouchableOpacity onPress={() => updateFavorite()}>
              <Icon
                name="star"
                size={35}
                color={getFavorite ? colors.orange : colours.gray}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: "center", paddingTop: 12 }}>
            <TextToSpeechButton
              word={
                !replied && wordInfo.wordToShow
                  ? wordInfo.wordToShow.spanish
                  : `${wordInfo.wordToShow?.art} ${wordInfo.wordToShow?.spanish}`
              }
              iconSize={32}
            />
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              paddingTop: 10,
              backgroundColor: getShowSettings
                ? colors.backgroundShadow
                : colors.background,
              paddingBottom: 10,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10
            }}
          >
            <TouchableOpacity onPress={() => onChangeShowSettings(!getShowSettings)}>
              <Icon
                name="settings"
                size={35}
                color={getShowSettings ? colors.buttonBlue : colours.gray}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {renderButtons()}
      <WebviewModal
        meaningOrImage={getModalQuery}
        word={wordInfo.wordToShow}
        show={getShowModal}
        switchVisible={() => {
          onChangeShowModal(!getShowModal);
        }}
      />
    </View>
  );
};

const styles = {
  grayButtonsView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingHorizontal: 20
  },
  settingsView: {
    width: "100%",
    paddingHorizontal: 20,
    borderRadius: 10,
    borderBottomRightRadius: 0
  }
};

export default PlayScene;
