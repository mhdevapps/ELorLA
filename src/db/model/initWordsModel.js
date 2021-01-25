const initWords = {
	name: 'InitWords',
	primaryKey: 'id',
	properties: {
		id: { type: 'int' },
		art: { type: 'string', default: 'El' },
		spanish: { type: 'string', default: '' },
		streak: { type: 'string', default: '' },
		comment: { type: 'string', default: '' },
		english: { type: 'string', default: '' },
		favorite: { type: 'bool', default: false },
		userWord: { type: 'bool', default: false },
		hidden: { type: 'bool', default: false },
		memorized: { type: 'bool', default: false }
	}
};

export default initWords;
