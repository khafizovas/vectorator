const { Task, Solution } = require('../database/models/index');

const maths = require('../services/maths/index');
const descriptors = require('../services/descriptors/index');

// Tasks
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

// Solutions
const ratioPointCoordinates = (req, res) => {
	getSolution(Object.values(req.body), res, {
		task: JSON.stringify({
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
		}),
		maths: maths.findRatioPoint3D,
		descriptor: descriptors.describeRatioPoint3D,
	});
};

const buildParallelogram = (req, res) => {
	getSolution(
		[
			maths.buildVector3D(req.body.a, req.body.b),
			maths.buildVector3D(req.body.a, req.body.d),
			{
				a: req.body.a,
				b: req.body.b,
				d: req.body.d,
			},
		],
		res,
		{
			task: JSON.stringify({
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
			}),
			maths: maths.buildParallelogramOrNull,
			descriptor: descriptors.describeParallelogramBuilding,
		}
	);
};

// TODO
const findSidesLength = (req, res) => {};

const findAngleBetweenDiagonales = (req, res) => {
	getSolution(Object.values(req.body), res, {
		task: JSON.stringify({
			key: 2,
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
		}),
		maths: maths.findParallelogramDiagonalesAngles,
		descriptor: descriptors.findParallelogramDiagonalesAngles,
	});
};

// TODO
const findParallelogramArea = (req, res) => {};
const buildParallelepiped = (req, res) => {};
const findParallelepipedVolume = (req, res) => {};
const findParallelepipedHeight = (req, res) => {};
const findVectorInBasis = (req, res) => {};
const findVectorProjection = (req, res) => {};
const findPlaneEquationByPoints = (req, res) => {};
const findPlaneEquationByPointAndLine = (req, res) => {};
const findDistanceBetweenLines = (req, res) => {};
const findSymmetricalPoint = (req, res) => {};
const findAngleBetweenPlanes = (req, res) => {};

// Helpers

const getSolution = (params, res, taskInfo) => {
	Solution.findOne({ task: taskInfo.task }, { _id: 0 }, (err, result) => {
		if (result) {
			res.send(result);
		} else {
			createNewSolution(params, res, taskInfo);
		}
	});
};

const createNewSolution = (params, res, taskInfo) => {
	const solution = taskInfo.maths(...params);
	console.log(solution);
	const describedSolution = taskInfo.descriptor(solution);

	const newSolution = new Solution({
		...describedSolution,
		result: solution.result,
		solution: solution.solution,
		task: taskInfo.task,
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
	findSidesLength,
	findAngleBetweenDiagonales,
	findParallelogramArea,
	buildParallelepiped,
	findParallelepipedVolume,
	findParallelepipedHeight,
	findVectorInBasis,
	findVectorProjection,
	findPlaneEquationByPoints,
	findPlaneEquationByPointAndLine,
	findDistanceBetweenLines,
	findSymmetricalPoint,
	findAngleBetweenPlanes,
};
