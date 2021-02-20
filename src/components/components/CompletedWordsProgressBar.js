import React from "react";
import { View, Text } from "react-native";
import { getAllWords } from "../../db/services/wordsServices";
import { useTheme } from "../../themes/ThemeProvider";

const FilterProgress = () => {
  const { colors, isDark } = useTheme();
  const allWords = getAllWords();
  const completed = allWords.filter(word => word.memorized).length;
  const percentage = completed / allWords.length;
  return (
    <View
      style={{
        flexDirection: "row",
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: "center"
      }}
    >
      <View style={{ width: "100%" }}>
        <Text style={{ color: colors.text }}>
          {completed}/{allWords.length} completed
        </Text>
        <View
          style={{
            backgroundColor: "gray",
            width: "100%",
            height: 4,
            borderRadius: 100
          }}
        >
          <View
            style={{
              backgroundColor: colors.green,
              width: `${percentage < 0.5 ? 0.5 : percentage}%`,
              height: 4,
              borderRadius: 100
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default FilterProgress;
