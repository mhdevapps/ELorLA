import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import Tts from "react-native-tts";
import Icon from "react-native-vector-icons/AntDesign";
import colours from "../../themes/colours";

const paused = "paused";
const slow = "slow";
const playing = "playing";

const textToSpeechButton = props => {
  const { word, iconSize } = props;
  const [audioStatus, setAudioStatus] = useState(paused);
  let finishEvent;
  let cancelEvent;
  let startEvent;

  useEffect(() => {
    startEvent = Tts.addEventListener("tts-start", () => {
      if (audioStatus === playing) setAudioStatus(slow);
      else setAudioStatus(playing);
    });
    finishEvent = Tts.addEventListener("tts-finish", () => {
      setAudioStatus(paused);
    });
    cancelEvent = Tts.addEventListener("tts-cancel", () => {
      setAudioStatus(paused);
    });

    return () => {
      try {
        Tts.stop();
        startEvent.remove();
        finishEvent.remove();
        cancelEvent.remove();
      } catch (e) {}
    };
  }, []);

  Tts.setDefaultLanguage("es-ES");
  Tts.setDefaultPitch(0.9);
  Tts.setDucking(true); // lowers other sounds on the phone
  Tts.setDefaultVoice("es-es-x-ana-local");

  let iconColour = colours.gray;
  if (audioStatus === playing || audioStatus === slow) {
    iconColour = colours.buttonBlue;
  }

  const playAudio = () => {
    if (audioStatus === paused) {
      Tts.setDefaultRate(0.95, true);
      Tts.speak(word || "");
    } else if (audioStatus === playing) {
      Tts.stop();
      Tts.setDefaultRate(0.5, true);
      Tts.speak(word || "");
    } else {
      Tts.stop();
    }
  };

  return (
    <TouchableOpacity
      onPress={() => playAudio()}
      onLongPress={() => {
        Tts.setDefaultRate(0.4, true).then(() => Tts.speak(word || ""));
      }}
    >
      <Icon name="sound" size={iconSize || 30} color={iconColour} />
    </TouchableOpacity>
  );
};

export default textToSpeechButton;
