const tasks = require('../tasks');
const { Task, Solution } = require('../database/models/index');

const { findRatioPoint3D } = require('../services/maths/index');
const { describeRatioPoint3D } = require('../services/descriptors/index');

const getTasksList = (req, res) => {
	Task.find({}, { _id: 0 }, (err, result) => {
		res.send({
			tasks: result,
		});
	});
};

const getTask = (req, res) => {
	Task.findOne({ key: req.params.id }, { _id: 0 }, (err, result) => {
		res.send({
			task: result,
		});
	});
};

const ratioPointCoordinates = (req, res) => {
	const task = [
		{
			key: 0,
			type: 'vector',
			name: 'AB',
			value: Object.values(req.body.vectorPoints).map((point) =>
				Object.values(point)
			),
		},
		{ type: 'number', name: 'a', value: req.body.ratioParts.a },
		{ type: 'number', name: 'b', value: req.body.ratioParts.b },
	];
	const taskString = JSON.stringify(task);

	Solution.findOne({ task: taskString }, { _id: 0 }, (err, result) => {
		if (result) {
			res.send(result);
		} else {
			const solution = findRatioPoint3D(
				req.body.vectorPoints,
				req.body.ratioParts
			);

			const describedSolution = describeRatioPoint3D(
				solution.task,
				solution.solution
			);

			const newSolution = new Solution({
				...describedSolution,
				result: solution.result,
				solution: solution.solution,
				task: taskString,
			});

			newSolution.save().then((data) => {
				res.send(data);
			});
		}
	});
};

module.exports = { getTasksList, getTask, ratioPointCoordinates };
