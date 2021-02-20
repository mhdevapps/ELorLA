import Realm from "realm";
import words from "./model/initWordsModel";
import userWords from "./model/userWordsModel";
import userInfo from "./model/userModel";

export default new Realm({ schema: [words, userWords, userInfo], schemaVersion: 12 });
