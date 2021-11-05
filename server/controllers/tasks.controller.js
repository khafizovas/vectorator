const tasks = require('../tasks');
const { Task, Solution } = require('../database/models/index');

const maths = require('../services/maths/index');
const descriptors = require('../services/descriptors/index');

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
	const task = JSON.stringify({
		key: 0,
		task: [
			{
				type: 'vector',
				name: 'AB',
				value: Object.values(req.body.vectorPoints).map((point) =>
					Object.values(point)
				),
			},
			{ type: 'number', name: 'a', value: req.body.ratioParts.a },
			{ type: 'number', name: 'b', value: req.body.ratioParts.b },
		],
	});

	Solution.findOne({ task: task }, { _id: 0 }, (err, result) => {
		if (result) {
			res.send(result);
		} else {
			const solution = maths.findRatioPoint3D(
				req.body.vectorPoints,
				req.body.ratioParts
			);
			const describedSolution = descriptors.describeRatioPoint3D(
				solution.task,
				solution.solution
			);

			newSolution(res, task, solution, describedSolution);
		}
	});
};

const buildParallelogram = (req, res) => {
	const task = JSON.stringify({
		key: 1,
		task: [
			{
				type: 'point',
				name: 'A',
				value: Object.values(req.body.a),
			},
			{
				type: 'point',
				name: 'B',
				value: Object.values(req.body.b),
			},
			{
				type: 'point',
				name: 'D',
				value: Object.values(req.body.d),
			},
		],
	});

	Solution.findOne({ task: task }, { _id: 0 }, (err, result) => {
		if (result) {
			res.send(result);
		} else {
			const vectorsCoordinates = [
				maths.buildVector3D(req.body.a, req.body.b),
				maths.buildVector3D(req.body.a, req.body.d),
			];

			const solution = maths.buildParallelogramOrNull(...vectorsCoordinates, {
				a: req.body.a,
				b: req.body.b,
				d: req.body.d,
			});

			console.log(task, vectorsCoordinates, solution);
			const describedSolution = descriptors.describeParallelogramBuilding(
				solution.task,
				solution.solution
			);

			newSolution(res, task, solution, describedSolution);
		}
	});
};

// Helpers

const newSolution = (res, task, solution, describedSolution) => {
	const newSolution = new Solution({
		...describedSolution,
		result: solution.result,
		solution: solution.solution,
		task: task,
	});

	newSolution.save().then((data) => {
		res.send(data);
	});
};

module.exports = {
	getTasksList,
	getTask,
	ratioPointCoordinates,
	buildParallelogram,
};
