const user = {
  name: "Stats",
  properties: {
    currentStreak: { type: "int", default: 0 },
    totalStreak: { type: "int", default: 0 },
    wordsPlayedTotal: { type: "int", default: 0 },
    wordsPlayedCorrect: { type: "int", default: 0 },
    wordsPlayedWrong: { type: "int", default: 0 }
  }
};

export default user;
