const { Schema } = require('mongoose');

const inputSchema = new Schema({
	_id: false,
	type: { type: String, required: true },
	caption: { type: String, required: true },
	decimal: Boolean,
	min: Number,
});

module.exports = inputSchema;
