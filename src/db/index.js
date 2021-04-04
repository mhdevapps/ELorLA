import Realm from "realm";
import words from "./model/initWordsModel";
import userWords from "./model/userWordsModel";
import userInfo from "./model/userModel";
import stats from "./model/statsModel";

export default new Realm({
  schema: [words, userWords, userInfo, stats],
  schemaVersion: 17
});
