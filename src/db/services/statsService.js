import realm from "../index";

const statsTableName = "Stats";

export const getStats = () => realm.objects(statsTableName)[0];

export const createStats = () => {
  const stats = getStats();
  if (!stats || stats.length < 1) {
    realm.write(() => {
      realm.create(statsTableName, {
        wordsPlayedTotal: 0
      });
    });
  }
};

export const addWordCount = correct => {
  const stats = getStats();

  realm.write(() => {
    stats.wordsPlayedTotal += 1;
    if (correct) {
      stats.wordsPlayedCorrect += 1;
      stats.currentStreak += 1;
      if (stats.currentStreak > stats.totalStreak) {
        stats.totalStreak = stats.currentStreak;
      }
    } else {
      stats.wordsPlayedWrong += 1;
      stats.currentStreak = 0;
    }
  });
};

export const resetStats = () => {
  const stats = getStats();

  realm.write(() => {
    stats.currentStreak = 0;
    stats.totalStreak = 0;
    stats.wordsPlayedCorrect = 0;
    stats.wordsPlayedWrong = 0;
    stats.wordsPlayedTotal = 0;
  });

  return stats;
};
