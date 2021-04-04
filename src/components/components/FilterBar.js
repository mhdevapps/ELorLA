import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Octicons";
import styles from "../../themes/styles";
import colours from "../../themes/colours";
import { useTheme } from "../../themes/ThemeProvider";

const FilterBar = ({ favoriteFilter, updateFavorite, updateWord }) => {
  const { colors } = useTheme();

  return (
    <View style={{ flexDirection: "row", paddingTop: 10 }}>
      <View style={{ flex: 1 }}>
        <TextInput
          style={{ ...styles.textInput, color: colors.text }}
          onChangeText={text => updateWord(text)}
          placeholder="Search word"
          placeholderTextColor={colors.grayDark}
        />
      </View>
      <View style={{ paddingLeft: 20 }}>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => {
            updateFavorite(!favoriteFilter);
          }}
        >
          <Icon
            name="star"
            size={35}
            color={favoriteFilter ? colours.orange : colours.gray}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FilterBar;
