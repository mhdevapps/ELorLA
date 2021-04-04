import React from "react";
import { Button, View, Alert } from "react-native";
import Toast from "react-native-simple-toast";
import { editWord, addUserWord, deleteOrHideWord } from "../../db/services/wordsServices";
import AddWordsCard from "../components/AddWordsCards";
import { useTheme } from "../../themes/ThemeProvider";
import { ARTICLE_EL } from "../../constants";
import { renderRectangleBanner } from "../../helpers/adsHelper";
import { ScrollView } from "react-native-gesture-handler";

const CreateWordScene = props => {
  const { params } = props.route;
  const { colors, isDark } = useTheme();

  const wordInit = params
    ? {
        id: params.id,
        art: params.art,
        spanish: params.spanish,
        comment: params.comment,
        english: params.english,
        favorite: params.favorite,
        userWord: params.userWord
      }
    : {
        art: ARTICLE_EL,
        spanish: "",
        comment: "",
        english: "",
        favorite: false
      };

  const [word, onChangeWordOriginal] = React.useState(wordInit);

  const [wordsFound, setWordsFound] = React.useState([]);

  const saveWord = () => {
    if (params) {
      editWord(word);
      props.navigation.navigate("Words", {
        onGoBack: () => this.refresh()
      });
    } else {
      addUserWord(word);
    }
    onChangeWordOriginal(wordInit);
    setWordsFound([]);
    Toast.show("Word saved correctly", Toast.LONG, ["UIAlertController"]);
  };

  const deletWordAlert = () => {
    Alert.alert(
      "Delete word",
      "Are you sure?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => {
            deleteOrHideWord(word);
            props.navigation.pop();
          }
        }
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
        backgroundColor: colors.background
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
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <View style={{ width: "40%", margin: 10 }}>
          <Button
            onPress={() => props.navigation.goBack()}
            title="Cancel"
            color={colors.gray}
          />
        </View>
        <View style={{ width: "40%", margin: 10 }}>
          <Button onPress={() => deletWordAlert()} title="DELETE" color={colors.red} />
        </View>
      </View>
      <View style={{ width: "100%" }}>
        <View style={{ paddingTop: 10, paddingHorizontal: 20, paddingBottom: 20 }}>
          <Button
            onPress={() => saveWord()}
            title={params ? "EDIT" : "Save word"}
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
