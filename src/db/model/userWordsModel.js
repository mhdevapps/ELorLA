const userWords = {
	name: 'UserWords',
	primaryKey: 'id',
	properties: {
		id: { type: 'int' },
		art: { type: 'string', default: 'El' },
		spanish: { type: 'string', default: '' },
		english: { type: 'string', default: '' },
		comment: { type: 'string', default: '' },
		streak: { type: 'string', default: '' },
		favorite: { type: 'bool', default: false },
		userWord: { type: 'bool', default: true },
		memorized: { type: 'bool', default: false }
	}
};

export default userWords;
