import React from "react";
import { View, Text } from "react-native";
import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/FontAwesome5";
import colours from "../../themes/colours";
import { useTheme } from "../../themes/ThemeProvider";

const renderStreak = (streak, isLast) => {
  const st = streak.split("").slice(-5);
  const squares = [];
  for (let k = st.length - 1; k >= 0; k -= 1) {
    let lastSquare = false;
    if (k === st.length - 1 && isLast) lastSquare = true;
    squares.unshift(
      <Animatable.View
        animation={lastSquare ? "bounceInRight" : ""}
        duration={lastSquare ? 600 : 1000}
        easing="ease-out"
        key={k}
        style={{
          height: 17,
          width: 17,
          marginHorizontal: 4,
          backgroundColor: st[k] === "w" ? colours.red : colours.green,
          borderRadius: 3
        }}
      />
    );
  }

  return (
    <Animatable.View
      animation="fadeIn"
      duration={200}
      style={{
        flexDirection: "row",
        right: 0,
        paddingTop: 10,
        borderBottomLeftRadius: 2
      }}
    >
      {squares}
    </Animatable.View>
  );
};

const wordMainCard = ({ word, wordInfo }) => {
  const { colors } = useTheme();
  let color = colors.text;
  let animation = "";
  if (wordInfo.showArticle) {
    if (wordInfo.correctAnswer) {
      color = colors.green;
      animation = "pulse";
    } else {
      color = colors.red;
      animation = "swing";
    }
  }

  return (
    <Animatable.View animation="fadeIn" duration={666}>
      <View style={styles.wordsView}>
        <Animatable.Text
          duration={500}
          animation={animation}
          style={{ fontSize: 30, textAlign: "center", fontWeight: "bold", color }}
        >
          {`${wordInfo.showArticle ? word.art : "__"} ${word.spanish}`}
        </Animatable.Text>
        <Text style={{ fontSize: 25, textAlign: "center", color: colors.textSecondary }}>
          {word.english}
        </Text>
        <Text style={{ fontSize: 20, textAlign: "center", color: colors.textSecondary }}>
          {word.comment}
        </Text>
      </View>
      <View style={{ marginVertical: 5, alignItems: "center" }}>
        {renderStreak(word.streak, wordInfo.showArticle)}
        {word.memorized && <Icon name="check" size={20} color={colors.green} />}
      </View>
    </Animatable.View>
  );
};

const styles = {
  wordsView: {
    marginVertical: 5,
    borderRadius: 10,
    padding: 5
  }
};

export default wordMainCard;
