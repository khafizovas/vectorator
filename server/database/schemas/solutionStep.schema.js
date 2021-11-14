const { Schema } = require('mongoose');

const solutionStepSchema = new Schema({
	_id: false,
	name: {
		type: Schema.Types.Mixed,
		required: true,
		validate: {
			validator: function (v) {
				return typeof v === 'string' || Array.isArray(v);
			},
		},
	},
	type: { type: String, required: true },
	value: { type: [Schema.Types.Mixed], required: true },
});

module.exports = solutionStepSchema;
