const { Schema } = require('mongoose');

const pointSchema = require('./point.schema');

const vectorSchema = new Schema({
	_id: false,
	first: { type: pointSchema, required: true },
	second: { type: pointSchema, required: true },
});

module.exports = vectorSchema;
