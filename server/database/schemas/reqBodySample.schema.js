const { Schema } = require('mongoose');

const vectorSchema = require('./vector.schema');

const reqBodySampleSchema = new Schema({
	_id: false,

	ratioParts: {
		a: {
			type: Number,
			validate: {
				validator: function (value) {
					return value > 0;
				},
			},
			required: true,
		},
		b: {
			type: Number,
			validate: {
				validator: function (value) {
					return value > 0;
				},
			},
			required: true,
		},
	},

	vectorPoints: {
		type: vectorSchema,
		required: true,
	},
});

module.exports = reqBodySampleSchema;
