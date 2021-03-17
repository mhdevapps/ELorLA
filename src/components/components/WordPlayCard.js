import React from "react";
import { View, Text } from "react-native";
import * as Animatable from "react-native-animatable";
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

const wordMainCard = props => {
  const { colors, isDark } = useTheme();

  let textColor = colors.text;
  let animation = "";
  if (props.wordInfo.showArticle) {
    if (props.wordInfo.correctAnswer) {
      textColor = colors.green;
      animation = "pulse";
    } else {
      textColor = colors.red;
      animation = "swing";
    }
  }

  return (
    <Animatable.View animation="fadeIn" duration={666} style={{ padding: 5 }}>
      <View style={styles.wordsView}>
        <Animatable.Text
          duration={500}
          animation={animation}
          style={{
            fontSize: 30,
            textAlign: "center",
            fontWeight: "bold",
            color: textColor
          }}
        >
          {`${props.wordInfo.showArticle ? props.word.art : "__"} ${props.word.spanish}`}
        </Animatable.Text>
        <Text
          style={{
            fontSize: 25,
            textAlign: "center",
            color: colors.textSecondary
          }}
        >
          {props.word.english}
        </Text>
        <Text style={{ fontSize: 20, textAlign: "center", color: colors.textSecondary }}>
          {props.word.comment}
        </Text>
      </View>
      <View style={{ marginVertical: 5, alignItems: "center" }}>
        {renderStreak(props.word.streak, props.wordInfo.showArticle)}
      </View>
    </Animatable.View>
  );
};

const styles = {
  wordsView: {
    marginVertical: 5,
    borderRadius: 10,
    padding: 5,
    flex: 1,
    justifyContent: "center"
  }
};

export default wordMainCard;
