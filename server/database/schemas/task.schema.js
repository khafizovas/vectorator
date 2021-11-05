const { Schema } = require('mongoose');

const inputSchema = require('./input.schema');

const taskSchema = new Schema({
	key: { type: Number, required: true, min: 0 },
	name: { type: String, required: true },
	task: { type: String, required: true },
	reqBodySample: {
		type: Object,
		required: true,
	},
	inputs: { type: [inputSchema], required: true },
	path: { type: String, required: true },
});

module.exports = taskSchema;
