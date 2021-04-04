import React from "react";
import { Button, View, ScrollView } from "react-native";
import Toast from "react-native-simple-toast";
import { addUserWord } from "../../db/services/wordsServices";
import AddWordsCard from "../components/AddWordsCards";
import { useTheme } from "../../themes/ThemeProvider";
import { ARTICLE_EL } from "../../constants";
import { adTypes, adIds, renderRectangleBanner } from "../../helpers/adsHelper";

const CreateWordScene = props => {
  const wordInit = {
    art: ARTICLE_EL,
    spanish: "",
    comment: "",
    english: "",
    favorite: false
  };
  const [word, onChangeWordOriginal] = React.useState(wordInit);
  const [wordsFound, setWordsFound] = React.useState([]);
  const { colors, isDark } = useTheme();

  const saveWord = () => {
    addUserWord(word);
    onChangeWordOriginal(wordInit);
    setWordsFound([]);
    Toast.show("Word saved correctly", Toast.LONG, ["UIAlertController"]);
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: colors.background,
        color: colors.text
      }}
    >
      <View style={{ justifyContent: "center", flexDirection: "row", paddingBottom: 20 }}>
        <AddWordsCard
          word={word}
          updateState={onChangeWordOriginal}
          wordsFound={wordsFound}
          setWordsFound={setWordsFound}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          paddingBottom: 25
        }}
      >
        <View style={{ width: "40%", margin: 10 }}>
          <Button
            onPress={() => props.navigation.goBack()}
            title="Cancel"
            color={colors.gray}
          />
        </View>
        <View style={{ width: "40%", margin: 10 }}>
          <Button
            onPress={() => saveWord()}
            title="Save word"
            color={colors.green}
            disabled={!word.spanish || !word.english}
          />
        </View>
      </View>
      {renderRectangleBanner()}
      <View style={{ height: 20 }} />
    </ScrollView>
  );
};

export default CreateWordScene;
