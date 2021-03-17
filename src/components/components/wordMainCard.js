import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

// import colors from '../../themes/colours';
import Icon from "react-native-vector-icons/SimpleLineIcons";
import OctIcon from "react-native-vector-icons/Octicons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "../../themes/ThemeProvider";
import colours from "../../themes/colours";

const showSettings = word => {
  const { colors, isDark } = useTheme();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      key="sett"
      style={{ flex: 1, justifyContent: "center", padding: 4 }}
      onPress={() => navigation.navigate("Edit word", word)}
    >
      <Icon name="pencil" size={15} color={colors.textBlack} />
    </TouchableOpacity>
  );
};

const renderStreak = (streak, bgColor, keyId) => {
  const st = streak.split("").slice(-5);
  const squares = [];
  for (let k = st.length - 1; k >= 0; k -= 1) {
    squares.unshift(
      <View
        key={k}
        style={{
          height: 7,
          width: 10,
          marginLeft: 5,
          backgroundColor: st[k] === "w" ? colours.red : colours.greenDark,
          borderRadius: 0,
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2
        }}
      />
    );
  }
  return (
    <View
      key={keyId}
      style={{
        flexDirection: "row",
        position: "absolute",
        right: 0,
        bottom: -5,
        paddingTop: 5,
        backgroundColor: bgColor,
        borderBottomLeftRadius: 2
      }}
    >
      {squares}
    </View>
  );
};

const renderIcons = (isFavorite, isUser) => {
  const { colors, isDark } = useTheme();
  return (
    <View
      key="icon"
      style={{ flexDirection: "row", justifyContent: "flex-end", width: 40 }}
    >
      {isFavorite && (
        <View key="star" style={{ justifyContent: "center", padding: 4 }}>
          <OctIcon name="star" size={14} color={"orange"} />
        </View>
      )}
      {isUser && (
        <View key="person" style={{ justifyContent: "center", padding: 4 }}>
          <OctIcon name="person" size={14} color={colors.buttonBlue} />
        </View>
      )}
    </View>
  );
};

const renderSeparatorCounter = index => {
  const { colors, isDark } = useTheme();
  let useSeparator = (index + 1) % 10 === 0 && index !== 0;
  if ((index + 1) % 50 === 0) useSeparator = false;
  else if (index % 50 === 0) useSeparator = true;

  if (useSeparator) {
    return (
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          height: 23,
          paddingTop: 3
        }}
      >
        <View
          style={{
            width: "38%",
            height: 2,
            backgroundColor: isDark ? colors.gray : colors.grayLight,
            marginTop: 9
          }}
        />
        <Text
          style={{
            color: isDark ? colors.white : colors.grayDark,
            textAlign: "center"
          }}
        >
          {" "}
          {index + 1}{" "}
        </Text>
        <View
          style={{
            flex: 1,
            height: 2,
            backgroundColor: isDark ? colors.gray : colors.grayLight,
            marginTop: 9
          }}
        />
      </View>
    );
  }
  return null;
};

const wordMainCard = props => {
  const { word, hideSettings, index } = props;
  const { colors, isDark } = useTheme();
  let bgColor = index % 2 === 0 ? colors.white : colors.grayLight;
  if (isDark) bgColor = index % 2 === 0 ? colors.gray : colors.grayLight;
  // bgColor = getColorByArticle(props.word.art);
  try {
    return (
      <View>
        {renderSeparatorCounter(index)}
        <View
          key={index}
          style={{
            backgroundColor: bgColor,
            marginRight: 4,
            marginVertical: 5,
            borderRadius: 7,
            padding: 5,
            justifyContent: "center",
            borderLeftColor: word.art === "El" ? colors.buttonBlue : colors.pink,
            borderLeftWidth: 4
          }}
        >
          <View style={{ flexDirection: "row", marginLeft: 0 }}>
            <View key="word" style={{ width: "40%", flexDirection: "row" }}>
              <Text style={{ color: colors.textBlack }}>
                {` ${word.art} ${word.spanish}`}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                borderLeftWidth: 2,
                borderColor: isDark ? colors.background : colors.gray,
                paddingHorizontal: 10
              }}
            >
              <Text>{word.english}</Text>
            </View>
            {renderIcons(word.favorite, word.userWord)}
            {!hideSettings && showSettings(word)}
          </View>
          {word.comment !== "" && (
            <Text
              style={{
                marginLeft: 7,
                borderTopWidth: 1,
                borderColor: isDark ? colors.background : colors.gray,
                color: isDark ? colors.background : colors.grayDark
              }}
            >
              {word.comment}
            </Text>
          )}
          {renderStreak(word.streak, bgColor, word.id)}
        </View>
      </View>
    );
  } catch (e) {
    return null;
  }
};

export default wordMainCard;
