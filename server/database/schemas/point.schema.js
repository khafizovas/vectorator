const { Schema } = require('mongoose');

const pointSchema = new Schema({
	_id: false,
	x: { type: Number, required: true },
	y: { type: Number, required: true },
	z: { type: Number, required: true },
});

module.exports = pointSchema;
