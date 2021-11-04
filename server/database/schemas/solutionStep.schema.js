const { Schema } = require('mongoose');

const solutionStepSchema = new Schema({
	_id: false,
	name: { type: String, required: true },
	type: { type: String, required: true },
	value: { type: [Schema.Types.Mixed], required: true },
});

module.exports = solutionStepSchema;
