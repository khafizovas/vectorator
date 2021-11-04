const { Schema } = require('mongoose');

const stepDescriptionSchema = new Schema({
	_id: false,
	description: { type: String, required: true },
	action: { type: String, required: true },
});

module.exports = stepDescriptionSchema;
