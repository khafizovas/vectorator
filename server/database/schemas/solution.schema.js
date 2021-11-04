const { Schema } = require('mongoose');

const stepDescriptionSchema = require('./stepDescription.schema');
const solutionStepSchema = require('./solutionStep.schema');

const solutionSchema = new Schema({
	describedSolution: { type: [stepDescriptionSchema], required: true },
	result: { type: Object, required: true },
	solution: { type: [solutionStepSchema], required: true },
	task: { type: String, required: true },
});

module.exports = solutionSchema;
