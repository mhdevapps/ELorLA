import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Linking
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
  const userSettings = getUserInfo();
  const [replied, onChangeReplied] = useState(false);
  const [getNextWord, onChangeGetNextWord] = useState(false);
  const [getFavorite, onChangeGetFavorite] = useState(false);
  const [getShowModal, onChangeShowModal] = useState(false);
  const [getModalQuery, onChangeModalQuery] = useState("meaning");

  let wordToShow = null;
  useEffect(() => {
    const words = getPlayWords();

    wordToShow = words[parseInt(Math.random() * words.length, 10)];
    let isWordRepeated = wordToShow.spanish === wordInfo.lastWord?.wordToShow.spanish;
    while (isWordRepeated) {
      wordToShow = words[parseInt(Math.random() * words.length, 10)];
      isWordRepeated = wordToShow.spanish === wordInfo.lastWord?.wordToShow.spanish;
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
      <View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <View style={{ flex: 1 }}>
            <CustomButton
              titleColor={colors.text}
              title={ARTICLE_EL}
              onPress={() => {
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
                onChangeReplied(true);
                setResponse(wordInfo.wordToShow, ARTICLE_LA);
              }}
            />
          </View>
        </View>
      </View>
    ) : (
      <Animatable.View
        animation="pulse"
        duration={1000}
        easing="ease-in-out-sine"
        iterationCount="infinite"
        style={{ paddingBottom: 0 }}
      >
        <CustomButton
          big
          title="NEXT"
          onPress={() => {
            getANewWord();
          }}
          loading={!wordInfo.wordToShow}
        />
      </Animatable.View>
    );
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 20, backgroundColor: colors.background }}>
      <StreakBanner />
      <ScrollView style={{ flex: 1 }}>
        {wordInfo.wordToShow ? (
          <WordPlayCard word={wordInfo.wordToShow} wordInfo={wordInfo} />
        ) : (
          <View style={{ paddingTop: 30 }}>
            <ActivityIndicator color={colors.gray} size="large" />
          </View>
        )}
      </ScrollView>
      <View
        animation="zoomInUp"
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 10,
          paddingBottom: 17,
          paddingHorizontal: 20
        }}
      >
        <View style={{ flex: 1, alignItems: "center" }}>
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
                    Linking.openURL(`https://dle.rae.es/${wordInfo.wordToShow.spanish}`);
                  }
                });
              }
            }}
          >
            <IonIcon name="format-letter-case" size={35} color={colours.gray} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
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
        <View style={{ flex: 1, alignItems: "center" }}>
          <TouchableOpacity onPress={() => updateFavorite()}>
            <Icon
              name="star"
              size={35}
              color={getFavorite ? colors.orange : colours.gray}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <TextToSpeechButton
            word={
              !replied && wordInfo.wordToShow
                ? wordInfo.wordToShow.spanish
                : `${wordInfo.wordToShow?.art} ${wordInfo.wordToShow?.spanish}`
            }
            iconSize={32}
          />
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

export default PlayScene;
