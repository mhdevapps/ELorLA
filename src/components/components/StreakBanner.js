import React from "react";
import { Text, View } from "react-native";
import * as Animatable from "react-native-animatable";

import { getStats } from "../../db/services/statsService";
import colours from "../../themes/colours";

const streakBanner = () => {
  const { currentStreak, totalStreak } = getStats();
  return (
    <Animatable.View animation="zoomInUp" style={styles.container}>
      <View style={styles.item}>
        <Text
          style={{
            ...styles.text,
            color: currentStreak >= totalStreak ? colours.green : colours.gray
          }}
        >
          {`Current streak: ${currentStreak}`}
        </Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.text}>{`Best streak: ${totalStreak}`}</Text>
      </View>
    </Animatable.View>
  );
};

const styles = {
  container: { padding: 3, width: "100%", flexDirection: "row" },
  item: { flex: 1 },
  text: { textAlign: "center", fontSize: 13, color: colours.gray }
};

export default streakBanner;
