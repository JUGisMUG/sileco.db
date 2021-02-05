const { Schema, model } = require('mongoose');

const schema = new Schema({
	key: {
		type: Schema.Types.String,
		required: true
	},
	data: {
		type: Schema.Types.Mixed,
		required: true
	}
});

let Model = model('silecodb', schema);

module.exports = Model;