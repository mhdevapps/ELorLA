import Realm from 'realm';
import words from './model/initWordsModel';
import userWords from './model/userWordsModel';

export default new Realm({ schema: [words, userWords], schemaVersion: 11 });
