import React, { useState } from "react";
import { View, Text, TouchableOpacity, Button, ScrollView, Alert } from "react-native";

import Icon from "react-native-vector-icons/SimpleLineIcons";
import Modal from "react-native-modal";
import colors from "../../themes/colours";
import { getStats, resetStats } from "../../db/services/statsService";

const SettingsModal = props => {
  const { show, switchVisible, theme } = props;

  if (!show) return null;

  const [stats, setStats] = useState(getStats());

  const styles = {
    titles: { color: theme.colors.text, textAlign: "center", fontWeight: "bold" },
    itemView: {
      flexDirection: "row",
      alignContent: "space-between",
      alignItems: "center"
    },
    description: { flex: 1, color: theme.colors.text, padding: 10 },
    numbers: { color: theme.colors.text, padding: 10 }
  };

  let ratioCorrectWords = "-";
  if (stats.wordsPlayedCorrect !== 0 && stats.wordsPlayedTotal !== 0) {
    ratioCorrectWords = (stats.wordsPlayedCorrect * 100) / stats.wordsPlayedTotal;
    ratioCorrectWords = ratioCorrectWords.toFixed(2);
  }

  const resetStatsAlert = () => {
    Alert.alert("Reset all stats?", `This action can not be undone. Continue?`, [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Yes, reset",
        onPress: () => {
          setStats(resetStats());
        }
      }
    ]);
  };

  return (
    <Modal
      isVisible={show}
      coverScreen
      onBackButtonPress={() => {
        switchVisible(!show);
      }}
      onBackdropPress={() => {
        switchVisible(!show);
      }}
    >
      <View
        style={{
          backgroundColor: theme.colors.background,
          paddingTop: 20,
          paddingHorizontal: 20,
          width: "90%",
          alignSelf: "center",
          height: "66%",
          borderRadius: 10
        }}
      >
        <ScrollView style={{ flex: 1 }}>
          <Text style={styles.titles}>Stats</Text>
          <View style={styles.itemView}>
            <Text style={styles.description}>Current streak: </Text>
            <Text style={styles.numbers}>{stats.currentStreak}</Text>
          </View>
          <View style={styles.itemView}>
            <Text style={styles.description}>Total streak: </Text>
            <Text style={styles.numbers}>{stats.totalStreak}</Text>
          </View>
          <View style={styles.itemView}>
            <Text style={styles.description}>Words played correctly: </Text>
            <Text style={styles.numbers}>{stats.wordsPlayedCorrect}</Text>
          </View>
          <View style={styles.itemView}>
            <Text style={styles.description}>Words played wrongly: </Text>
            <Text style={styles.numbers}>{stats.wordsPlayedWrong}</Text>
          </View>
          <View style={styles.itemView}>
            <Text style={styles.description}>Total words played: </Text>
            <Text style={styles.numbers}>{stats.wordsPlayedTotal}</Text>
          </View>
          <View style={styles.itemView}>
            <Text style={styles.description}>Ratio: </Text>
            <Text style={styles.numbers}>{`${ratioCorrectWords}%`}</Text>
          </View>
          <View style={{ paddingHorizontal: "25%", paddingVertical: "25%" }}>
            <Button
              onPress={() => resetStatsAlert()}
              title="Reset stats"
              color={colors.gray}
            />
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            switchVisible(!show);
          }}
          style={{ alignSelf: "center", padding: 7 }}
        >
          <Icon name="close" size={23} color={colors.red} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default SettingsModal;
